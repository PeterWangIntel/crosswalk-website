## Installing Crosswalk

### Android

You will need to install the Android SDK, including [adb](http://developer.android.com/tools/help/adb.html), and use it to connect your device to your development machine or use the Android emulator.

1. Download the Crosswalk binary for Android from the URL in [Downloads](#documentation/downloads/files).
1. Decompress the Crosswalk binary to access the various Android packages that can be installed:
```sh
unzip crosswalk-android-1.29.3.0.zip
```
1. Install the XWalkCoreShell package:
```sh
adb install crosswalk-android-1.29.3.0/apks/XWalkCoreShell.apk
```
On successful completion, you should see the final string *Success* displayed.
1. On the device/emulator, go to the application list, locate the **XWalkCoreShell** app, and start it.
1. You should now see a white screen with a simple message at the top of the window.

### Tizen
These steps assume you have the [Tizen SDK](https://developer.tizen.org/downloads/tizen-sdk) installed and correctly configured on your system. 

You can use the Tizen emulator as a target for running and developing Crosswalk applications on Tizen.

1.  Download the Crosswalk binary for Tizen from the URL in [Downloads](#documentation/downloads/files).
1. With the Tizen emulator started or a Tizen device connected to the computer, log into the device as root by default:
```sh
sdb root on
```
1. Push the crosswalk RPM to the device:
```sh
sdb push crosswalk-1.29.3.0.rpm /tmp
```
1. Push the crosswalk Tizen extensions RPM to the device:
```sh
sdb push crosswalk-tizen-extensions-1.29.3.0.rpm.rpm /tmp
```
1. Install the RPMs on the device:
```sh
sdb shell
# While in the shell on the Tizen device
rpm -i /tmp/crosswalk*rpm.rpm
```
1. While still in the shell, you can launch xwalk: 
```sh
xwalk http://www.google.com
```
1. *Work in Progress* Installing Crosswalk will install an icon on the Tizen home screen.