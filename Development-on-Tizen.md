# Setting up your Tizen environment
## Setting up access to Tizen Gerrit
* When using GBS, it will download many resources from a server, so you need to set up Gerrit access for doing so.
* Follow [Setting up Development Environment](https://source.tizen.org/documentation/developer-guide/environment-setup)
* If you are an Intel Blue Badge employee, follow the following: [Using GIT at Intel](https://opensource.intel.com/linux-wiki/Using_git)

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
 * If you want to bypass that (as it takes a lot of time), check out the trick in the Tips section. [[Development-on-Tizen#tips-and-tricks]]
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
# where <source_path> is ~/repo/xwalk if xwalk is in ~/repo/xwalk/src/xwalk
```
* Manually patching patches
 * The spec file includes patches like
```
Patch1:         %{name}-1.29-do-not-look-for-gtk2-when-using-aura.patch
Patch2:         %{name}-1.29-look-for-pvr-libGLESv2.so.patch
Patch3:         %{name}-1.29-revert-nss-commits.patch
...
```
 * Apply the patches manually
```
> cd <source_path>
# List patches
> cat packaging/crosswalk.spec | grep "Patch.*:" \
  | perl -pe 's/Patch.*:\s*/patch -p0 < src\/xwalk\/packaging\/$1/' \
  | perl -pe 's/%{name}/crosswalk/'
> cd ../..
# Call each line manually (some patches might need -p0 changed to -p1 or similar)
> patch -p0 < src/xwalk/packaging/crosswalk-do-not-look-for-gtk2-when-using-aura.patch
```
* Enter chroot environment
```
> sudo gbs chroot ~/GBS-ROOT/local/BUILD-ROOTS/scratch.i586.0
$ cd ~/workspace   # this is your mounting point
```
* Prepare GYP build
 * If you want to use ninja, see [[Development-on-Tizen#tips-and-tricks]]
 * The spec file (packaging/crosswalk.spec) includes the build command with associated flags.
```
The line starts like this:
export GYP_GENERATORS='make'
./src/xwalk/gyp_xwalk src/xwalk/xwalk.gyp \
...

```
 * You can call this directly in chroot. Note you need to append -Dtarget_arch=ia32 for it to work. Remove --no-parallel to make sub-processes to speed up.
 * THE BELOW MIGHT BE STALE (Updated Dec 11th, 2013): AVOID COPYING. Please verify that the below fits with crosswalk.spec
```
$ export GYP_GENERATORS='make'
$ ./src/xwalk/gyp_xwalk src/xwalk/xwalk.gyp \
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
-Dtizen_mobile=1 \
-Duse_openssl=1 \
-Dtarget_arch=ia32
```
* Start the actual build
```
$ make -j9 -C src BUILDTYPE=Release xwalk
```

### Deploying
* Copy binary onto device
```
> sdb root on
# If you didn't touch resource bundles (like modified a .js file) you can just copy
# the xwalk binary for successive changes.
> sdb push out/Release/xwalk/* /usr/lib/xwalk/
```
* You can run xwalk on the device using `sdb shell`. Refer to the following section.

## Run
* Refer to [Installing Crosswalk](#documentation/getting_started/installing_crosswalk/tizen)

## Debugging
* For debugging on the device, we must turn off the smack label.
```
# Turn on root support and launch the shell on the device
sdb root on
sdb shell
# Turn the smack label off. As 'chsmack /usr/lib/xwalk/xwalk' says '_', we use that.
echo "_" /proc/self/attr/current
# Change to app instead of developer (as that is required for pipes to work) and set HOME correctly.
su - app
export HOME=/home/app
# Start debugging with gdb
gdb --args /usr/lib/xwalk/xwalk http://www.google.com
```
* Remote debugging is possible, please refer to [[Remote-debugging-xwalk-on-Tizen-2.1]]

# Tips and Tricks
## Install dependency packages without fully running GBS.
* You can update your chroot using a dummy project that has the same spec file.
```
> mkdir gbsdummy
> cd gbsdummy
> cp -r <source_path>/packaging ./
> git init
> git add *
> git commit -a -m init
> gbs build -A i586
```
* The above command *will* fail, but your chroot is updated. \o/

## Compile using 'ninja', instead of 'make'
* There are two big benefits
 * super fast (>1.5 times)
 * You can assign the output directory.
* Prepare GYP build
 * Make sure you can access 'depot_tools' in chroot.
  * copy 'depot_tools' in your ```<source_path>```.
```
 > cp -r <depot_tools_path> <source_path>
```
 * Set env
```
$ cd ~/workspace/src
$ export PATH=$PATH:/home/abuild/workspace/depot_tools
$ export GYP_GENERATORS='ninja'
```
 * THE BELOW MIGHT BE STALE (Updated Jan 15th, 2014): AVOID COPYING. Please verify that the below fits with crosswalk.spec
 * NOTE: execute `gyp_xwalk` in `src` directory.
```
$ xwalk/gyp_xwalk xwalk/xwalk.gyp \
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
-Dtizen_mobile=1 \
-Duse_openssl=1 \
-Dtarget_arch=ia32
```
* Start the actual build
```
$ ninja -C out/Release -j9 xwalk
```
* How to change the output directory
 * define GYP_GENERATOR_FLAGS before executing 'gyp_xwalk'. for example,
```
$ export PATH=$PATH:/home/abuild/workspace/xwalk/depot_tools
$ export GYP_GENERATORS='ninja'
$ export GYP_GENERATOR_FLAGS="output_dir=out_i586"
$ xwalk/gyp_xwalk xwalk/xwalk.gyp \
... # definition list
-Dtarget_arch=ia32
$ ninja -C out_i586/Release -j9 xwalk
```
