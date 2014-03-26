Status: Beta
Supported platforms: Android 4.0 and newer

New Features

    * Option to minify web apps when packaging
    * Integration with system notifications
    * Vibration API (http://www.w3.org/TR/vibration/)
    * Initial support of launch screen for crosswalk on Android (needs doc)
    * Content Security Policy support in manifest (https://dvcs.w3.org/hg/content-security-policy/raw-file/tip/csp-specification.dev.html)
    * [XWALK-680] - RequestAnimationFrame JavaScript API
    * [XWALK-692] - [Android] Crosswalk CSP support
    * [XWALK-775] - Support app version for both ARM and IA architectures
    * [XWALK-866] - [Tizen] DLNA Media Server API
    * [XWALK-875] - Implement JavaScript SIMD API
    * [XWALK-964] - [Android] Allow devtools connection from other processes
    * [XWALK-979] - Enable immersive mode for fullscreen
    * [XWALK-989] - Integration with application framework (AMD)
    * [XWALK-1009] - [Feature] Wiget package update from local
    * [XWALK-1035] - Sync extension files in project t-e-c with  extenisions/public in project crosswalk
    * [XWALK-1067] - [Tizen][IVI] System Information API
    * [XWALK-1084] - Use extension js files as resource in xwalk_core_library
    * [XWALK-1085] - Use xwalk.pak as resource in xwalk_core_library
    * [XWALK-1106] - [Tizen][IVI] SpeechSynthesis API
    * [XWALK-1158] - [Feature] Web Application Installation 
    * [XWALK-1159] - [Feature] Web Application Update 
    * [XWALK-1160] - [Feature] Web Application Uninstallation 
** Task
    * [XWALK-229] - Tizen packaging: specify and ship the proper licenses
    * [XWALK-285] - [tizen] Geolocation
    * [XWALK-295] - [android] Vibration API
    * [XWALK-902] - Update Tizen Mobile builds to Tizen 2.2 
    * [XWALK-915] - IVI specific extensions rpm

Notable bug fixes

    * [XWALK-44] - [Tizen] viewport metatag does not work
    * [XWALK-470] - Failed to get correct result of "background-position" when running tct-backgrounds-css3-tests on Android OS
    * [XWALK-753] - setWebContentsDebuggingEnabled API missing in XWalk.
    * [XWALK-803] - "Sensor Ball" Tizen Sample application doesn't work well on Android
    * [XWALK-880] - [REG] Have no sound when launching the Hangonman app 
    * [XWALK-897] - Permission doc for Cordova package
    * [XWALK-909] - packaging tool don't work with minimal manifest on wiki
    * [XWALK-917] - Build on Tizen Generic for x64 arch is broken 
    * [XWALK-930] - fetch_deps.py is broken after depot_tools r249077
    * [XWALK-933] - make_apk.py --enable-remote-debugging not working
    * [XWALK-934] - Use chrome blacklist
    * [XWALK-935] - make_apk.py no longer executable
    * [XWALK-937] - Adding CA certificates to Android app (workaround for eg RapidSSL cert missing on some phones)
    * [XWALK-939] - window.close doesn't work on Android OS
    * [XWALK-940] - Unable to get the "messaging" permission on Android OS
    * [XWALK-980] - The voice sounds too low when playing audio through WebAudio API.
    * [XWALK-996] - [Android] XWalkView shouldInterceptRequest never called
    * [XWALK-1006] - [Android] Unable to use spaces in application name
    * [XWALK-1017] - onPageFinished callback in XWalkClient will be called twice
    * [XWALK-1022] - Problem in creating a new HttpResponseHeader for CSP information
    * [XWALK-1039] - Enable remote debugging for debug build of crosswalk cordova app
    * [XWALK-1055] - [REG]HTML5 Web Audio Latency fail to run after rebasing to M34
    * [XWALK-1086] - [REG] File picker doesn’t work on Android OS
    * [XWALK-1092] - [REG]AudioContext interface does not exist in window when running “WebAPI/webaudio” on Android OS
    * [XWALK-1116] - Capture API test in cordova_mob_spec crashes after recording the audio
    * [XWALK-1129] - [REG] The Gallery App will be crash




Known issues:

https://crosswalk-project.org/jira/browse/XWALK-1126
https://crosswalk-project.org/jira/browse/XWALK-1125
https://crosswalk-project.org/jira/browse/XWALK-1123