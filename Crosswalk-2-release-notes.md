### Runtime 

* Initial Digital Signature in XPK Package Header
* Web Manifest
* Application runtime APIs (getMainDocument, getManifest)

### Android

* WebRTC support 
* Support version, description, permissions in packaging and manifest parsing tools
* Support the properties in manifest.json
* Media Capture and Streams
* DeviceOrientation event API

### Tizen

* --install, --uninstall and --list-apps command line options
* Bluetooth API

### Extensions framework

* Android support (except permissions for external extensions). See [documentation] (https://github.com/crosswalk-project/crosswalk-website/wiki/Writing-a-Crosswalk-Java-Extension-on-Android)
* Improved robustness: better browser and unit tests coverage, fixed race conditions and tons of internal fixes.
* Improved internal extensions execution model: now external extensions run in the main thread.
* Only load Extensions on demand, exactly on the first time they are used on a frame.
* Extensions writers can make use of JS helpers and small libraries by using the "requireNative()" function and the v8tools module.
* Create one Extension Process per Render Process. Now each WebApp will have its own pair of Renderer+Extensions Processes.
