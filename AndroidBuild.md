Simplified build instructions for Android on Fedora Linux 19 (64bit). Work in progress.

## Environment setup

* Install required packages using `yum`. The dependencies are
> git svn g++ gcc-c++ nss-devel cups-devel gtk2-devel pulseaudio-libs-devel dbus-devel gconf-devel gconf GConf2-devel libgnome-keyring-devel libgcrypt-devel libpciaccess-devel pciutils-devel libgudev1-devel systemd-devel gperf bison libcap-devel expat-devel alsa-lib-devel libXtst-devel lighttpd python-pexpect xorg-x11-server-Xvfb xorg-x11-utils zlib.i686 libstdc++.i686 glibc-devel.i686 ant

* Install the Oracle Java JDK from http://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase6-419409.html

* Install depot tools from http://www.chromium.org/developers/how-tos/install-depot-tools , this will make the `gclient` command available.

* Create `~/.gyp/include.gypi`, to set custom variables for the build.

```
{
  'variables': {
    'remove_webcore_debug_symbols': 1, # faster build
#    'component': 'shared_library',    # faster build, but causes linker problems
    'werror': '',                      # unset or build fails -- TODO 
  }
}
```

* Elliot, please skip this step and see if anything breaks `export XWALK_OS_ANDROID=1`. If it does break, we should patch probably patch envsetup.sh (see below) to do that.

## Get the code

* Create a source directory and enter it
```
mkdir -p ~/git/crosswalk
cd ~/git/crosswalk
```

* Initialise the repository `gclient config --name=src/xwalk git://github.com/crosswalk-project/crosswalk.git`

* Check out the code using `gclient sync`. This will take some time.

## Build

* Enter source directory `cd src`.

* Run `. xwalk/build/android/envsetup.sh --target-arch=x86`. (Or pass "arm", untested)

* Generate the project
```
export GYP_GENERATORS='ninja'
xwalk_android_gyp
./xwalk/gyp_xwalk
```

* To build xwalk core and runtime shell(for developer testing purpose, not used by public), execute:
```
ninja -C out/Release xwalk_core_shell_apk xwalk_runtime_shell_apk
```

## Run

* Run the SDK manager using `android` (from `src/third_party/android_tools/sdk/tools/`). Install  the Intel x86 Atom System Image, and create an AVD using that. Make sure you allocate enough internal storage and SD card storage, 1000MiB respectively has been found to work.

* Start the AVD from the SDK Manager or command line.

* Install the packages and launch
```
adb install -r out/Release/apks/XWalkRuntimeClientShell.apk
adb shell am start -n org.xwalk.runtime.shell/org.xwalk.runtime.shell.XWalkRuntimeShellActivity
```