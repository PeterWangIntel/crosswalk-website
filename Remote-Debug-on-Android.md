## Remote debugging for web applications on Android
Developers can use remote debugging to debug web applications from Chrome Browser on Linux host machines.
 * Two ways to enable the remote debugging feature for a web application. You can either enable the remote debugging by default when packaging the web app or send Android intents to the web app if it's running.
  * Option 1: Enable remote debugging by default when packaging a web app, for example,
```
  host$ python make_apk.py --package=com.abc.app --name=ABC --app-root=/home/abc/dist --app-local-path=src/index.html --enable-remote-debugging
```
  Launch the packaged web app APK and remote debugging is enabled by default.
  * Option 2: If a web app APK is not packaged with remote debugging, you can launch it and send an intent to enable/disable remote debugging when it's running. Note that below intent will enable remote debugging feature for all running web apps with Crosswalk.
```
  host$ adb shell am broadcast -a org.xwalk.intent -e remotedebugging true  
```
  * To disable remote debugging if a web app is running,
```
  host$ adb shell am broadcast -a org.xwalk.intent -e remotedebugging false
```
 * Inspect web pages or web apps in Chrome Browser
  * Open Chrome Browser(version >=29) in the host machine and input "chrome://inspect" in the address bar.
  * Web pages or web apps will be shown in the inspection page. Click to the button 'inspect' to inspect it.

## Remote debugging for XWalk Core Shell on Android
XWalkCoreShell is an internal test shell for Crosswalk developers. It enables remote debugging by default. 
Follow the steps 'Inspect web pages or web apps in Chrome Browser.

## Trouble shooting
If you can't see the web page or web app shown in Chrome Browser in the host machine, Please check with below steps:
```
host$ adb shell 
shell@android$ cat /proc/net/unix |grep devtools_remote
00000000: 00000002 00000000 00010000 0001 01 1102698 @org.xwalk.webrtc_devtools_remote
00000000: 00000002 00000000 00010000 0001 01 1092981 @org.xwalk.core.xwview.shell_devtools_remote
```
If you don't see the string combined with the package name and '_devtools_remote', then you probably have to enable remote debugging for the web app.

## Reference
* http://powerbuilder.sh.intel.com/projects/wrtonandroid/wiki/cameo/remote-debugging-enabling
* https://developers.google.com/chrome-developer-tools/docs/remote-debugging