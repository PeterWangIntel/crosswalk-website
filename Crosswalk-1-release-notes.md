### Runtime

* Create and install packaged applications (.apk on Android, .xpk on Tizen)
* Initial manifest parsing
* Launch app in fullscreen mode
* Persistent event page
* Command line package installation
* Launch installed applications from home screen
* API to query details about the manifest
* API to retrieve the background page
* Web application integrated with task manager
* Viewport meta tag handling across all Crosswalk configurations
* W3C App URI API support

### Crosswalk on Android

* First release of Crosswalk Runtime library APK 
* Run a simple web application without manifest support
* Package HTML/JS/CSS files into web app APKs
* Initial runtime infra to bridge capabilities from content to crosswalk
* Sample web applications to demonstrate HTML5 features and performance
* Hook up the runtime API’s on Android
* Initial web app APK template
* Android API for debugging over USB

### Crosswalk on Tizen

* First release of Crosswalk RPM for Tizen with Aura support
* First release of extension system - developers can create their own API extensions and install them as separate packages
* Support for Tizen HW keys (menu&back)
* Basic virtual keyboard support 

### Extensions System

* _Tizen only - Android support coming in Crosswalk 2_
* Run extensions in separated extension process, also support running them in-process
* Support require() primitive in JS API extensions
* Allows providing convenience and native functions when needed
* Basic support for dependency tracking, focusing on Tizen Device APIs case
* Provide bindings for code running in renderer process and tools for generating bindings.

### APIs

* [app: URI] (http://www.w3.org/2012/sysapps/app-uri/)
* [Fullscreen] (http://fullscreen.spec.whatwg.org/)
* [Touch Events] (https://dvcs.w3.org/hg/webevents/raw-file/v1/touchevents.html)
* [Typed Array 1.0] (http://www.khronos.org/registry/typedarray/specs/latest/)
* [Media Queries Level 3] (http://w3c-test.org/csswg/mediaqueries3/)
* [Scalable Vector Graphics (SVG) 1.1] (http://www.w3.org/TR/SVG11/)
* [HTML Canvas 2D Context] (http://www.w3.org/TR/2dcontext/)
* [Online State] (http://www.w3.org/html/wg/drafts/html/CR/browsers.html#browser-state)
* [XMLHttpRequest] (http://www.w3.org/TR/XMLHttpRequest/)
* [WebSocket] (http://www.w3.org/TR/websockets/)
* [HTML5 web Messaging] (http://www.w3.org/TR/webmessaging/)
* [HTML5 Date and Time state of input element] (http://www.w3.org/TR/html5/forms.html#date-and-time-state-(type=datetime)) (_Android only_)
*  
		
		
		
		
		
		
		
		