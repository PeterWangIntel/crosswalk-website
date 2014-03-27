### Crosswalk 5.34.104.1 Beta

##New Features

* Use SIMD (Single Instruction, Multiple Data) in JavaScript with the [SIMD4JS API] (https://github.com/johnmccutchan/ecmascript_simd) (_Note: SIMD operations are only accelerated on x86 architecture at present_)
* Support for declaring a default [Content Security Policy] (https://dvcs.w3.org/hg/content-security-policy/raw-file/tip/csp-specification.dev.html) in the manifest file 
* New download folder and package structure to support multiple architectures in one packaging tool
* Ability to minify web app resources (JS, CSS) during packaging
* Rebased to Chromium 34, which brings:
   * Unprefixed Web Audio support
   * Responsive images
   * [Vibration API] (http://www.w3.org/TR/vibration/)


### Android

* Android 4.4+ now uses [Immersive Mode](https://developer.android.com/about/versions/kitkat.html#44-immersive) when in fullscreen
* Integration with system notifications
* Initial support for declaring a launch screen in the manifest file

##Notable Bugs Fixed

* Failed to get correct result of "background-position" when running tct-backgrounds-css3-tests on Android OS [XWALK-470]
* setWebContentsDebuggingEnabled API missing in XWalk [XWALK-753]
* packaging tool does not work with minimal manifest [XWALK-909]
* make_apk.py --enable-remote-debugging not working [XWALK-933]
* Crosswalk doesn't honor Chrome GPU blacklist [XWALK-934]
* window.close doesn't work on Android OS [XWALK-939]
* Unable to get the "messaging" permission on Android OS [XWALK-940]
* Volume is too low when playing audio via WebAudio API [XWALK-980]
* XWalkView shouldInterceptRequest never called [XWALK-996]
* Remote debugging not enabled for debug build of Crosswalk Cordova application [XWALK-1039]
* Capture API test in cordova_mob_spec crashes after recording the audio [XWALK-1116]

##Known issues

* Music does not seamlessly loop [XWALK-1125] 
* Setting gain to 0 does not mute [XWALK-1126] 
* Web app cannot detect the right motion when device orientation change [XWALK-1264]
* Full screen immersive mode doesn't work by swiping up from bottom [XWALK-1200]
* Fail to get correct value of CSS3 multicolumn column-rule-width [XWALK-1093]
* W3C Notification onclick event callback is not working on Cordova packaged app [XWALK-1080]
* Can't save content to a file by using W3C file API [XWALK-1079]