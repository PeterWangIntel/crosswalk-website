## Runtime

#### Common

#### Android

* Support app:// scheme for web apps

#### Tizen

* "Run As Service" - Allow to run Crosswalk as a central daemon process with additional render/extension process for each running applications
* [XWALK-1] - Runtime model event system
* [XWALK-113] - Extension Process SMACK support in Crosswalk for Tizen 2.x
* [XWALK-115] - Run a “wgt” package from Tizen samples
* [XWALK-360] - Support for Tizen legacy application packages
* [XWALK-380] - .wgt Archive
* [XWALK-381] - config.xml Parsing
* [XWALK-403] - Initial Crosswalk support for Tizen IVI

    * [XWALK-309] - [Feature] App.runtime APIs 
    * [XWALK-343] - Cordova-xwalk-android rebase to 3.3.0
    * [XWALK-388] - app: URI
    * [XWALK-463] - [Feature] Web app update from local
    * [XWALK-518] - Basic application runtime events
    * [XWALK-519] - Register system events information into database during installation.
    * [XWALK-545] - Document the embedded mode for Android port
    * [XWALK-546] - Update the user guide in crosswalk-project.org for the embedded mode
    * [XWALK-547] - Port crosswalk-demos into the embedded mode
    * [XWALK-558] - Runtime APIs
    * [XWALK-578] - WebGL 1.0
    * [XWALK-595] - Add crosswalk in user agent
    * [XWALK-596] - Initial application runtime onLaunch event support
    * [XWALK-605] - [Extensions] Make extension namespace read-only
    * [XWALK-630] - [Feature]Crosswalk CSP supporting
    * [XWALK-631] - [Tizen] Enable WebRTC on Crosswalk
    * [XWALK-650] - Implement application runtime onSuspend event API.
    * [XWALK-651] - Bridge crosswalk manifest permission to Android Manifest in packaging tool.
    * [XWALK-656] - Cross-Origin Resource Sharing
    * [XWALK-657] - iframe
    * [XWALK-658] - Server Sent Events
    * [XWALK-676] - Navigation Timing 
    * [XWALK-677] - Resource Timing
    * [XWALK-678] - User Timing
    * [XWALK-681] - High Resolution Time
    * [XWALK-694] - Suppport 16 Cordova 3.3.0 compatible APIs
    * [XWALK-705] - [Android] Implement runtime flags for features
    * [XWALK-723] - Implement application runtime onInstalled event API.
    * [XWALK-728] - [android] Speech Recognition API
    * [XWALK-773] - HTML5 fullscreen API support
    * [XWALK-774] - 'Move to SD' doesn't work on Crosswalk on Android

### API
    * [XWALK-300] - WebAudio
    * [XWALK-450] - WebRTC API

    * [XWALK-162] - [Android] screen.orientation should be supported on Android

    * [XWALK-79] - Screen orientation API


** Bug
    * [XWALK-132] - [Tizen] Portrait indicator is used when Crosswalk is in landscape mode
    * [XWALK-133] - Non-root user is unable to install xpk on Tizen 2.1
    * [XWALK-167] - Crosswalk should not run all Browser Process initialization when we use xwalk --install and related commands
    * [XWALK-228] - [Android] Prefences file can't be created correctly.
    * [XWALK-344] - Touch/Gesture events work as expected on Android
    * [XWALK-464] - "IOErrormsg" error is thrown when invoking resolve() method during the "TIZEN/filesystem" component 
    * [XWALK-520] - XWalk crashes on Android 4.4 after back button is pressed
    * [XWALK-540] - [Extensions] Running browsertests with --disable-extension-process fails
    * [XWALK-544] - Unit tests for embedded mode for packaging tool
    * [XWALK-600] - "download" can be modified when invoking the "check_readonly()" method which contains in the "Tizen/download" component
    * [XWALK-612] - Refactor JobFactory for Android
    * [XWALK-633] - XWalk core shell would crash on Android 4.3 + Clovertail PR2
    * [XWALK-653] - Refactor IO Client thread in xwalk
    * [XWALK-654] - Make shouldOverrideUrlLoad prior to NavigationHandler in java client 
    * [XWALK-655] - Refactor App handler and content handler for job factory
    * [XWALK-666] - Refine the help information for make_apk.py
    * [XWALK-686] - [Extensions] Accessing trampoline from a different JS context is crashing
    * [XWALK-695] - Manifest.json parser can't get the correct entry HTML file
    * [XWALK-721] - [Application][D-Bus] Improve our interface names, service name and object paths
    * [XWALK-725] - Sunspider test aborted unexpectedly from crosswalk on both Android and Tizen
    * [XWALK-736] - [REG]The webtesting app exits abnormally on Android OS
    * [XWALK-737] - Unable to get the Packaging tool version info
    * [XWALK-748] - [Tizen] System Indicator is getting event coordinates wrongly
    * [XWALK-749] - [Android][Extensions] Fix ownership of XWalkExtension objects
    * [XWALK-760] - crosswalk-cordova-android build fails due to HttpAuthHandler API change in XwalkCoreLibrary
    * [XWALK-763] - Margin improvements in HTTP Auth dialog
    * [XWALK-766] - App packaging tool can't work with python 3.0+
    * [XWALK-767] - Refactor xwalk settings
    * [XWALK-768] - Refine the comments and code of some files
    * [XWALK-771] - Fix java reflection compiling warning issues in xwalk client and webchrome client tests
    * [XWALK-782] - Crosswalk will crash when click the Pass/Fail/Back buttons 
    * [XWALK-794] - navigator.App.exitApp makes Android process crash
    * [XWALK-795] - Need to enable about:tracing in XWalkCoreShell on Android
    * [XWALK-796] - Remove the trailing spaces in the lines of AndroidManifest.xml of app_template
    * [XWALK-821] - Crash when re-open presentation app on ARM devices 
    * [XWALK-841] - The module Remote debugging with USB crashed on Android ARM OS
    * [XWALK-854] - [Android] getUserMedia always shows user facing camera
    * [XWALK-856] - [Android] XWalkRuntimeClientEmbeddedShell debug mode crash when it was launched.
    * [XWALK-873] - Trybots doesn't work for chromium-crosswalk repo
    * [XWALK-909] - packaging tool don't work with minimal manifest on wiki

** Feature



** Task
    * [XWALK-266] - [android] Example API
    * [XWALK-277] - [tizen] Screen orientation API
    * [XWALK-279] - [android] Messaging API
    * [XWALK-286] - [tizen] Web Notifications
    * [XWALK-287] - [android] Web Notifications
    * [XWALK-294] - [tizen] Vibration API
    * [XWALK-299] - [tizen] WebAudio
    * [XWALK-390] - [Android] app: URI
    * [XWALK-448] - [Tizen] Battery Status API
    * [XWALK-451] - [Tizen] WebRTC API
    * [XWALK-515] - WebView/XWalkView dynamic switching 
    * [XWALK-533] - Crosswalk DB storage system is too complex to reivew and modify, need to refactor it.
    * [XWALK-555] - [Android] Permission Control
    * [XWALK-579] - [Tizen] WebGL 1.0
    * [XWALK-580] - [Android] WebGL 1.0
    * [XWALK-585] - [Tizen] HTML5 Date and Time state of input element
    * [XWALK-589] - "[Android] HTML5 telephone, email and URL state of input element"
    * [XWALK-608] - Refactor the solution to support the embedded mode
    * [XWALK-688] - Write proposal for a Bluetooth API
    * [XWALK-707] - Fix ownership at Chromium Content API embedding classes: ContentBrowserClient, MainParts, BrowserContext
    * [XWALK-709] - Upstream crosswalk support into Cordova Step 1 - platform engine architecture in Cordova Android
    * [XWALK-824] - [tizen] HTML5 fullscreen API
    * [XWALK-825] - [android] HTML5 ful