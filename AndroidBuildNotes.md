Notes taken from building on Fedora 19. This complements the original build instructions. Assumption is that the host is a 64bit system, ymmv on 32bit.

## Sync and GYP stage

Required packages are
> git svn g++ gcc-c++ nss-devel cups-devel gtk2-devel pulseaudio-libs-devel dbus-devel gconf-devel gconf GConf2-devel libgnome-keyring-devel libgcrypt-devel libpciaccess-devel pciutils-devel libgudev1-devel systemd-devel

## Launcher build stage

Required packages are
> gperf bison libcap-devel expat-devel alsa-lib-devel libXtst-devel

## Ubuntu deps counterparts

The `install-build-deps-android.sh` mostly tries to fix up the Java installation and loads a few packages. Since the script assumes Ubuntu, it will not run on Fedora, but all that's needed is to add a few package with yum, since the Java setup is good already from following the Chromium build environment setup.

Required packages are
> lighttpd python-pexpect xorg-x11-server-Xvfb xorg-x11-utils zlib.i686 libstdc++.i686 glibc-devel.i686 ant

## Before building

Create `~/.gyp/include.gypi`, to set custom variables for the build.

```
{
  'variables': {
    'remove_webcore_debug_symbols': 1, # faster build
#    'component': 'shared_library',    # faster build, but causes linker problems
    'werror': '',                      # unset or build fails -- TODO 
  }
}
```

## Before running the test shell -- environtment setup

See "Android target setup" in the wiki

adb install -r out/Release/apks/XWalkRuntimeClientShell.apk 
this fails, means XWalkRuntimeShell?

## Running

The commands on the original website are outdated as components have been renamed. Use this:
```
adb install -r out/Release/apks/XWalkRuntimeLib.apk 
adb install -r out/Release/apks/XWalkRuntimeShell.apk
adb shell am start -n org.xwalk.runtime.shell/org.xwalk.runtime.shell.XWalkRuntimeShellActivity
```

## Notes

Gclient sync with diagnostics: `gclient sync -v -D -j 1 --gclientfile=.gclient-xwalk`

When installing to the emulator fails with `Failure [INSTALL_FAILED_CONTAINER_ERROR]`, increase emulator image storage size.

available after having run `envsetup.sh`

`android` .. android sdk package manager
