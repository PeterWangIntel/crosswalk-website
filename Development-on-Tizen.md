# Set up your Tizen environment
## Setting up Gerrit Access
* When using gbs, gbs download many resources from server. So you need to set up Gerrit Access.
* Follow [Setting up Development Environment](https://source.tizen.org/documentation/developer-guide/environment-setup)
* If you are Intel guy, follow Intel proxy setting: [Using git at intel](https://opensource.intel.com/linux-wiki/Using_git)

## Install development tools
* On host, you must have gbs and mic.
 * There are some steps until you can install on Ubuntu by `sudo apt-get install gbs mic`
* Until `sudo apt-get install gbs mic`, follow [Installing development tools](https://source.tizen.org/documentation/developer-guide/installing-development-tools)

## Set up gbs environment
* What is gbs?
 * gbs can bake xwalk rpm.
 * When gbs runs, gbs creates chroot environment to build i586 target
 * gbs automatically downloads all dependencies from tizen server
* Make .gbs.conf
`> vi ~/.gbs.conf`
 * For example, my .gbs.conf
```
[general]
profile = profile.mobile_public
buildroot = ~/GBS-ROOT/
work_dir=.

[profile.mobile_public]
repos = repo.mobile_public_2.1

[repo.mobile_public_2.1]
url = http://download.tizen.org/releases/2.1/tizen-2.1_20130517.6/
```

* If you are curious what happen, refer to [Creating a Tizen Platform Image from Scratch through Local Build](https://source.tizen.org/documentation/developer-guide/creating-tizen-platform-image-scratch-through-local-build)

# Build xwalk
## Preface
* We will work in both HOST and CHROOT.
* I distinguish each as follows:
 * In HOST `> command`
 * In CHROOT `$ command`

## Bake rpm
* Refer to "Building an RPM package for Tizen" in [[Build-Crosswalk]]
* If you bake rpm once, chroot environment is created. You can build xwalk inside chroot! Refer to next section.
* If you change your spec file, we need to bake rpm to renew chroot environment.

## Build XWalk inside chroot.
* You need to bake rpm once, because gbs creates chroot environment.
* If you bake rpm once and you don't change spec file, just build inside chroot. Don't waste time to bake rpm again.

### Build
* mount your source to chroot
```
# make directory of mounting point
> cd /home/<yourID>/GBS-ROOT/local/BUILD-ROOTS/scratch.i586.0/home/abuild/
> mkdir workspace
> cd -
# mount your source
> sudo mount --bind <your source path> /home/<yourID>/GBS-ROOT/local/BUILD-ROOTS/scratch.i586.0/home/abuild/workspace
# e.g. <your source path> is /home/<yourID>/chromium if your xwalk is in /home/<yourID>/chromium/src/xwalk
```
* manually patch patches
 * spec includes as follows
```
in crosswalk.spec
Patch1:         %{name}-1.29-do-not-look-for-gtk2-when-using-aura.patch
Patch2:         %{name}-1.29-look-for-pvr-libGLESv2.so.patch
Patch3:         %{name}-1.29-revert-nss-commits.patch
```
 * patch manually
```
> cd [your source]
> patch -p1 <xwalk dir>/package/%{name}-1.29-do-not-look-for-gtk2-when-using-aura.patch
# do all patches (some patch need -p2, not -p1)
```
* go inside chroot
```
> sudo gbs chroot /home/<yourID>/GBS-ROOT/local/BUILD-ROOTS/scratch.i586.0
$ cd ~/workspace   # this is your mounting point
```
* gyp
 * your spec file includes as follows
```
in crosswalk.spec
export GYP_GENERATORS='make'
./src/xwalk/gyp_xwalk src/xwalk/xwalk.gyp \
-Ddisable_nacl=1 \
-Duse_aura=1 \
-Duse_cups=0 \
-Duse_gconf=0 \
-Duse_kerberos=0 \
-Duse_system_bzip2=1 \
-Duse_system_icu=1 \
-Duse_system_libexif=1 \
-Duse_system_libxml=1 \
-Duse_system_nspr=1 \
-Denable_xi21_mt=1 \
-Dtizen_mobile=1
```
 * you can do it in chroot. Note you need -Dtarget-arch=ia32 in addition.
```
$ export GYP_GENERATORS='make'
$ ./src/xwalk/gyp_xwalk src/xwalk/xwalk.gyp \
-Ddisable_nacl=1 \
-Duse_aura=1 \
-Duse_cups=0 \
-Duse_gconf=0 \
-Duse_kerberos=0 \
-Duse_system_bzip2=1 \
-Duse_system_icu=1 \
-Duse_system_libexif=1 \
-Duse_system_libxml=1 \
-Duse_system_nspr=1 \
-Denable_xi21_mt=1 \
-Dtizen_mobile=1 \
-Dtarget-arch=ia32
```
* Build it!
```
$ make -j6 -C src BUILDTYPE=Release xwalk
```

### Deploy
* Copy binary into device
```
> sdb root on
> sdb push out/Release/xwalk /usr/lib/xwalk/xwalk
```
* You can run xwalk on device using `sdb shell`. Refer to following section.

## Run
* Refer to "Tizen" in [[05-Installing_Crosswalk]]

## Debug
* Refer to [[Remote-debugging-xwalk-on-Tizen-2.1]]