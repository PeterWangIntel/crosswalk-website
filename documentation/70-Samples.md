## Samples

We have packaged three simple applications to get you up and running with Crosswalk. These applications can be found in the archive <a href='https://download.01.org/crosswalk/releases/crosswalk-samples-0.1.tgz'>crosswalk-samples-0.1.tgz</a>.
```sh
tar xvf crosswalk-samples-0.1.tgz
```
Decompressing that archive will create a samples subdirectory with three projects:
* **samples/hello_world** &ndash; A minimalistic example

* **samples/webgl** &ndash; Get up and running with WebGL in Crosswalk

* **samples/tizen_apis** &ndash; A sample application using the Tizen APIs

## Hello World
<img class='sample-thumb' src='assets/sampapp-icon-helloworld.png'>
The smallest of applications--Hello, World! This sample provides a manifest.json and a minimal set of HTML files to start an application from the ground up.

Follow the steps on [Running an Application](#documentation/running_an_application), using ***hello_world*** as the source path for either Android or Tizen.

### Hello World on Android
Following the steps from the [Packaging for 
Android](#documentation/building_an_application/packaging-for-android), 
you build 
the HelloWorld.apk as follows:
```sh
python make_apk.py --package=com.sample.hello_world --name=HelloWorld \
           --app-root=samples/hello_world --app-local-path=index.html
```
Then install the APK on Android:
```sh
adb install HelloWorld.apk
```

### Hello World on Tizen
Following the steps from the [Running on Tizen](#documentation/running_an_application/running-on-tizen), you can install and run the Hello World sample as follows:
```sh
sdb push samples/hello_world /home/developer/hello_world
sdb shell "xwalk /home/developer/hello_world/index.html"
```

## WebGL
<img class='sample-thumb' src='assets/sampapp-icon-webgl.png'>
Ah, the power of WebGL. This sample provides a quick example of integrating ThreeJS into a Crosswalk application.

Follow the steps on [Running an Application](#documentation/running_an_application), using ***webgl*** as the source path for either Android or Tizen.
### WebGL on Android
Following the steps from the [Packaging for 
Android](#documentation/building_an_application/packaging-for-android), 
you build the WebGL.APK as follows:
```sh
python make_apk.py --package=com.sample.webgl --name=WebGL \
      --app-root=samples/webgl --app-local-path=index.html
```
Then install the APK on Android:
```sh
adb install WebGL.apk
```

### WebGL on Tizen
Following the steps from the [Running on Tizen](#documentation/running_an_application/running-on-tizen), you can install and run the WebGL sample as follows:
```sh
sdb push samples/webgl /home/developer/webgl
sdb shell "xwalk --usegl=osmesa /home/developer/webgl/index.html"
```

## Tizen APIs
<img class='sample-thumb' src='assets/sampapp-icon-api.png'>
A sample application leveraging a Crosswalk extension which implements 
some of the Tizen APIs. This sample demonstrates usage of the 
tizen.systeminfo API.

To use this example, you need to run the application on a Tizen device or in the [Tizen emulator](https://developer.tizen.org/help/index.jsp?topic=%2Forg.tizen.gettingstarted%2Fhtml%2Fdev_env%2Femulator.htm).

Make sure the tizen-extension-crosswalk RPM is installed on the Target device, as described on  [Installing Crosswalk on Tizen](#documentation/installing_crosswalk/tizen).

The following steps use the helper script **tizen-extension-crosswalk** 
to load the Tizen extension API into Crosswalk during load time.
```sh
sdb push samples/tizen_apis /home/developer/tizen_apis
sdb shell "tizen-extensions-crosswalk /home/developer/tizen_apis/index.html"
```
