Prerequisites:
* Tizen 2.1 chroot environment with crosswalk sources.
* gdb is installed under chroot and gdbserver installed to device.
* root mode is enabled with sdb (`sdb root on`)

1. Build debug version of xwalk under chroot environment.
* See [[Development-on-Tizen]]
* You need to add -Dcomponent=shared_library, because unfortunately ld inside chroot can not handle more than 2GB binary.
```
./src/xwalk/gyp_xwalk src/xwalk/xwalk.gyp \
...
-Dcomponent=shared_library
make -C src BUILDTYPE=Debug xwalk
```

2. Make a copy of libraries with debug symbols and strip debug info
```
cp -r src/out/Debug/lib.target src/out/Debug/lib.target_stripped
strip --strip-debug src/out/Debug/lib.target_stripped/*
```

3. Move binaries to device
```
sdb push src/out/Debug/lib.target_stripped/ /home/developer/xwalk/lib.target/
sdb push src/out/Debug/xwalk /home/developer/xwalk/
sdb push src/out/Debug/xwalk.pak /home/developer/xwalk/
sdb push src/out/Debug/libffmpegsumo.so /home/developer/xwalk/
```
4. Setup port forwarding with sdb (`sdb forward tcp:1234 tcp:5678`)

5. Start gdb server on device
```
sdb shell gdbserver host:5678 /home/developer/xwalk/xwalk http://www.google.com --no-sandbox --single-process
```
* Note: --single-process is used to debug gpu and render process also. It means we debug code a bit different from product code.

6. Start gdb from chroot and attach it to remote server
```
gdb src/out/Debug/xwalk
(gdb) target remote localhost:1234
```

7. If gdb cannot find symbols, you have to set solib-search-path.
```
(gdb) set solib-search-path /home/abuild/rpmbuild/BUILD/crosswalk-1.29.1.0/src/out/Debug/lib.target/.
```

Happy debugging.