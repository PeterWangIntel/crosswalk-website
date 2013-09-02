### Why not Chrome extension API

Firstly, from the Javascript developers perspective, the APIs defined in IDL are [stateless functions](http://www.chromium.org/developers/design-documents/extensions/how-the-extension-system-works/api-pattern-design-doc) rather than object oriented, and all APIs must be asynchronous. Another concern is about the [developing model](http://www.chromium.org/developers/design-documents/extensions/proposed-changes/creating-new-apis). The implementation of chrome extension API has to be built-in chromium code tree. In embedded way, most developers just want to link their extension code with Crosswalk libraries. Chrome extension API has too many dependencies, for example, a lot of header files of chromium involved in the filesystem API implementation. This is the biggest issue, and it's even worse if we need pluggable API framework (like Tizen). We need a cleared interface between Crosswalk and developers.

### NPRuntime as an interface

[NPRuntime](https://developer.mozilla.org/en-US/docs/Gecko_Plugin_API_Reference/Scripting_plugins) was originally designed as a scripting extension for NPAPI plugin. From Javascript engine's view point, It's actually an C interface of how to present and interact with Javascript object. We can reuse this interface as our WebAPI extension API. And the implementation should not depend on NPAPI plugin, there is no plugin element or plugin instance involved.

### Chromium's implementation

In chromium, npruntime is implemented in [V8 binding](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/bindings/v8/), so it doesn't depend on NPAPI. The [interface definition](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/npapi/bindings/npruntime.h) has little dependency with NPAPI, and we will get rid of it. Chromium internally use npruntime to do DOM automation test. Moreover, the chrome Android WebView support addJavascriptInterface() method also through npruntime in native layer.

### High-level API

Npruntime will be used as the primitive API. It has no other dependency. And also, It has a language neutral ABI because It's C based. This is a benefit for pluggable WebAPI framework. We can provide high-level C++ API through wrapper classes, for example [CppBoundClass](https://code.google.com/p/chromium/codesearch#chromium/src/webkit/renderer/cpp_bound_class.h) in chromium. I personally prefer pure C++ template wrapper which only depend on STL or [Boost C++ library](http://www.boost.org/).

### Multi-process and Sandbox support

Npruntime will also be the interface between processes. Fortunately, chromium already has [out-of-plugin architecture](http://www.chromium.org/developers/design-documents/plugin-architecture). We will reuse the [npobject messages](https://code.google.com/p/chromium/codesearch#chromium/src/content/child/plugin_messages.h&l=330) and [proxy](https://code.google.com/p/chromium/codesearch#chromium/src/content/child/npobject_proxy.h)/[stub](https://code.google.com/p/chromium/codesearch#chromium/src/content/child/npobject_stub.h) parts to support multi-process mode, this allow renderer process to be sandboxed. A dedicated WebAPI channel will be created. Only npobject related messages will be sent and received in this channel, all NPAPI plugin stuff will be eliminated. All these change should not impact the original NPAPI plugin logic.

### Pluggable WebAPI

Crosswalk for Tizen WebRuntime needs pluggable WebAPI framework to support Tizen WebAPI. This means WebAPI can be implemented in shared libraries and loaded dynamically, somewhat like plugin. So we need to define a binary interface for this case. Fortunately, we already have a project called [WebAPIManager](https://github.com/crosswalk-project/WebAPIManager) to do such things based on NPAPI plugin. Ideas and implementation can be borrowed from WebAPIManager.

### Out-of-process WebAPI

In Crosswalk runtime mode, we need to support out-of-process WebAPI. Like NPAPI plugin, actual logic of WebAPI run in a dedicated process. The process model may be singleton, per API or per WebView process. The PluginHost of chromium can be a good reference.

### Permission control

TODO: We had a design for permission control in WebAPIManager project. Refer this [wiki page](https://tizen.jf.intel.com/index.php?title=WebRuntime/NPAPIManager/PermissionDesign). But need to rework for Crosswalk.

### Limitations

1. In multi-process mode, IPC leads performance penalty, especially when transmit large data.
2. NPObject messages are synchronous, bad API design or implementation may cause renderer hang.
