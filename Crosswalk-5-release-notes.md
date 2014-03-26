*Status: Beta*

*Supported platforms: Android 4.0 and newer*

*Chromium version: 34*

=New Features=

* Option to minify web apps when packaging
* Integration with system notifications
* [Vibration API] (http://www.w3.org/TR/vibration/)
* Initial support of launch screen for crosswalk on Android (needs doc)
* [Content Security Policy] (https://dvcs.w3.org/hg/content-security-policy/raw-file/tip/csp-specification.dev.html) support in manifest 
* New download folder and package structure to support multiple architectures in one packaging tool
* Use SIMD (Single Instruction, Multiple Data) in JavaScript with the [SIMD4JS API] (https://github.com/johnmccutchan/ecmascript_simd)
* Support for [Immersive Mode](https://developer.android.com/about/versions/kitkat.html#44-immersive) in fullscreen 

=Notable Bug Fixes=

* [XWALK-470] - Failed to get correct result of "background-position" when running tct-backgrounds-css3-tests on Android OS
* [XWALK-753] - setWebContentsDebuggingEnabled API missing in XWalk.
* [XWALK-909] - packaging tool does not work with minimal manifest
* [XWALK-933] - make_apk.py --enable-remote-debugging not working
* [XWALK-934] - Crosswalk doesn't honor Chrome GPU blacklist 
* [XWALK-939] - window.close doesn't work on Android OS
* [XWALK-940] - Unable to get the "messaging" permission on Android OS
* [XWALK-980] - Volume is too low when playing audio via WebAudio API.
* [XWALK-996] - XWalkView shouldInterceptRequest never called
* [XWALK-1039] - Remote debugging not enabled for debug build of Crosswalk Cordova application
* [XWALK-1116] - Capture API test in cordova_mob_spec crashes after recording the audio

=Known issues=

* [XWALK-1125] Music does not seamlessly loop
* [XWALK-1126] Setting gain to 0 does not mute
