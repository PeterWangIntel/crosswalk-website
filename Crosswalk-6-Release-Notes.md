### Crosswalk 6.35.131.1 Beta

## New Features

* Rebased to [Chromium 35] (http://www.chromestatus.com/features)

#### Android

* First version of public API for embedded usage (XWalkView) (docs?)
* [Build Crosswalk applications with Eclipse] (https://crosswalk-project.org/#wiki/Crosswalk-Developer-Tools-Eclipse-plugin)
* Packaging tool generates APKs for both ARM and x86 processor architectures
* Support for Cordova 3.4.0
* Full support for "Launch Screen" specification (docs?)
* Support for "default orientation" in manifest (docs?)
* Pass Chromium command line options via configuration file (docs?)
* Option to prevent screen from switching off (docs?)

** Bug
    * [XWALK-141] - Android Xwalk is failed to set location of iframe 
    * [XWALK-145] - tizen.application.getCurrentApplication() not implemented
    * [XWALK-817] - TCPSocket does not support addressReuse/bufferedAmount /noDelay attributes on Android OS
    * [XWALK-822] - Handle security exception in Android messaging api
    * [XWALK-971] - Fail to fire an event after create listener with method Video.addEventListener()/Audio.addEventListener on IVI
    * [XWALK-985] - White screen when package web page named as "http.html" with --manifest
    * [XWALK-1097] - [PnP][REG]The memory usage with calculator has 13% regression on IVI
    * [XWALK-1200] - Fullscreen immersive mode doesn't work by swiping up from bottom on Android OS
    * [XWALK-1210] - Application with space in its name cannot be launched
    * [XWALK-1212] - The webapp can be created successfully when set incorrect value of app-local-path option
    * [XWALK-1244] - Fail to install the same xpk again after uninstall it on generic image
    * [XWALK-1250] - d8 crashes when constructing Float32x4Array or Int32x4Array without --simd-object flag
    * [XWALK-1255] - Write a document about how to migrate existing cordova apps to crosswalk-based cordova
    * [XWALK-1256] - Enable allow file access from file urls for runtime
    * [XWALK-1265] - MediaPlayer app function does not work on IVI
    * [XWALK-1274] - There is an empty alert dialog popped up caused by network error when opening a remote site
    * [XWALK-1283] - Improve error messages for runtime and packaging tool.
    * [XWALK-1287] - Cordova build fails due to SSL handler API change in xwalk core library
    * [XWALK-1288] - Build cordova package failed by using crosswalk-cordova-6.34.109/114/120.0-arm.zip
    * [XWALK-1299] - [REG] The csp directives: media-src does not work
    * [XWALK-1310] - The notification does not close after click "Close Notification" button when running "Notifications" of "sanityapp" on Android OS
    * [XWALK-1311] - No popup menu when running “WebAPI/sanityapp/DragandDrop” on Android OS
    * [XWALK-1368] - [REG] The icon parameter of packer tool does not work
    * [XWALK-1373] - Lack of resources icon_64/48.png for MemoryGame
    * [XWALK-1374] - Fail to update app with crosswalk-6.34.114.0-0.x86_64 on generic image 20140403.9
    * [XWALK-1375] - Let Cordova-Crosswalk use the latest embedding API
    * [XWALK-1384] - Shared mode doesn't work for Chromium 35
    * [XWALK-1422] - [REG]"tizen.systeminfo" is undefined when running the "Tizen/Systeminfo" component on generic
    * [XWALK-1428] - The webapp can not be created when does not have index file
    * [XWALK-1430] - The test steps are incorrect when running the security suite
    * [XWALK-1431] - [REG] The video is black screen with fullscreen mode, but the voice is normal
    * [XWALK-1433] - The test steps is incorrect when running the rtcore suite
    * [XWALK-1442] - [REG] AudioContext interface does not work when running “WebAPI/webaudio” on Android OS
    * [XWALK-1445] - [REG] AudioContext interface does not work when running “WebAPI/webaudio” on generic
    * [XWALK-1449] - [REG]Source image is in the “broken” state when running “WebAPI/canvas” on Android OS
    * [XWALK-1451] - [REG]"tizen.bluetooth"/"tizen.push"/"tizen.callhostory" are undefined when running the "Tizen/Namespace" component on generic
    * [XWALK-1453] - [REG]1080p MP4 Video playback is quite unsmooth when running xwalk as service mode
    * [XWALK-1455] - [REG] Fail to get correct presentation info when running “WebAPI/presentation” on Android OS
    * [XWALK-1460] -  Packaging tool enable set long string in package option
    * [XWALK-1463] - The space is not replaced with '_' when the Manifest name is tail with space
    * [XWALK-1465] - The testing Apk does not exist when running the rtcore suite
    * [XWALK-1468] - The testing package does not exist when running the security suite
    * [XWALK-1470] - The webapp can be packed when the icon does not specify picture
    * [XWALK-1478] - The case description is incorrect in “WebAPI/runtime” component on Android OS
    * [XWALK-1479] - Fail to find test case for its name contains “[]” in “WebAPI/vibration” component on Android OS
    * [XWALK-1480] - The cordova app crashed while attempting to launch the apk on Cordova Canary 6.35.123.0
    * [XWALK-1481] - Not expose internal classes for core library
    * [XWALK-1536] - The expected output is incorrect when running the rtcore test cases
    * [XWALK-1537] - Crash on running app on device
    * [XWALK-1543] - Support the reload type of the Embedded API reload()
    * [XWALK-1544] - API documentation for embedding API
    * [XWALK-1557] - [REG] Remote debug does not work on generic image 20140417.6
    * [XWALK-1582] - space is replaced with '_' when name contain space
    * [XWALK-1589] - Fail to get correct value of “Display Available” when running “WebAPI/presentation” on Android OS
    * [XWALK-1596] - Define an annotation for XWalkView.addJavascriptInterface()
    * [XWALK-1604] - The running crosswalk hang when running the "WebAPI/Behavior/CSP" 
    * [XWALK-1607] - XDK APX build fails
    * [XWALK-1615] - [REG] Unable to run the Cordova API test on Cordova Canary 6.35.131.0

** Task
    * [XWALK-585] - [Tizen] HTML5 Date and Time state of input element
    * [XWALK-588] - "[Tizen] HTML5 telephone, email and URL state of input element"
    * [XWALK-896] - HTML5 fullscreen support using Wayland
    * [XWALK-898] - Improved packaging of Crosswalk Android deliverables
    * [XWALK-957] - Provide embedding API for Crosswalk: step 1
    * [XWALK-1013] - Public builds for Crosswalk-cordova
    * [XWALK-1211] - [Android] allow developer to ignore blacklist
    * [XWALK-1240] - Write documentation for how to deploy on Android
    * [XWALK-1382] - Enable xdg_shell for ozone-wayland in crosswalk 
    * [XWALK-1477] - Public release target for crosswalk core library.
    * [XWALK-1561] - [Android] Enable openFileChooser in XWalkUIClient for embedding API
