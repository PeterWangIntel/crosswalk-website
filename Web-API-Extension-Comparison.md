### WebKitGtk
 
WebAPI extension in WebKitGtk is straightforward: Create a JavaScript object by using JavaScriptCore API and bind it to a frame's JavaScript context.
 
**Reference:**
* http://webkitgtk.org/reference/webkitgtk/stable/WebKitWebFrame.html#webkit-web-frame-get-global-context
* http://webkitgtk.org/reference/webkitgtk/stable/webkitgtk-webkitwebview.html#WebKitWebView-window-object-cleared
 
**Example:**
* http://rvr.typepad.com/wind/2011/10/webkit-extending-javascript-1.html
 
### QtWebkit
 
QtWebKit bridge is a mechanism that extends WebKit's JavaScript environment to access native objects that are represented as QObjects. It takes advantage of the QObject introspection, a part of the Object Model, which makes it easy to integrate with the dynamic JavaScript environment, for example QObject properties map directly to JavaScript properties.
 
**Reference:**
* http://qt-project.org/doc/qt-4.8/qtwebkit-bridge.html
 
### Android Webview
 
Android Webview has a method called "addJavaScriptInterface" to inject an object into JavaScript context of main frame. Actually, Android Webview is just a Java wrapper of WebCore.  It has the same mechanism with QtWebKit except in Java language through JNI. 
 
See [here](Android-WebView) for more details.
 
**Reference:**
* http://developer.android.com/reference/android/webkit/WebView.html#addJavascriptInterface(java.lang.Object, java.lang.String)
 
**Example:**
* http://developer.android.com/guide/webapps/webview.html#BindingJavaScript
 
### CEF3
 
CEF3 provides comprehensive and convenient APIs to interactive with JavaScript engine. Because CEF3 is based on chromium, it uses Google V8 JavaScript engine instead of JavaScriptCore. CEF3 has wrapper classes for V8 C++ APIs to help to manipulate JavaScript object in C++. But CEF3 has no introspection mechanism like QtWebKit.

**Reference:**
* https://code.google.com/p/chromiumembedded/wiki/JavaScriptIntegration

### Chromium Extension API

Chrome Extension API is the only one support multi-process architecture. It allow renderer process to run inside chromium sandbox. Operations which need privilege can be delegated by browser process. This procedure is transparent to developers. But Chrome Extension API in higher layer than content API and very complex.

See [here](Overview-of-Chrome-Extension-API-Infrastructure) for more technical details.

### Thoughts about Crosswalk

[Crosswalk WebView model](Deployment-Models#webview-embedded) needs support a mechanism for 3rd-party developers to extend WebAPI.

**Renderer has full privilege.**
 
This scenario is similar as CEF3, WebAPI extension can be implemented directly in renderer process. Crosswalk should provide WebIDL compiler which can generate V8 binding stubs from IDL files. 
 
**Renderer runs in chromium sandbox.**

In this scenario, WebIDL compiler has to generate 2 sets of stub files. One for renderer side, to collect parameters and call browser side through RPC. Another part do real works in browser side, response the RPC invocations and send back result. This mechanism is somewhat like Chrome Extension API.

***

## Pluggable extension mechanism

Support pluggable WebAPI extension is not a goal for Crosswalk currently. Just list here FYI.

### NPAPI

NPAPI supports npruntime interface to extend WebAPI. NPAPI plugin runs in dedicated, full privilege process,  renderer can run inside chromium sandbox. To write WebAPI based on raw NPAPI/npruntime interface is complicated. But fortunately, we had written a framework called [WebAPIManager](https://github.com/crosswalk-project/WebAPIManager) to simplify the procedure. Currently support both Linux and Windows platform.

The biggest concern about this approach is that Google think NPAPI is obsolete, and disable NPAPI support in content API layer.

### PPAPI
Limitations:
* PPAPI is mostly used to serve for NaCl, not JavaScript. A PPAPI plugin can only communicated with JavaScript code through the PostMessage interface. This is awkward for Web developers and lacks synchronize support.
* PPAPI is running inside sandbox. Privileged operations have to be delegated by UI process. Currently there is no plugin framework for the delegates.
* PPAPI interface is not stable, Google may change it in the future since it is the only user currently.

### NaCl
This approach has all limitations of PPAPI plugin based, and plus extreme complexity.
