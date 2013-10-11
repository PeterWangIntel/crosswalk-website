## Usage scenarios
Crosswalk on Android can support packaging with XDK and Cordova and SysApps.
 * XDK
 * PhoneGap
 * SysApps

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
  * APK wrapper by calling runtime Java API
  * HTML/JavaScript/CSS files
  * Generated from APK template
  * Runtime is shared by each web application via library sharing
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
   