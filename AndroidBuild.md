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

* `export XWALK_OS_ANDROID=1`

## Get the code

* Create a source directory and enter it
```
mkdir -p ~/git/crosswalk
cd ~/git/crosswalk
```

* Initialise the repository `gclient config --name=src/xwalk git://github.com/crosswalk-project/crosswalk.git`

* Check out the code using `gclient sync`. This will take some time.

## Build

* 

## Run