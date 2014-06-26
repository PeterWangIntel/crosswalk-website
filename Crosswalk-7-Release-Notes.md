### Crosswalk 7.36.154.4 Beta

## New Features

* Rebased to [Chromium 36] (http://www.chromestatus.com/features)

#### Android

* First version of [public API for embedded usage (XWalkView)] (https://crosswalk-project.org/#documentation/apis/embedding_api)
* [Build Crosswalk applications with Eclipse] (https://crosswalk-project.org/#wiki/Crosswalk-Developer-Tools-Eclipse-plugin)
* Packaging tool generates APKs for both ARM and x86 processor architectures
* Support for Cordova 3.4.0
* Full support for ["Launch Screen" specification] (https://crosswalk-project.org/#wiki/Launch-Screen)
* [Pass Chromium command line options via configuration file] (https://crosswalk-project.org/#wiki/Use-Chromium-command-lines-in-your-apps-on-Android)
* [Option to prevent screen from switching off] (https://crosswalk-project.org/#wiki/Try-Crosswalk)
* [Option to ignore GPU blacklist] (https://crosswalk-project.org/#wiki/Use-Chromium-command-lines-in-your-apps-on-Android)

### Notable bug fixes

* [XWALK-817] - TCPSocket does not support addressReuse/bufferedAmount /noDelay attributes on Android OS
* [XWALK-822] - Handle security exception in Android messaging api
* [XWALK-985] - White screen when package web page named as "http.html" with --manifest
* [XWALK-1200] - Fullscreen immersive mode doesn't work by swiping up from bottom on Android OS
* [XWALK-1210] - Application with space in its name cannot be launched
* [XWALK-1212] - The webapp can be created successfully when set incorrect value of app-local-path option
* [XWALK-1250] - d8 crashes when constructing Float32x4Array or Int32x4Array without --simd-object flag
* [XWALK-1274] - There is an empty alert dialog popped up caused by network error when opening a remote site
* [XWALK-1460] -  Packaging tool enable set long string in package option
* [XWALK-1463] - The space is not replaced with '_' when the Manifest name is tail with space
* [XWALK-1582] - space is replaced with '_' when name contain space