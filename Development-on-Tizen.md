# Set up your Tizen environment
[Installing development tools](https://source.tizen.org/documentation/developer-guide/installing-development-tools)
* You must have gbs and mic
`sudo apt-get install gbs mic`
* If you suffer Intel proxy, refer to [Using git at intel](https://opensource.intel.com/linux-wiki/Using_git)

[Creating a Tizen Platform Image from Scratch through Local Build](https://source.tizen.org/documentation/developer-guide/creating-tizen-platform-image-scratch-through-local-build)
* For example, my .gbs.conf
```
[general]
tmpdir = /media/dshwang/ExtHDD/tmp
profile = profile.mobile_public
buildroot = ~/GBS-ROOT/
work_dir=.

[profile.mobile_public]
repos = repo.mobile_public_2.1
buildconf=/media/dshwang/ExtHDD/tizen/build-config/build.conf

[repo.mobile_public_2.1]
url = http://download.tizen.org/releases/2.1/tizen-2.1_20130517.6/
```

# Build xwalk
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
> mkdir /home/dshwang/GBS-ROOT/local/BUILD-ROOTS/scratch.i586.0/home/abuild/workspace
# mount your source
> sudo mount --bind <your source path> /home/dshwang/GBS-ROOT/local/BUILD-ROOTS/scratch.i586.0/home/abuild/workspace/xwalk
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
> patch -p1 < %{name}-1.29-do-not-look-for-gtk2-when-using-aura.patch
...
```
* go inside chroot
```
> sudo gbs chroot /home/dshwang/GBS-ROOT/local/BUILD-ROOTS/scratch.i586.0
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
```
> sdb root on
> sdb push out/Release/xwalk /usr/lib/xwalk/xwalk
```

## Run
* Refer to [[05-Installing_Crosswalk]]

## Debug
* Refer to [[Remote-debugging-xwalk-on-Tizen-2.1]]