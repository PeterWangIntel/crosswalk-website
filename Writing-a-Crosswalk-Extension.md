**Note that a more up-to-date tutorial is available [on the main Crosswalk website](https://crosswalk-project.org/#documentation/tizen_ivi_extensions).**

# Introduction

Extensions in Crosswalk gives application developers an interface to
the world outside the Web Runtime.

They're implemented using a shared object with a very simple interface
that allows message passing to and from JavaScript code.

## Implementing an Extension

The [XW_Extension.h](https://github.com/crosswalk-project/crosswalk/blob/master/extensions/public/XW_Extension.h) header should be used to define the
structures used by the extension system. One recommended practice is copying this header into
your project.

The only symbol that should be exported is the function `int32_t
XW_Initialize(XW_Extension extension, XW_GetInterface
get_interface)`. Be sure to use `extern "C"` when defining this
function to avoid name mangling if using a C++ compiler. This function
should be implemented and exported in the shared object. It should
return `XW_OK` if it could be correctly initialized.  Its parameters:

- `extension` is the identifier for this extension, i.e. from now on
  the extension will be referenced as this.
- `get_interface` is a function with signature `const void*
  XW_GetInterface(const char* interface_name)` used for accessing the
  interfaces provided for integrating native code with the Crosswalk
  runtime. For each defined `interface_name` it will return a pointer to a structure with functions that the extension can call.
  The interfaces provided are described bellow.

### Core Interface

*`interface_name`*: `XW_CORE_INTERFACE`

A `struct XW_CoreInterface` with the following fields:

- `SetExtensionName` a function that sets name of the extension
  identified by `extension` to `name`. This is mandatory. It should
  only be called during the `XW_Initialize` call.
- `SetJavaScriptAPI` exports the JavaScript shim that will be
  available to all page contexts. The JavaScript code `api` will be
  associated with `extension`. More details on [XW_Extension.h](https://github.com/crosswalk-project/crosswalk/blob/master/extensions/public/XW_Extension.h)
  header. Only valid to be called during `XW_Initialize()`.
- `RegisterInstanceCallbacks` informs the Crosswalk runtime of
  functions that should be called when new instances of the extension
  are created or destroyed. Instances have the same lifetime of the
  web content. This should only be called during `XW_Initialize()`
- `RegisterShutdownCallback` registers a callback that will be called
  when the extension will be unloaded. This function should be called
  only during `XW_Initialize()`.
- `SetInstanceData` and `GetInstanceData` are convenience functions
  that allow for arbitrary data to be associated with each instance,
  and for that data to be retrieved. These functions may be called at
  any time during the life of an instance.

### Messaging Interface

*`interface_name`*: `XW_MESSAGING_INTERFACE`

A `struct XW_MessagingInterface` with the following fields:

- `Register` when called, this function tells Crosswalk which function
  should be called in event of a message from the JavaScript side.
- `PostMessage` sends a message to the web content, associated with
  the `instance`. More details on the [XW_Extension.h](https://github.com/crosswalk-project/crosswalk/blob/master/extensions/public/XW_Extension.h) header.

### Sync Messaging Interface [experimental]

Defined in the [XW_Extension_SyncMessage.h](https://github.com/crosswalk-project/crosswalk/blob/master/extensions/public/XW_Extension_SyncMessage.h) header. This interface is
marked as internal and no guarantee will be made for its compatibility
with future versions.

*`interface_name`*: `XW_INTERNAL_SYNC_MESSAGING_INTERFACE`

A `struct XW_Internal_SyncMessagingInterface` with the following fields:

- `Register` when called, this function tells Crosswalk which function
  should be called in event of a synchronous message from the
  JavaScript side.
- `SetSyncReply` responds a synchronous (blocking) message from
  JavaScript side, the renderer process will be blocked until this
  function is called.

### Versioning information

The interface names and structures explained here, have a versioning
suffix in their names, but extension writers are recommended to use
the unversioned macros to get the desired interfaces.

## Loading the Extensions

Be sure to build the extension using each platform's standard naming
scheme. If an extension answers for `foo`, then:
- Under Linux, it should be named `libfoo.so`.
- Under MacOS, it should be named `foo.dylib`.
- Under Windows, it should be named `foo.dll`.

All files that match these naming scheme found in the directory
pointed to by the `--external-extensions-path` Crosswalk argument will
be loaded. Libraries will only be considered to be included in the
extension subsystem if:
- The shared object loads and links (as it might link to external
  libraries which might not exist in the user's machine).
- The extension initialization function exists and returns XW_OK.

# Example

To show how this works in practice, this is an example from the Crosswalk tests, to
demostrate how these concepts apply. This extension is called [echo_extension.c](https://github.com/crosswalk-project/crosswalk/blob/master/extensions/test/echo_extension.c). As it
is implied by its name all it does is echo the incoming message as a reply.


```c
#include <stdio.h>
#include <stdlib.h>
#include "xwalk/extensions/public/XW_Extension.h"
#include "xwalk/extensions/public/XW_Extension_SyncMessage.h"
```

Usually one external extension will have a copy of these headers on its sources.

```c
XW_Extension g_extension = 0;
const XW_CoreInterface* g_core = NULL;
const XW_MessagingInterface* g_messaging = NULL;
const XW_Internal_SyncMessagingInterface* g_sync_messaging = NULL;
```

Just some global variables to keep some state.

```c
void instance_created(XW_Instance instance) {
  printf("Instance %d created!\n", instance);
}

void instance_destroyed(XW_Instance instance) {
  printf("Instance %d destroyed!\n", instance);
}
```

So we can be notified when an instance is created (or destroyed).

```c
void handle_message(XW_Instance instance, const char* message) {
  g_messaging->PostMessage(instance, message);
}

void handle_sync_message(XW_Instance instance, const char* message) {
  g_sync_messaging->SetSyncReply(instance, message);
}

void shutdown(XW_Extension extension) {
  printf("Shutdown\n");
}
```

Most of the logic of the extension will be here, in these functions above.


```c
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
      "};"
      "exports.syncEcho = function(msg) {"
      "  return extension.internal.sendSyncMessage(msg);"
      "};";

  g_extension = extension;
  g_core = get_interface(XW_CORE_INTERFACE);
  g_core->SetExtensionName(extension, "echo");
  g_core->SetJavaScriptAPI(extension, kAPI);
  g_core->RegisterInstanceCallbacks(
      extension, instance_created, instance_destroyed);
  g_core->RegisterShutdownCallback(extension, shutdown);

  g_messaging = get_interface(XW_MESSAGING_INTERFACE);
  g_messaging->Register(extension, handle_message);

  g_sync_messaging = get_interface(XW_INTERNAL_SYNC_MESSAGING_INTERFACE);
  g_sync_messaging->Register(extension, handle_sync_message);

  return XW_OK;
}
```

Now we can see how these structures and interface names, are meant to be use together.

