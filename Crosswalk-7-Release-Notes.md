### Crosswalk 7.36.154.4 Beta

## New Features

* Rebased to [Chromium 36] (http://www.chromestatus.com/features)
* Enabled Native Client (NaCL) on Tizen and Linux for 32 and 64-bit
* Capability to access native pure file system on Android and Tizen/Linux

#### Android

* Support for Cordova 3.5.0
* Support for In-App Purchases 
* Ability to open a file with third party app based on the file type
* Only letters, digits, " " and "_" are allowed for manifest app name

### Notable bug fixes

[XWALK-978] - Pixel game got blurred on crosswalk
[XWALK-1207] - Throw exception when packer tool manify css files with compressor option
[XWALK-1209] - Throw exception when packer tool manify JS files with compressor option
[XWALK-1245] - [REG] Font rendering is weird in Crosswalk 5
[XWALK-1298] - Character handling issue in manifest name field
[XWALK-1302] - Fail to get correct value of "box-decoration-break" when running "WebAPI/Backgrounds" on Android OS
[XWALK-1327] - Fail to get the value of “Hash” when running “WebAPI/sanityapp/AppURI” on Android OS
[XWALK-1329] - Fail to switch to Full Screen mode when running “WebAPI/sanityapp/FullScreen” on Android OS
[XWALK-1367] - [REG] Unable to launch application in fullscreen mode
[XWALK-1413] - [Beta]The video can not be played when running “WebAPI/sanityapp/” on Android OS
[XWALK-1466] - [Android] make_apk_test fails when out/ has both ARM and x86 builds
[XWALK-1467] - The webapp can not be installed when the Manifest name is head with special value
[XWALK-1472] - The webapp can be packed when the Manifest name with Tail Escape Char BackSlash or Tail Unit Dollar
[XWALK-1476] - Crosswalk crashes if the application name has a space in it
[XWALK-1538] - [PnP][REG]Power consumption of HTML5 video has increased ~14% on Android/Geek
[XWALK-1571] - Event tracing is broken in Crosswalk on Android
[XWALK-1574] - Use TextureView and SurfaceView for embedding API
[XWALK-1585] - The audio file cannot be played when running “WebAPI/sanityapp/webaudio” on Android OS
[XWALK-1592] - [Android] Add xwalk_core_sample_apk to xwalk_builder
[XWALK-1593] - [Android] Build CrosswalkSample with Eclipse.
[XWALK-1608] - [Android] Can not re-enter fullscreen mode again when playing embeded video
[XWALK-1616] - Launching Crosswalk-Cordova ARM app on IA device doesn't report Architecture mismatch error
[XWALK-1617] - Add the sample code for demonstrate the usage of some Crosswalk Embedding API
[XWALK-1618] - [REG] Apk will crash when set ‘undefined’ arch option
[XWALK-1623] - Launch screen display is delayed in Crosswalk 6
[XWALK-1627] - [REG] Javascript's native confirm box locks the app
[XWALK-1633] - [Android] Always get IntentReceiverLeaked message when exiting app using Presentation API
[XWALK-1635] - [Android] White screen displayed when no 'image' provided
[XWALK-1636] - The test steps is incorrect when running the sampleapp test cases
[XWALK-1639] - [Android] XWalk will crash when exit.
[XWALK-1641] - [REG]The app crash when excuting SystemInfoCellularNetwork test cases on IVI
[XWALK-1642] - [Android] Render native resource is not cleaned up after destroying XWalkView
[XWALK-1647] - Fail to load the external resource when running the "WebAPI/Behavior/CSP" on IVI
[XWALK-1653] - [Android] Timer can not resumed when resuming back
[XWALK-1654] - Crosswalk archive tool not add empty directory to the generated tarball
[XWALK-1666] - The "PACKAGENAME" within inst.sh is incorrect in wrt-i18n-tizen-tests package
[XWALK-1673] - Crosswalk doesn't build on Tizen Common ARM
[XWALK-1677] - [REG] Crosswalk will crash when launching HangOnMan sample app
[XWALK-1684] - The case descriptions in some manual cases are missing in "WebAPI/canvas" component
[XWALK-1685] - [REG]Crosswalk crashed when running WebAPI tests
[XWALK-1695] - [Android] onRsourceLoadStarted callback must be posted to UI thread to run
[XWALK-1702] - Blank browser after loading URL until it is resized
[XWALK-1707] - The running crosswalk hang when running the "Tizen/Download" component on IVI
[XWALK-1710] - Fail to install extensions package due to lack of dependency 'media-data-sdk' on Tizen Common
[XWALK-1711] - "space" in application name is replaced with "underscore"
[XWALK-1713] - Python 3 deprecated sys.maxint
[XWALK-1714] - Change error level message to warning level for loading extensions
[XWALK-1718] - [Android] Add space support in name field of manifest
[XWALK-1721] - Android packaging tool should have support of Python3
[XWALK-1725] - The 'undefined' value is an invalid choice in arch option when packing an webapp
[XWALK-1726] - The screen.lockOrientation method does not work when parameter is right when running “WebAPI/screenorientation” on Android OS
[XWALK-1727] - Fail to install "tizen-extensions-crosswalk" package because of missing the "media-thumbnail-server" dependence package on IVI
[XWALK-1735] - The notification.onshow event does not work when running “WebAPI/notification” on Android OS
[XWALK-1738] - [REG]Fail to update app on Tizen IVI
[XWALK-1754] - "DATABASE_ERR" thrown when invoking the "tizen.content.scanFile()" method which contains in the "Tizen/Content" component on IVI
[XWALK-1760] - [Android] Get a half black and white screen before going to the game when loading the splashscreen
[XWALK-1764] - [Beta]Fails to pack an web app when using value ['0123456 '] to set name parameter
[XWALK-1765] - [Beta]Throw exception when using packer tool to minify css/js files with compressor option
[XWALK-1776] - The default CSP policy should be enforced if web app is under CSP mode without setting any csp rule in config.xml.
[XWALK-1780] - onPageStarted will be fired when iframe URL changes.
[XWALK-1785] - [PnP]HTML5 VP8 Video performance is far away from target (7.5 FPS VS. 30 FPS)
[XWALK-1790] - Fail to create "WebAPI/Presentation" apk package whose name contains capital letter
[XWALK-1792] - Fail to run wrt-autohost-tizen-tests package on Tizen IVI
[XWALK-1793] - Pops up a “Ssl Certificate Error alert” window when running “WebAPI/WebSocket” on Android OS
[XWALK-1794] - [REG] Fail to open the external browser when running the "Behavior/ConfigurationExtension" on IVI
[XWALK-1795] - [Android] LaunchScreen need expand the path of image as manifest do
[XWALK-1796] - Refine tests for W3C Screen Orientation API
[XWALK-1809] - SIMD.JS API is not enabled for M36 based Crosswalk 7
[XWALK-1812] - v8-crosswalk ia32 debug mode build fails
[XWALK-1813] - [SIMD.JS]: SIMD.int32x4.select should take float32x4 instead of float64x2 as input parameters
[XWALK-1815] - XWalkView evaluateJavascript API should allow null resultCallback to align with Android WebView
[XWALK-1816] - [REG]AudioContext does not have activeSourceCount attribute when running “WebAPI/Web Audio” on Android OS
[XWALK-1821] - [REG]AudioContext does not have activeSourceCount attribute when running "WebAPI/Web Audio" on IVI
[XWALK-1829] - [REG]Fail to launch app with "xwalk-launcher <app_id>" on Tizen Common
[XWALK-1848] - Case description in “WebAPI/3dtransform” is not correct
[XWALK-1859] - Crosswalk Cordova should allow universal access from file URLs for Android 4.0.x
[XWALK-1863] - [Android] [Cordova] Start app and quickly press back button, the app will crash
[XWALK-1882] - XWalkViewClient.onPageStarted not being called
[XWALK-1886] - [REG]Fail to get test result when running the "tct-rt01-wrt-tests" component on IVI
[XWALK-1897] - The description of Test Steps is incorrect when running the "Webapi/speechapi" on IVI
[XWALK-1908] - Cache mode does not work.
[XWALK-1909] - Fail to load test case due to case entry is setting wrong when running “WebAPI/background” component
[XWALK-1940] - Notification.show() method should not be used in crosswalk test suites in “WebAPI/Notification”
[XWALK-1963] - CLONE - [Beta][REG] Webapp 100% crashes on Android Crosswalk if no SD card on test device
