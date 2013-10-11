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

