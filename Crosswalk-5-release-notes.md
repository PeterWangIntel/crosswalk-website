Status: Beta

Supported platforms: Android 4.0 and newer

Chromium version: 34

New Features

* Option to minify web apps when packaging
* Integration with system notifications
* [Vibration API] (http://www.w3.org/TR/vibration/)
* Initial support of launch screen for crosswalk on Android (needs doc)
* [Content Security Policy] (https://dvcs.w3.org/hg/content-security-policy/raw-file/tip/csp-specification.dev.html) support in manifest 
* New download folder and package structure to support multiple architectures in one packaging tool
* Support SIMD (Single Instruction, Multiple Data) in JavaScript with the [SIMD4JS API] (https://github.com/johnmccutchan/ecmascript_simd)
* Support [Immersive Mode](https://developer.android.com/about/versions/kitkat.html#44-immersive) for fullscreen 

Notable bug fixes

    * [XWALK-470] - Failed to get correct result of "background-position" when running tct-backgrounds-css3-tests on Android OS
    * [XWALK-753] - setWebContentsDebuggingEnabled API missing in XWalk.
    * [XWALK-909] - packaging tool don't work with minimal manifest on wiki
    * [XWALK-933] - make_apk.py --enable-remote-debugging not working
    * [XWALK-934] - Use chrome blacklist
    * [XWALK-935] - make_apk.py no longer executable
    * [XWALK-937] - Adding CA certificates to Android app (workaround for eg RapidSSL cert missing on some phones)
    * [XWALK-939] - window.close doesn't work on Android OS
    * [XWALK-940] - Unable to get the "messaging" permission on Android OS
    * [XWALK-980] - The voice sounds too low when playing audio through WebAudio API.
    * [XWALK-996] - [Android] XWalkView shouldInterceptRequest never called
    * [XWALK-1017] - onPageFinished callback in XWalkClient will be called twice
    * [XWALK-1022] - Problem in creating a new HttpResponseHeader for CSP information
    * [XWALK-1039] - Enable remote debugging for debug build of crosswalk cordova app
    * [XWALK-1086] - [REG] File picker doesn’t work on Android OS
    * [XWALK-1092] - [REG]AudioContext interface does not exist in window when running “WebAPI/webaudio” on Android OS
    * [XWALK-1116] - Capture API test in cordova_mob_spec crashes after recording the audio
    * [XWALK-1129] - [REG] The Gallery App will be crash

Known issues:

https://crosswalk-project.org/jira/browse/XWALK-1126
https://crosswalk-project.org/jira/browse/XWALK-1125
https://crosswalk-project.org/jira/browse/XWALK-1123