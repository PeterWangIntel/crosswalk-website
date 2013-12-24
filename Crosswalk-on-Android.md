## Usage scenarios
Crosswalk on Android can support packaging with XDK and Cordova and SysApps.
 * XDK
 * PhoneGap
 * SysApps

## Packaging modes
Crosswalk on Android provides a packaging tool and Java wrapper layer which can bundle web applications into Android web app APKs. The Java wrapper layer can call Crosswalk runtime. Since Crosswalk runtime is a full-featured web engine mostly written in C/C++ and its size is somewhat big(> 16M), two alternatives are provided to bundle Crosswalk runtime with web apps. Currently the two modes are designed for users:

| | Embedded mode | Shared mode |
-------------|--------------------|------------------
| General description | All are packaged together, including crosswalk runtime, Java wrapper and a web application into one web app APK. It’s intuitive and preferred for many usage scenarios.  | The shared mode provides one shared standalone APK(called Crosswalk runtime library APK). The web app APK only pack web app and the Java wrapper layer which calls the shared binary included in the Crosswalk runtime library APK. So one web app APK is small. |
| Advantages | It's very important that web app APKs have no other dependencies. All needed are bundled together. | a) It’s small because web app APKs don't pack the crosswalk runtime, but a thin Java wrapper layer. b) Architecture independent. One web app APK can work for both IA and ARM architectures. |
| Disadvantages | a) Web app APKs are big >16M even for a small web app. b) Architecture dependent. Each web app needs at least two APKs, one is for IA architecture and another is for ARM architecture.| Web app APKs depend on a Crosswalk runtime library APK(XWalkRuntimeLib.apk). |
| Release targets | xwalk_app_template.tar.gz  | XWalkRuntimeLib.apk, xwalk_app_template.tar.gz |
| Support version | >= crosswalk 3 | >= crosswalk 1 |

## Architecture and Components
Web App APK: HTML/JS/CSS + Android manifest, resources + Java wrapper(calling crosswalk runtime)  
Runtime library APK: Crosswalk Runtime -> Crosswalk Runtime Core -> Content API -> Blink  
  
## Proposal
 * The reasons to partition this to several components are:
  * Hide the details of its based on components.
  * Track each component's quality easily via unit tests and Test shell(APKs used to test the functionalities of the component).
  * Provide the whole runtime as a 'library'.
  * Isolate them for clear understanding and tracking.
 * Web App APK
  * Java wrapper by calling runtime Java API
  * HTML/JavaScript/CSS files
  * Generated from APK template
  * Runtime is shared by each web application via library sharing( for the shared mode). Besides, runtime also can be bundled with web app APK( for the embedded mode).
 * Runtime
  * Runtime Java API, which is simple and easy to use
  * API extension infrastructure
  * App life cycle, SysApps, Intel API, System Info, UI controls,windowing
  * Misc other features
  * Generate the runtime as a 'library' APK for Android for shared mode. Or it could be bundled with App APK wrapper for the embedded mode.
 * Runtime Core
  * An abstraction layer to provide Java classes to runtime and hide the internals of Content and Blink
  * Java classes only internally used by Runtime
  * Mainly customize and implement Content API by meeting requirements of runtime
  * The layer used by cordova container integration.
 * Blink and Content
  * Provide HTML5 API, such as WebGL, WebRTC, WebAudio
  * Parallel JavaScript, WiDi, etc.
  * Performance improvement

## [BKMs](Android-BKM)
   