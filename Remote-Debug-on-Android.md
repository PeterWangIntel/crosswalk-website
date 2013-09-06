## Remote Debug of XWalk Core Shell on Android
XWalkCoreShell enables remote debug by default. 
### Forward Debug Port
The unix domain socket port in Android device is "org.xwalk.core.xwview.shell_devtools_remote", the port needs to be forwarded to host machine (eg, 9222):
```
adb forward tcp:9222 localabstract:org.xwalk.core.xwview.shell_devtools_remote
```
If you have to check whether the domain socket port is opened, run "adb shell" and then run command in device
```
#cat /proc/net/unix
e89ba100: 00000002 00000000 00010000 0001 01 29471 @org.xwalk.core.xwview.shell_devtools_remote
...
```

### Use Chrome in Host to Remote Debug
In host machine connected with device, launch Chrome desktop, open "http://127.0.0.1:9222", or open "chrome://inspect" (requires Chrome version>28)

## Remote Debug of Self Packaged App on Android
TBD

## Reference
* http://powerbuilder.sh.intel.com/projects/wrtonandroid/wiki/cameo/remote-debugging-enabling
* https://developers.google.com/chrome-developer-tools/docs/remote-debugging
