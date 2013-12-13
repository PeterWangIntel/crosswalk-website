## Usage scenarios
Crosswalk on Android can support packaging with XDK and Cordova and SysApps.
 * XDK
 * PhoneGap
 * SysApps

## Packaging modes
Crosswalk on Android provides a packaging tool and some Java wrapper code which can bundle web applications into Android APKs. Since Crosswalk is a web engine and written in C/C++ and Java code and its size is somewhat big(>16M), here two alternatives are provided to decide whether to include Crosswalk runtime into web applications APKs. Currently two packaging modes are designed for users:

| | Embedded mode | Shared mode |
-------------|--------------------|------------------
| General introduction | All are packaged together, including crosswalk runtime and files for a web application. It’s intuitive and preferred for many usage scenarios.  | The shared mode provides one shared binary(called crosswalk runtime library APK) and a thin Java wrapper to call the shared binary. Each web app APK is small because it only includes the Java wrapper and the resources of web app. |
| Advantages | It's very important that web applications(APKs) have no other dependencies. All are bundled together. | a) It’s small because web app APK doesn’t include the crosswalk runtime, but a thin wrapper. b) Architecture independent. One web app APK for both IA and ARM architectures. |
| Disadvantages | a) Web app APKs are big >16M even for a small web app. b) Architecture dependent. Each web app has at least two APKs, one is for IA architecture and another is for ARM architecture.| Web app APKs depend on Crosswalk runtime library(XWalkRuntimeLib.apk). Risky when crosswalk runtime library APK is upgraded.  |
| Release targets | xwalk_app_template.tar.gz  | XWalkRuntimeLib.apk, xwalk_app_template.tar.gz |

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
  * Generate the runtime as a 'library' APK for Android
 * Runtime Core
  * An abstraction layer to provide Java classes to runtime and hide the internals of Content and Blink
  * Java classes only internally used by Runtime
  * Mainly customize and implement Content API by meeting requirements of runtime
 * Blink and Content
  * Provide HTML5 API, such as WebGL, WebRTC, WebAudio
  * Parallel JavaScript, WiDi, etc.
  * Performance improvement

## [BKMs](Android-BKM)
   