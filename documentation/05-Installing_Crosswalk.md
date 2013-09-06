## Installing Crosswalk
### Android

You will need to install [adb](http://developer.android.com/tools/help/adb.html), and use it to connect your device to your development machine.

Once you've done that, follow these steps to install crosswalk. (In this example, we were installing onto an HTC One X.)

1.  Download the binary for Android from the URL in [Downloads](#documentation/downloads).

2. Install the Crosswalk binary on the device (here we're assuming the *crosswalk-1.29.3.0-android.zip* file is the *~/Downloads* directory on a Linux machine):
```sh
cd ~/Downloads
unzip crosswalk-android-1.29.3.0.zip
adb shell ‘pm set-install-location 2’
# NOTE: that command might fail; you can ignore it if it does
adb install crosswalk-android-1.29.3.0/apks/XWalkCoreShell.apk
...
Success
```
3.  Go to the application list and locate the `XWalkCoreShell` app. Run it.
4.  You should now see a white screen with a simple message at the top of the window.

### Tizen
These steps assume you have the Tizen SDK installed and correctly configured on your system. You can use the Tizen emulator as a target for running and developing Crosswalk applications on Tizen.

1. With the Tizen emulator started or a Tizen device connected to the computer, log into the device as root by default:
```sh
sdb root on
```
2. Push the crosswalk RPM to the device:
```sh
sdb push crosswalk-1.29.3.0.rpm /tmp
```
3. Push the crosswalk Tizen extensions RPM to the device:
```sh
sdb push crosswalk-tizen-extensions-1.29.3.0.rpm.rpm /tmp
```
4. Install the RPMs on the device:
```sh
sdb shell
# While in the shell on the Tizen device
rpm -i /tmp/crosswalk*rpm.rpm
```
5. From there, you can launch: `xwalk http://www.google.com`
6. You will be able to create an xwalk icon on the home screen (to launch xwalk) later. (It is a 'work in progress'.)