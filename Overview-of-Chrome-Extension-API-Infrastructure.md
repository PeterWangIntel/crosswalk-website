The Chrome extension API is based on a different mechanism from Blink/WebKit API. It's implemented on Chromium level rather than WebKit. The mechanism consists of permission checking, API definition, API binding and API handling. This page give an overview of main modules for API binding and handling.

### Main modules

The UML diagram illustrates the main classes that are referred to Chrome Extension API implementation.

![Chrome extension API Infrastructure](https://raw.github.com/crosswalk-project/crosswalk/master/wiki/images/chrome_extension_api_infrastructure.png?login=cmarcelo&token=204b8e4407efaf01d4efc5c14ff859e8)

* ChromeContentRendererClient.

  When render thread in renderer process is started. The member function DidCreateScriptContext() will be called to load all required APIs.

* Dispatcher.

  Load defined APIs and expose them to the V8 context; Dispatches extension control messages sent to the renderer and stores renderer extension related state.

* ModuleSystem.

  A module system for JS similar to node.js' require() function. Each module has three variables in the global scope:
** exports, an object returned to dependencies who require() this module.
** require, a function that takes a module name as an argument and returns that module's exports object.
** requireNative, a function that takes the name of a registered NativeHandler and returns an object that contains the functions the NativeHandler defines.
  Each module in a ModuleSystem is executed at most once and its exports object cached.

* ObjectBackedNativeHandler.

  An ObjectBackedNativeHandler is a factory for JS objects with functions on them that map to native C++ functions. Subclasses should call RouteFunction() in their constructor to define functions on the created JS objects.

* RequestSender.

  Responsible for sending requests for named extension API functions to the extension host and routing the responses back to the caller.

* ExtensionHelper.

  RenderView-level plumbing for extension features. It handles reponsed IPC from browser process.

* ExtensionHost.

  This class is the browser component of an extension component's RenderView. It handles setting up the renderer process, if needed, with special privileges available to extensions. It may have a view to be shown in the browser UI, or it may be hidden. The IPC message ExtensionHostMsg_Request is handled in this class.

* ExtensionHostMsg_Request.

  IPC message of extension API invoking. It wrappers the API name and paramters.

* ExtensionHostMsg_Request.

  IPC message of extension API response. It wrappers invoking results.

* ExtensionFunctionDispatcher.

  A factory function for creating new ExtensionFunction instances. ExtensionFunctionDispatcher receives requests to execute functions from ExtensionHost and dispatches them to the appropriate handler. It lives entirely on the UI thread of browser process.

* ExtensionFunctionRegistry.

  It contains a list of all known extension functions and allows ExtensionFunctionDispatcher to create instances of them.

* ExtensionFunction.

  Abstract base class for extension functions the ExtensionFunctionDispatcher. The logic of an extension API is implemented as the member Run(). Clients should initialize the ExtensionFunction using SetArgs(), set_request_id(), and the other setters before calling Run(). Derived classes should be ready to return GetResultList() and GetError() before returning from this function.

### API Binding

This sequence diagram below shows the main steps of API binding.

![Chrome extension API Binding](https://raw.github.com/crosswalk-project/crosswalk/master/wiki/images/chrome_extension_api_binding.png?login=cmarcelo&token=1cb554e5b6c0bea9bbc863622fef72ff)

### API Handling

This sequence diagram below shows the main steps of API handling.

![Chrome extension API Handling](https://raw.github.com/crosswalk-project/crosswalk/master/wiki/images/chrome_extension_api_handling.png?login=cmarcelo&token=f78f6bb2a758c025bc18dd6dcc4a5ed2)