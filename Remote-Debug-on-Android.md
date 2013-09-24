## Remote debugging for web applications on Android
Developers can use remote debugging to debug web applications from Chrome Browser on Linux host machines.
* Two ways to enable the remote debugging feature for a web application. You can either enable the remote debugging when packaging the web app into Android APK or send intents to the web app after it's launched.
 * Enable remote debugging by default when packaging a web app:
```
  python make_apk.py --package=com.abc.app --name=ABC --app-root=/home/abc/dist --app-local-path=src/index.html --enable-remote-debugging
```
 * Or, send intents to a web app to enable/disable remote debugging when it's running:
```
  adb shell am broadcast -a org.xwalk.intent -e remotedebugging true
  adb shell am broadcast -a org.xwalk.intent -e remotedebugging false
```
* Open Chrome browser(version >=29) in the host machine and input "chrome://inspect" in the address bar.
* The web page or web app will be shown in the inspection page. Click to inspect it.

## Remote debugging for XWalk Core Shell on Android
XWalkCoreShell is an internal test shell for Crosswalk developers. It enables remote debugging by default. 

### Use Chrome in Host to Remote Debugging
In host machine connected with device, launch Chrome desktop, open "http://127.0.0.1:9222", or open "chrome://inspect" (requires Chrome version>28)


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