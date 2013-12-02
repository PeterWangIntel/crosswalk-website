Devoting attention to describing how one would write an extension
using GLib makes sense for two main reasons, many libraries are
already glib based (or may be integrated into a glib mainloop, by
providing a file descriptor for events, for example) and Crosswalk on
Linux already has a GLib mainloop running for its message loop.

Before going through an example extension, the extension writer
needs to keep one thing in mind, native code is run in the main
thread (UI thread) so every care should be taken to avoid
blocking calls.

## Example

Below we present a simple example that should demonstrate the main
concepts of writing a glib based extension.

The first thing that should be noted is the consequence of Crosswalk
already having a GLib mainloop running, there's no `g_main_loop_new()`
nor `g_main_loop_run()`.

Even that our simple example wouldn't exercise this, as only one
instance is created, when a instance is destroyed the extension should
take care to clean up after itself (see `instance_destroyed()` below),
so every pending callback and timer is cancelled.

The idea of having a mainloop is having a consistent way to deal with
events and asynchronous calls, this example is a modified version of
the `echo` extension (shown in our
[Writing a Crosswalk Extension](https://github.com/crosswalk-project/crosswalk-website/wiki/Writing-a-Crosswalk-Extension)) that delays the message by 2 seconds, using the GLib function
[g_timeout_add_seconds](https://developer.gnome.org/glib/stable/glib-The-Main-Event-Loop.html#g-timeout-add-seconds), which should demonstrate how events should be handled.


``` delayed-echo.c
// Copyright (c) 2013 Intel Corporation. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include <stdio.h>
#include <stdlib.h>

#include <glib.h>

#include "XW_Extension.h"

// Identifies our extension to Crosswalk.
static XW_Extension xw_extension = 0;

// Interfaces used to communicate with Crosswalk.
static const XW_CoreInterface* core_interface = NULL;
static const XW_MessagingInterface* messaging_interface = NULL;

// Represents a message to be sent to the future.
struct delayed_message {
  // A message belongs to a Crosswalk Extension instance, we keep this
  // so the message can be deleted when the instance is destroyed.
  XW_Instance instance;
  char* message;
  // This is the source id of the timeout, so we can cancel it when the
  // message is no longer valid.
  guint id;
};

// Keep the messages waiting for their time to come.
static GSList* pending_messages;

// Forward declaring these so we can take a look at 'XW_Initialize' right away.
static void instance_created(XW_Instance instance);
static void instance_destroyed(XW_Instance instance);
static void shutdown(XW_Extension extension);
static void handle_message(XW_Instance instance, const char* message);

// This function is the starting point of the extension, it will be called by
// Crosswalk, with the 'extension' identifier and a function 'get_interface'
// that should be used to get the interfaces needed by the extension.
int32_t XW_Initialize(XW_Extension extension, XW_GetInterface get_interface) {
  static const char* kAPI =
      "var echoListener = null;"
      "extension.setMessageListener(function(msg) {"
      "  if (echoListener instanceof Function) {"
      "    echoListener(msg);"
      "  };"
      "});"
      "exports.echo = function(msg, callback) {"
      "  echoListener = callback;"
      "  extension.postMessage(msg);"
      "};";

  xw_extension = extension;

  // The base interface for interacting with Crosswalk.
  core_interface = get_interface(XW_CORE_INTERFACE);

  // Just the basic stuff, setting our name, and the JavaScript side
  // of the extension.
  core_interface->SetExtensionName(extension, "delayed");
  core_interface->SetJavaScriptAPI(extension, kAPI);

  // Callbacks that are called when instances are created/destroyed,
  // 'instance_destroyed' is the only that deserves some attention. See
  // below.
  core_interface->RegisterInstanceCallbacks(
      extension, instance_created, instance_destroyed);

  // Unused in our case, but we may want to have some information associated with
  // the lifetime of the extension, in that case, we need to free that information
  // during 'shutdown'.
  core_interface->RegisterShutdownCallback(extension, shutdown);

  // The messaging handling interface.
  messaging_interface = get_interface(XW_MESSAGING_INTERFACE);

  // 'handle_message' will take a message, store it, and prepare it to
  // be sent later.
  messaging_interface->Register(extension, handle_message);

  // Nothing wrong happened, we could initialize our extension fine.
  return XW_OK;
}

static void instance_created(XW_Instance instance) {
  printf("Instance %d created!\n", instance);
}

// Function to be called when a message is no longer needed, removing the
// message from the list of pending messaged. Used in two cases:
// 1. the message is sent, so we no longer need it;
// 2. the instance is destroyed, so we should remove all the messages
// associated with that instance.
static void destroy_delayed_message(struct delayed_message* d) {
  pending_messages = g_slist_remove(pending_messages, d);

  // So the callback doesn't get called for this message.
  if (d->id) {
    g_source_remove(d->id);
  }

  // As we copied the message, we need to free it.
  g_free(d->message);
  g_free(d);
}

// As explained above, removes all the messages associated with the
// instance from the pending list.
static void instance_destroyed(XW_Instance instance) {
  // Starts from the start of the pending messages list.
  GSList* l = pending_messages;

  printf("Instance %d destroyed!\n", instance);

  // The end is a pointer to NULL.
  while (l) {
    // Removing an element from the list invalidates its node, so we keep
    // a pointer to the next node before removing it from the list.
    GSList* next = l->next;
    struct delayed_message* pending = l->data;

    // Removing one matching message.
    if (pending->instance == instance)
      destroy_delayed_message(pending);

    // Repeat again for the next element, if it exists.
    l = next;
  }
}

// This will be called when the time comes to deliver the message.
static gboolean post_delayed_message(gpointer user_data) {
  struct delayed_message* delayed_message = user_data;
  XW_Instance instance = delayed_message->instance;
  const char* message = delayed_message->message;

  messaging_interface->PostMessage(instance, message);

  // The message is no longer needed, we should discard it.
  destroy_delayed_message(delayed_message);

  // If we returned 'TRUE' this callback would be called again,
  // as we already delivered our message, we are done.
  return FALSE;
}

static void handle_message(XW_Instance instance, const char* message) {
  // Allocates a new structure to keep our delayed messages, all fields are
  // initialized to zero.
  struct delayed_message* delayed_message = g_new0(struct delayed_message, 1);

  delayed_message->instance = instance;

  // We need to copy the message, because we can not assume that 'message'
  // (the pointer) will remain valid after this function is called.
  delayed_message->message = g_strdup(message);

  // This is the core of the extension, setup a function to be called 2
  // seconds into the future, we store the id of the timeout so we can
  // cancel it. We may have used 'g_timeout_add_seconds_full' and pass
  // 'destroy_delayed_message' as the 'GDestroyNotify' callback.
  // I will leave it as an exercise to the reader to make the necessary
  // adjustments.
  delayed_message->id = g_timeout_add_seconds(2, post_delayed_message,
                                              delayed_message);

  pending_messages = g_slist_prepend(pending_messages, delayed_message);
}

static void shutdown(XW_Extension extension) {
  printf("Shutdown\n");
}
```

An simple HTML to verify that our delayed_echo extension indeed
does what it implies.


``` echo.html
<html>
<head>
<title>Delayed Echo Example</title>
</head>
<body>
<script>
try {
  var gotMessage = function(msg) {
    console.log("got [" + msg + "] at " + Date.now());
  };

  var message = "Message from the past (" + Date.now() + ")";
  delayed.echo(message, gotMessage);
} catch (e) {
  console.log(e);
}
</script>
</body>
</html>
```

Just to show that it indeed builds and runs, an simple Makefile to
build it. Just remember to copy `XW_Extension.h` from the Crosswalk
repository to the folder containing these files.


``` Makefile
CC=gcc
CFLAGS=-fPIC
LIBS=$(shell pkg-config --libs --cflags glib-2.0)

libdelayed_echo.so: delayed-echo.c
	$(CC) $(CFLAGS) $(LIBS) -shared -o $@ $^

clean:
	@rm libdelayed_echo.so

all: libdelayed_echo.so

.PHONY: clean all
```

To run it point Crosswalk binary (xwalk) to the delayed extension
directory, using the `--external-extensions-path` switch and load the
`echo.html` page.
