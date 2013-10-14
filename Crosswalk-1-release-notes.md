### Runtime

* Create and install packaged applications (.apk on Android, .xpk on Tizen)
* Initial manifest parsing
* Launch app in fullscreen mode
* Persistent event page
* Command line package installation
* Launch installed applications from home screen
* Web application integrated with task manager
* Viewport meta tag handling across all Crosswalk configurations

### Crosswalk on Android

* First release of Crosswalk Runtime library APK 
* Run a simple web application without manifest support
* Package HTML/JS/CSS files into web app APKs
* Sample web applications to demonstrate HTML5 features and performance
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

* [app: URI] (http://www.w3.org/2012/sysapps/app-uri/) (_Tizen only_)
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
*  [HTML5 telephone, email and URL state of input element] (http://www.w3.org/TR/html5/forms.html#telephone-state-(type=tel)) (_Android only_)
* [Indexed DB] (https://dvcs.w3.org/hg/IndexedDB/raw-file/default/Overview.html)
* [Web Storage] (http://www.w3.org/TR/webstorage/)
* [File API] (http://dev.w3.org/2006/webapi/FileAPI/)
* [File API: Directories and System] (http://dev.w3.org/2009/dap/file-system/file-dir-sys.html)
* [File API: Writer] (http://dev.w3.org/2009/dap/file-system/file-writer.html)
* [Web SQL] (http://www.w3.org/TR/webdatabase/)
* [CSS Color Module Level 3] (http://www.w3.org/TR/css3-color/)
* [Selectors Level 1] (http://www.w3.org/TR/selectors-api/)
* [Selectors Level 2] (http://www.w3.org/TR/selectors-api2/)
* [CSS Backgrounds and Borders Level 3] (http://www.w3.org/TR/css3-background/)
* [CSS Multi-column Layout] (http://www.w3.org/TR/css3-multicol/)
* [CSS Flexible Box Layout ] (http://www.w3.org/TR/css3-flexbox/)
* [CSS Text Decoration Level 3] (http://www.w3.org/TR/css-text-decor-3/)
* [CSS Animations] (http://www.w3.org/TR/css3-animations/)
* [CSS Fonts Level 3] (http://www.w3.org/TR/css3-webfonts/)
* [CSS Transforms] (http://www.w3.org/TR/css3-transforms/)
* [CSS Transitions] (http://www.w3.org/TR/css3-transitions/)
* [Navigation Timing] (http://www.w3.org/TR/navigation-timing/)
* [Resource Timing] (http://www.w3.org/TR/resource-timing/)
* [Page Visibility] (http://www.w3.org/TR/page-visibility/)
* [Web Workers] (http://www.w3.org/TR/workers/)
		
		
		
		
		
		
		
		