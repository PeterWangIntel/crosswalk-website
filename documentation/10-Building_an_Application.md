## Building a Crosswalk Application
An application package is a compressed archive containing all of your application resources and a manifest file.

There are several sample applications which can be used as a seed for your project. These are described in [Buliding an Application](#documentation/building_an_application). The steps described below can be used to package those applications and deploy them into an Android or Tizen device.

### Manifest File
The following is a minimal example for a manifest file, which should be named manifest.json and reside in your application's top level directory:
```
{
  "name": "Sample App",
  "manifest_version": 1,
  "version": "1.3.5.2",
  "app": {
    "launch":{
      "local_path": "index.html"
    }
  }
}
```
For more details on the manifest file, see the [Crosswalk Manifest](#wiki/Crosswalk-manifest) entry in the [Wiki](#wiki) section.

### The Application Structure
A typical application structure contains the manifest.json file in the root directory. The main entry point to the application is then referenced from that manifest file. In most applications this file is in the root directory as well.
```
/home/abc/dist/src/manifest.json
/home/abc/dist/src/index.html
/home/abc/dist/src/appliactions.js
/home/abc/dist/src/assets/images.jpg
```
### Packaging for Android
The Android APK maker is included with the crosswalk-android binaries available in [Downloads](#documentation/downloads).

To package your own web application, unpack the Crosswalk app template tarball that was provided as part of the crosswalk-android ZIP archive.
```sh
tar xzvf xwalk_app_template.tar.gz
cd xwalk_app_template
```
The xwalk_app_template contains utilities and dependencies for packaging an application into an APK file, so it can be installed on an Android device.

**Note**: For this script to work, you should ensure that the android command from the Android SDK is on your path. It is located in <Android SDK location>/tools/android.

Below is an example of how to package a local web app. We assume that the files for the app are in /home/abc/dist and the main entry point HTML file is /home/abc/dist/src/index.html:

```sh
python make_apk.py --package=com.abc.app --name=ABC \
  --app-root=/home/abc/dist --app-local-path=src/index.html
```  

The apk file is output to the same directory as the make_apk.py script, with a filename <name&gt.apk, where <name> is the name you set with the --name flag.

Install the APK on your device:

```sh
adb install -r ABC.apk
```

### Packaging for Tizen
There is currently no application packager for Tizen. To run your application in the Tizen environment, you can launch xwalk and point it to a web server hosting your application.

```sh
sdb shell
xwalk http://server/application
```

If you are running Tizen via the emulator, you can enable [File Sharing](https://developer.tizen.org/help/index.jsp?topic=%2Forg.tizen.gettingstarted%2Fhtml%2Fdev_env%2Femulator_file_sharing.htm) which can allow you to access your application files directly in the Tizen environment. You can then launch xwalk from an sdb shell providing it with the path to your application:

```sh
sdb shell
xwalk ...
```

Alternatively you can use '''sdb push''' to push the entire contents of your application directory to the Tizen device and run the application locally. A full sequence of command, including the enabling of remote debugging on the Tizen emulator:

```sh
sdb root on
sdb forward tcp:9222 tcp:9222
sdb push samples/hello_world /home/developer/hello_world
sdb shell "xwalk --remote-debugging-port=9222 --use-gl=osmesa /home/developer/hello_world/index.html"
```

On the host, you can then connect to http://localhost:9222/