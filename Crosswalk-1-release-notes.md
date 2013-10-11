## Runtime

* Support packaged applications, zip’ed, using our own extension .xpk
* Initial manifest parsing
* Launch app in fullscreen mode
* Persistent event page
* Command line package installation on Tizen 2.x.
* Launch installed applications from home screen
* API to query details about the manifest
* API to retrieve the background page
* Web application integrated with task manager; can be terminated and switched from/to using Tizen 2.x
* Viewport meta tag handling across all Crosswalk configurations
* Configure what the / path of file:/// refers to (needed by Web Simulator)

## Extension System

* First release of extension system for Tizen - developers can create their own API extensions and install them as separate packages
* Run extensions in separated extension process, also support running them in-process
* Support require() primitive in JS API extensions
* Allows providing convenience and native functions when needed
* Basic support for dependency tracking, focusing on Tizen Device APIs case
* Provide bindings for code running in renderer process and tools for generating bindings.

## Crosswalk on Android

* First release of Crosswalk Runtime library APK 
* Run a simple web application without manifest support
* Package HTML/JS/CSS files into web app APKs
* Initial runtime infra to bridge capabilities from content to crosswalk
* Sample web applications to demonstrate HTML5 features and performance
* Hook up the runtime API’s on Android
* Initial web app APK template

## Crosswalk on Tizen

* Initial manifest parsing based on what is in Chromium
* Install an app via zip-file
* Initial package installation supporting on Tizen 2.x. 
* Web application (.xpk) could be installed to right place in Tizen 2.x using the command line
* Launch the app via home screen icon
* The successfully installed web application will have an icon on the home screen
* Initial integration with the Tizen task manager
* The installed web application can be launched from home screen. (Owner: Yongkang)
* Basic Aura support. Web application could be launched in Tizen 2.1
* Web application integrated with window manager and Tizen application lifecycle management
* Support launching app in fullscreen mode (not requestFullscreen API)
* Web application integrated with task manager. (Owner: Ilkka) 
* Support for Tizen HW-keys (menu&back). (Owner: Ilkka)
* Basic virtual keyboard support (basic). (Owner: Ilkka)
		
		
		
		
		
		
		
		