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


``` delayed-echo.c
// Copyright (c) 2013 Intel Corporation. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include <stdio.h>
#include <stdlib.h>

#include <glib.h>

#include "XW_Extension.h"

static XW_Extension xw_extension = 0;
static const XW_CoreInterface* core_interface = NULL;
static const XW_MessagingInterface* messaging_interface = NULL;
static GSList* pending_messages;

struct delayed_message {
  XW_Instance instance;
  char* message;
  guint id;
};

static void instance_created(XW_Instance instance) {
  printf("Instance %d created!\n", instance);
}

static void destroy_delayed_message(struct delayed_message* d) {
  pending_messages = g_slist_remove(pending_messages, d);

  // So the callback doesn't get called for this message
  if (d->id) {
    g_source_remove(d->id);
  }

  g_free(d->message);
  g_free(d);
}

static void instance_destroyed(XW_Instance instance) {
  GSList* l = pending_messages;

  printf("Instance %d destroyed!\n", instance);

  while (l) {
    GSList* next = l->next;
    struct delayed_message* pending = l->data;

    if (pending->instance == instance)
      destroy_delayed_message(pending);

    l = next;
  }
}

static gboolean post_delayed_message(gpointer user_data) {
  struct delayed_message* delayed_message = user_data;
  XW_Instance instance = delayed_message->instance;
  const char* message = delayed_message->message;

  messaging_interface->PostMessage(instance, message);

  destroy_delayed_message(delayed_message);

  return FALSE;
}

static void handle_message(XW_Instance instance, const char* message) {
  struct delayed_message* delayed_message = g_new0(struct delayed_message, 1);
  delayed_message->instance = instance;
  delayed_message->message = g_strdup(message);
  delayed_message->id = g_timeout_add_seconds(2, post_delayed_message,
                                              delayed_message);

  pending_messages = g_slist_prepend(pending_messages, delayed_message);
}

static void shutdown(XW_Extension extension) {
  printf("Shutdown\n");
}

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

  core_interface = get_interface(XW_CORE_INTERFACE);
  core_interface->SetExtensionName(extension, "delayed");
  core_interface->SetJavaScriptAPI(extension, kAPI);
  core_interface->RegisterInstanceCallbacks(
      extension, instance_created, instance_destroyed);
  core_interface->RegisterShutdownCallback(extension, shutdown);

  messaging_interface = get_interface(XW_MESSAGING_INTERFACE);
  messaging_interface->Register(extension, handle_message);

  return XW_OK;
}
```

A simple HTML to verify that our delayed_echo extension indeed
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
