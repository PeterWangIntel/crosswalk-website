*This is an archive page of deprecated "Getting started" documentation, covering Crosswalk 1, 2 and 3. The current "Getting started" docs are on [the Crosswalk website](http://crosswalk-project.org/#documentation/getting_started).*

# Getting Started
This site is designed to help you get up and running with Crosswalk as quickly as possible.

## Step 1 - Download Crosswalk
The Crosswalk project currently provides binaries for Android and Tizen. Go to the [Downloads](http://crosswalk-project.org/#documentation/downloads) page, pick your operating system, and download.

## Step 2 - Install Crosswalk on your device
You can run Crosswalk either directly on a device supporting your selected operating system, or in one of the emulators provided by those operating system SDKs.

You can find steps for installing Crosswalk onto the device or into the emulator in [Installing Crosswalk](#installing-crosswalk).

## Step 3 - Package your application
Crosswalk applications are made up of your HTML5 files and a manifest
file. When deploying your application, you would package those files
into a single archive. During development you can skip that step. The
steps for packaging your application are found on the [Building an application](#building-a-crosswalk-application)
page.

## Step 4 - Running your application
The steps for pushing your application to the target device and
launching Crosswalk with your application are covered in
[Running an Application](#running-a-crosswalk-application).

# Installing Crosswalk

## Android

You will need to install the Android SDK, including [adb](http://developer.android.com/tools/help/adb.html), and use it to connect your device to your development machine or use the Android emulator.

1. Install the [Android SDK](http://developer.android.com/sdk/index.html).
1. Download the Crosswalk binary for Android from the URL in [Downloads](http://crosswalk-project.org/#documentation/downloads).
<pre>
wget https://download.01.org/crosswalk/releases/android-x86/stable/crosswalk-${XWALK-STABLE-ANDROID-X86}-x86.zip
</pre>
1. Decompress the Crosswalk binary to access the various Android packages that can be installed:
<pre>
unzip crosswalk-${XWALK-STABLE-ANDROID-X86}-x86.zip
</pre>
1. Install the XWalkRuntimeLib package (This step is only necessary for the shared mode. See [what are the shared and embedded modes](#wiki/Crosswalk-on-Android/packaging-modes):
<pre>
adb install crosswalk-${XWALK-STABLE-ANDROID-X86}/apks/XWalkRuntimeLib.apk
</pre>
On successful completion, you should see the final string *Success* displayed.

NOTE: If you have previously installed the XWalkRuntimeLib:
<pre>
adb shell
pm uninstall org.xwalk.runtime.lib
</pre>

You are now ready to install Crosswalk applications on your Android
system. If you go to your system Settings, you should see
**XWalkRuntimeLib** listed under the **Apps/Downloaded** list.

## Tizen
These steps assume you have the [Tizen SDK](https://developer.tizen.org/downloads/tizen-sdk) installed and correctly configured on your system.

You can use the Tizen emulator as a target for running and developing Crosswalk applications on Tizen.

1. Install the [Tizen SDK](http://developer.tizen.org/downloads/tizen-sdk).
1. Download the Crosswalk binary for Tizen from the URL in [Downloads](http://crosswalk-project.org/#documentation/downloads).
<pre>
wget https://download.01.org/crosswalk/releases/tizen-mobile/stable/crosswalk-${XWALK-STABLE-TIZEN-X86}-0.i586.rpm
wget https://download.01.org/crosswalk/releases/tizen-mobile/stable/crosswalk-emulator-support-${XWALK-STABLE-TIZEN-X86}-0.i586.rpm
wget https://download.01.org/crosswalk/releases/tizen-mobile/canary/tizen-extensions-crosswalk-0.26-0.i586.rpm
</pre>
1. With the Tizen emulator started or a Tizen device connected to the computer, log into the device as root by default:
<pre>
sdb root on
</pre>
1. Push the RPMs to the device:
<pre>
sdb push crosswalk-${XWALK-STABLE-TIZEN-X86}.rpm /tmp
sdb push tizen-extensions-crosswalk-0.26-0.i586.rpm /tmp
</pre>
1. Install the RPMs on the device:
<pre>
sdb shell
# While in the shell on the Tizen device
rpm -i /tmp/crosswalk-${XWALK-STABLE-TIZEN-X86}-0.i586.rpm
rpm -i /tmp/tizen-extensions-crosswalk-0.26-0.i586.rpm
</pre>
1. If installing Crosswalk on the Tizen Emulator, you need to install an additional package:
<pre>
sdb push crosswalk-emulator-support-${XWALK-STABLE-TIZEN-X86}.rpm /tmp
sdb shell
rpm -i /tmp/crosswalk-emulator-support-${XWALK-STABLE-TIZEN-X86}-0.i586.rpm
</pre>
Please note that installing this package on an actual device can cause performance problems.
1. While still in the shell, you can launch xwalk:
<pre>
xwalk http://www.google.com
</pre>
1. *Work in Progress* Installing Crosswalk will install an icon on the Tizen home screen.

# Building a Crosswalk Application
An application package is a compressed archive containing all of your application resources and a manifest file.

There are several sample applications which can be used as a seed for your project. These are listed on the [Samples](http://crosswalk-project.org/#documentation/samples) page. The steps described below can be used to package those applications and deploy them into an Android or Tizen device.

### Manifest File

The following is a minimal example for a manifest file, which should be named manifest.json and reside in your application's top level directory:

```
{
  "name": "Sample App",
  "version": "1.3.5.2",
  "app": {
    "launch":{
      "local_path": "index.html"
    }
  },

  "icons": {
    "128": "icon.png"
  }
}
```

Note that the icons field is currently **required** if you intend to package your application for Android using the make_apk.py script. If you are only deploying to Tizen, it is optional.

At a minimum, the `icons` property should reference a 128 pixel square graphic to use as the icon for the application.

For more details on the manifest file, see the [Crosswalk Manifest](#wiki/Crosswalk-manifest) page.

## The Application Structure
A typical application structure contains the manifest.json file in the root directory. The main entry point to the application is then referenced from that manifest file. In most applications this file is in the root directory as well.
```
/home/foobar/dist/manifest.json
/home/foobar/dist/index.html
/home/foobar/dist/application.js
/home/foobar/dist/assets/images.jpg
```
## Packaging for Android
The Android APK maker is included with the crosswalk-android binaries available in [Downloads](http://crosswalk-project.org/#documentation/downloads).

To package your own web application, unpack the Crosswalk app template tarball that was provided as part of the crosswalk-android ZIP archive.
```sh
tar xzvf xwalk_app_template.tar.gz
cd xwalk_app_template
```
The xwalk_app_template contains utilities and dependencies for packaging an application into an APK file, so it can be installed on an Android device.
Since Crosswalk-3, it introduces a new packaging mode - embedded mode. Such that a version of Crosswalk can be bundled with each web application without depending on XWalkRuntimeLib.

**Note**: For this script to work, you should ensure that the android command from the Android SDK is on your path. It is located in <Android SDK location>/tools/android.

The xwalk_app_template supports three kinds of web application source:

* **[Crosswalk Manifest](#wiki/Crosswalk-manifest)**.
* **[XPK package](#wiki/Crosswalk-package-management)**.
* **Command line options**. For example, '--app-url' for website, '--app-root' and '--app-local-path' for local web application.

**Note**: The manifest source and XPK source are preferred.

### Packaging from manifest source

This feature is supported for Crosswalk-2 and later.
Below is an example of how to package a web app. We assume that the files for the app are in /home/foobar/dist and the manifest file is /home/foobar/dist/manifest.json:

For Crosswalk-3 and later:

Both shared and embedded modes are supported.
```sh
python make_apk.py --manifest=/home/foobar/dist/manifest.json
  --mode=[embedded | shared]
```
For embedded mode, the APK 'FooBar_[arm | x86].apk' is written to the directory where you run the command. The APKs are architecture dependent, meaning that an APK with an *arm.apk suffix works on ARM devices, and an APK with an *x86.apk suffix works on x86 devices.
For shared mode, the APK 'FooBar.apk' is generated. This APK will work on both ARM and x86 devices (providing the shared runtime library is also installed).

For Crosswalk-2:

Only shared mode is supported.
```sh
python make_apk.py --manifest=/home/foobar/dist/manifest.json
```
The architecture-independent APK 'FooBar.apk' is generated.

### Packaging from XPK source
This feature is supported for Crosswalk-3 and later.
Below is an example of how to package a web app. We assume that the files for the app are archived in FooBar.xpk, which is located at /home/foobar/FooBar.xpk:
```sh
python make_apk.py --xpk=/home/foobar/FooBar.xpk \
  --mode=[embedded | shared]
```
For embedded mode, the APK 'FooBar_[arm | x86].apk' is generated. For shared mode, the APK 'FooBar.apk' is generated.

### Packaging from command line options
For Crosswalk-3 and later:

Below you will find an example of how to package a local web app. We assume that the files for the app are in /home/foobar/dist and the main entry point HTML file is /home/foobar/dist/index.html:
```sh
python make_apk.py --package=com.foo.bar --name=FooBar \
  --app-root=/home/foobar/dist --app-local-path=index.html \
    --mode=[embedded | shared]
```
The apk file is output to the same directory as the make_apk.py script, with a filename <name&gt.apk, where <name> is the name you set with the --name flag.
For embedded mode, the APK 'FooBar_[arm | x86].apk' is generated. For shared mode, the APK 'FooBar.apk' is generated.

For Crosswalk-1 and Crosswalk-2:

Only shared mode is supported. Below is an example of how to package a local web app. We assume that the files for the app are in /home/foobar/dist and the main entry point HTML file is /home/foobar/dist/index.html:
```sh
python make_apk.py --package=com.foo.bar --name=FooBar \
  --app-root=/home/foobar/dist --app-local-path=index.html
```
The architecture-independent APK 'FooBar.apk' is generated.

For information on installing and running the application on Android,
see [Running on Android](#running-on-android).

## Packaging for Tizen

To run Crosswalk packages on Tizen, web applications should be packaged using the XPK
package format. To package your own web application, you should save the
[xpk_generator](#wiki/crosswalk-package-management/xpk-package-generator-bash-shell-version)
script to a local file, then call it like this:
```sh
xpk_generator /home/foobar/dist myapp.pem
```
Then, an XPK package named ```dist.xpk``` should be created under the ```/home/foobar```
directory.

Note that the 'myapp.pem' (or whatever file name you chose) file is the XPK
package identity. It's generated the first time you created the web app XPK
package, and should use the same 'myapp.pem' file when packaging this web
app, otherwise the XPK package is treated as a new app.

To run your application in the Tizen environment, you can either launch xwalk manually,
directing it to load your application via the command line; or launch an
installed XPK package from the Tizen Home Screen. See the steps in
[Running on
Tizen](#documentation/getting_started/running_an_application/running-on-tizen).
# Running a Crosswalk Application

## Running on Android
Follow the steps for [Packaging on
Android](#documentation/getting_started/building_an_application/packaging-for-android).
Once you have your APK, install it to your target device:
```sh
adb install -r [FooBar.apk | FooBar_arm.apk | FooBar_x86.apk]
```
The application will now appear in your application list and can be
launched by clicking on its icon.

## Running on Tizen
### Launching unpacked Crosswalk applications on Tizen from command line

To access the files, xwalk needs to be launched as root
```sh
sdb root on
```

Set up port forwarding from the host port 9222 to the emulator port 9222
```sh
sdb forward tcp:9222 tcp:9222
```

Sync your application contents to the device
```sh
sdb push samples/hello_world /home/developer/hello_world
```

Launch Crosswalk. NOTE: This command passes the following parameters:
```
  --use-gl=osmesa                Enable WebGL via Mesa (if running in
                                 the emulator)
  --remote-debugging-port=9222   Listen on port 9222 for web debugging
```

The last parameter is the full path to the HTML file to load.
Eventually you will only need to point it to the base directory and
Crosswalk will load the manifest.json file it finds there.
```sh
sdb shell "xwalk --remote-debugging-port=9222 --use-gl=osmesa /home/developer/hello_world"
```

On the host, you can point your browser to http://localhost:9222/ and debug your application. As you debug and develop your application, you only need to run the '''sdb push''' command:

```sh
sdb push samples/hello_world /home/developer/hello_world
```

and then refresh the debugger in your browser via CTRL-R.

**TIP** &mdash; If you are running Tizen via the emulator, you can enable [File Sharing](https://developer.tizen.org/help/index.jsp?topic=%2Forg.tizen.gettingstarted%2Fhtml%2Fdev_env%2Femulator_file_sharing.htm) which can allow you to access your application files directly in Tizen environment. This removes the ```sdb push``` step.

### Launching an XPK package on Tizen
Follow the steps for [Packaging on Tizen](#packaging-for-tizen). Once
you have the XPK package, you can install and launch it on a Tizen device by
following the steps below.

* The XPK should be installed as root:
```sh
sdb root on
```

* Sync your XPK package to the device:
```sh
sdb push FooBar.xpk /tmp/
```

* Install the package:
```sh
sdb shell "xwalk --install /tmp/FooBar.xpk"
```

The new application icon should now be visible on the device's home screen.

You can refer to [XPK package management](#wiki/Crosswalk-package-management/xpk-package-management) for more details about how to manage an XPK package in Crosswalk.