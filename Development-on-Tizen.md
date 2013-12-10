# Set up your Tizen environment
## Setting up Gerrit Access
* When using GBS, it will download many resources from a server, so you need to set up Gerrit access for doing so.
* Follow [Setting up Development Environment](https://source.tizen.org/documentation/developer-guide/environment-setup)
* If you are an Intel Blue Badge employee, follow the following: [Using GIT at intel](https://opensource.intel.com/linux-wiki/Using_git)

## Install development tools
* On host, you must have gbs and mic installed.
 * There are some steps until you can install on Ubuntu by `sudo apt-get install gbs mic`
* Until `sudo apt-get install gbs mic`, follow [Installing development tools](https://source.tizen.org/documentation/developer-guide/installing-development-tools)

## Setting up GBS environment
* What is GBS?
 * GBS can create (called 'bake') xwalk rpm.
 * When it runs, GBS creates a chroot environment to build the i586 target
 * GBS automatically downloads all dependencies from the Tizen server
* Create your own .gbs.conf
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
url = http://download.tizen.org/releases/2.1/latest/
```

* If you are curious what happen, refer to [Creating a Tizen Platform Image from Scratch through Local Build](https://source.tizen.org/documentation/developer-guide/creating-tizen-platform-image-scratch-through-local-build)

# Building Crosswalk
## Preface
* We will work in both HOST and CHROOT.
* I distinguish each as follows:
 * In HOST `> command`
 * In CHROOT `$ command`

## Baking the RPM
* Refer to "Building an RPM package for Tizen" in [[Build-Crosswalk]]
* If you bake the RPM once, a chroot environment is created. You can now build xwalk inside chroot. Refer to next section.
* If you change your spec file, you need to rebake the RPM to recreate the chroot environment.

## Build XWalk inside chroot.
* You need to bake the RPM at least once, as GBS creates the chroot environment.
 * If you want to bypass that (as it takes a lot of time), check out the trick in the Tips section. [[Development-on-Tizen#tips]]
* If you bake rpm once and you don't change the spec file, just build inside chroot. Do not waste time to bake the RPM yet again.

### Build
* mount your source to chroot
```
# make directory of mounting point
> cd ~/GBS-ROOT/local/BUILD-ROOTS/scratch.i586.0/home/abuild/
> mkdir workspace
> cd -
# Mount your source directory.
> sudo mount --bind <source_path> ~/GBS-ROOT/local/BUILD-ROOTS/scratch.i586.0/home/abuild/workspace
# where <source _path> is ~/repo/xwalk if xwalk is in ~repo/xwalk/src/xwalk
```
* Manually patching patches
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
> patch -p1 < <xwalk dir>/package/%{name}-1.29-do-not-look-for-gtk2-when-using-aura.patch
# Apply all patches (some patches might need -p2, not -p1)
```
* Enter chroot environment
```
> sudo gbs chroot ~/GBS-ROOT/local/BUILD-ROOTS/scratch.i586.0
$ cd ~/workspace   # this is your mounting point
```
* Prepare GYP build
 * The spec file (packaging/crosswalk.spec) includes the build command with associated flags.
```
The line starts like this:
export GYP_GENERATORS='make'
./src/xwalk/gyp_xwalk src/xwalk/xwalk.gyp \
...

```
 * You can call this directly in chroot. Note you need to append -Dtarget_arch=ia32 for it to work.
 * THE BELOW MIGHT BE STALE: AVOID COPYING. Please verify that the below fits with crosswalk.spec
```
$ export GYP_GENERATORS='make'
$ ./src/xwalk/gyp_xwalk src/xwalk/xwalk.gyp \
--no-parallel \
-Ddisable_nacl=1 \
-Dpython_ver=2.7 \
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
-Duse_xi2_mt=0 \ 
-Dtizen_mobile=1 
-Dtarget_arch=ia32
```
* Start the actual build
```
$ make -j9 -C src BUILDTYPE=Release xwalk
```

### Deploy
* Copy binary onto device
```
> sdb root on
> sdb push out/Release/xwalk /usr/lib/xwalk/xwalk
```
* You can run xwalk on device using `sdb shell`. Refer to following section.

## Run
* Refer to [Installing Crosswalk](#documentation/getting_started/installing_crosswalk/tizen)

## Debug
* Refer to [[Remote-debugging-xwalk-on-Tizen-2.1]]

# Tips and Tricks
## install dependent packages without running gbs fully.
* You can update your chroot using dummy project that has the same spec file.
```
> mkdir gbsdummy
> cd gbsdummy
> cp -r [xwalk dir]/packaging ./
> git init
> git add *
> git commit -a -m init
> gbs build -A i586
```
* above command will fail but your chroot is updated. \o/
