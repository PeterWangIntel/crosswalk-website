### Crosswalk 7.36.154.4 Beta

## New Features

* Rebased to [Chromium 36.0.1985.18] (http://www.chromestatus.com/features) which brings:
   * CSS touch-action
   * CSS will-change
   * HTML imports
   * Object.observe()
   * Unprefixed CSS Transforms
   * Web Animations JavaScript API [element.animate()]
* Enabled Native Client (NaCL) on Tizen and Linux for 32 and 64-bit
* Capability to access native pure file system on Android and Tizen/Linux

#### Android

* Support for Cordova 3.5.0
* Support for In-App Purchases 
* Ability to open a file with third party app based on the file type
* Only letters, digits, " " and "_" are allowed for the application's name in the manifest

## Notable bug fixes

* [XWALK-978] - Pixel game got blurred on crosswalk
* [XWALK-1207], [XWALK-1209] - Exception thrown when minifying CSS and JS files packer tool minify css files with compressor option
* [XWALK-1245] - Font rendering is weird in Crosswalk 5
* [XWALK-1367] - Unable to launch application in fullscreen mode
* [XWALK-1466] - make_apk_test fails when out/ has both ARM and x86 builds
* [XWALK-1476] - Crosswalk crashes if the application name has a space in it
* [XWALK-1538] - Power consumption of HTML5 video has increased ~14% on Android/Geek
* [XWALK-1574] - Use TextureView and SurfaceView for embedding API
* [XWALK-1608] - Can not re-enter fullscreen mode again when playing embeded video
* [XWALK-1616] - Launching Crosswalk-Cordova ARM app on IA device doesn't report Architecture mismatch error
* [XWALK-1618] - Apk will crash when set ‘undefined’ arch option
* [XWALK-1623] - Launch screen display is delayed in Crosswalk 6
* [XWALK-1627] - Javascript's native confirm box locks the app
* [XWALK-1633] - Always get IntentReceiverLeaked message when exiting app using Presentation API
* [XWALK-1635] - White screen displayed when no 'image' provided in Launch Screen
* [XWALK-1639] - XWalk will crash when exit.
* [XWALK-1653] - Timer can not resumed when resuming back
* [XWALK-1695] - onRsourceLoadStarted callback must be posted to UI thread to run
* [XWALK-1702] - Blank browser after loading URL until it is resized
* [XWALK-1711] - "space" in application name is replaced with "underscore"
* [XWALK-1713] - Python 3 deprecated sys.maxint
* [XWALK-1760] - Get a half black and white screen before going to the game when loading the splashscreen
* [XWALK-1780] - onPageStarted will be fired when iframe URL changes.
* [XWALK-1815] - XWalkView evaluateJavascript API should allow null resultCallback to align with Android WebView
* [XWALK-1859] - Crosswalk Cordova should allow universal access from file URLs for Android 4.0.x
* [XWALK-1863] - Start app and quickly press back button, the app will crash
* [XWALK-1882] - XWalkViewClient.onPageStarted not being called
* [XWALK-1908] - Cache mode does not work.
* [XWALK-1963] - Webapp 100% crashes on Android Crosswalk if no SD card on test device

[Release notes in Jira](https://crosswalk-project.org/jira/secure/ReleaseNote.jspa?projectId=10001&version=10606)