## Build XWalk Android Core with full debug support
```
. xwalk/build/android/envsetup.sh --target-arch=x86
xwalk_android_gyp -Dandroid_full_debug=1
ninja -C out/Debug xwalk_core_shell_apk
```
## Install App
```
adb install -r out/Debug/apks/XWalkCoreShell.apk
```

## Debug Native Code with "adb_gdb*"
* On Device, launch the App
* On Host machine, to debug the browser process, use:
```
adb_gdb_xwalk_core_shell --verbose
```
* [Deprecated] To debug the renderer process, use:
```
adb_gdb_xwalk_core_shell --verbose --sandboxed=[0-6]
```
* If you wan't to debug the startup process
```
#Edit a file named 'xwview-shell-command-line' with content:
Xwalk --wait-for-debugger
#Then push it to device
adb push xwview-shell-command-line /data/local/tmp/xwview-shell-command-line
#Then launch the application and use adb_gdb_xwalk_core_shell to debug
```

## Debug Java code with Eclipse
* Import the project into Eclipse workspace:
```
New -> Android -> Android Project from Existing Code -> point to XwalkCore project root(src/xwalk/runtime/android/core_shell)
```
* Add third party dependencies to project
```
add Java code of xwalk, base, content, ui... to project
```
* Launch application to debug, you can use command line to control debug the startup
```
#In xwview-shell-command-line, write content as follow and push it to device
XWalk --wait-for-java-debugger
```