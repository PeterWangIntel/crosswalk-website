### 1. Arch & Components
 * Android WebView in AOSP will be based on AwContents which is on top of Content API and Content View
 * Different from Content API, it also depends on components originally from chrome browser, now in standalone modules, located in components/, including components of auto_login_parser, navigation_interception, visitedlink_browser, visitedlink_renderer and web_contents_delegate_android. These are useful for pages.
 * No renderer process(in-process renderer) so no sandbox mechanism
 * Graphics architecture is very different from content shell. It's still ongoing and expected to support software and hardware output.

### 2. API
 * API is somewhat similar to EFL webview. No exposal about internal browser/renderer/gpu processes
 * Capabilities to load URL and events or callbacks of page loading
 * JavaScript API extension via addJavaScriptInterface. It allows JavaScript call to Java code, but reverse direction is not supported
 * Kinds of APIs to provide page change notifications, callbacks for web pages

### 3. Message Loop & Events processing
 * Integrate with Android Message handling by leveraging ContentView
 * Native code sets timer into Message Loop of Java side

### 4. Graphics
 * The rendering now is hardware acceleration by using chromium compositors.
 * The output of compositor support software and hardware surface outputs.
 * The architecture of hardware acceleration is different from others like content shell but it's like ChromeOS.  Now it's in early stage, will use UberCompositor for software output.

### 5. WebAPI extension
 * The API addJavaScriptInterface is for JavaScript API extension but only for the direction from JavaScript to Java code
 * The reverse call direction(Java -> JavaScript) is not supported.
 * addJavaScriptInterface is supported via NPObject mechanism which is previously used by NPAPI plugin. It supports out-of-process accessing though it's not needed in WebView now.
 * Event notification from Java side seems not supported.

### 6. Details and Coverage of API
 * WebViewClient for page changed notifications
 * WebChromeClient for callbacks to participate in rendering logic
 * Native Code/JS interaction
 * Page loading
 * Navigation & History
 * Text Search
 * Event handling
 * Trackball, touch, keyboard
 * No support for mouse event
 * Settings: Encoding
 * Page Info: Title, favicon
 * HTTPS/SSL
 * Page loading status, scale, redirects, override url, etc.

### 7. Source code
 * src/android_webview
  * android_webview_java.jar, libwebviewchromium.so and webviewchromium.pak are target of this module.
 * Google engineers are working on new WebView on top of Chrome-core in Android Open source project.
  * Official site: https://android.googlesource.com/platform/frameworks/base.git/+/master/core/java/android/webkit/
  * Mirror: https://github.com/android/platform_frameworks_base/tree/master/core/java/android/webkit 
 * Third party developers work in progress to implement ChromeView based on android_webview module.
  * ChromeView has the same APIs to Android Webview.
  * https://github.com/pwnall/chromeview-src