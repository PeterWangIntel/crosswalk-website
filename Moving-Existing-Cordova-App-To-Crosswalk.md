### Step 1
Import the existing Cordova app into Android Development Tool (ADT). If you created your app with Cordova command-line tool, the Android platform should be in `platforms/android`. Uncheck the `CordovaLib` project so that you only import the app project. Then press `Finish`.
### Step 2
Import the Crosswalk-Cordova-Android library projects. The projects should be located at `/path/to/crosswalk-cordova-android/framework`. It will import two projects: `xwalk_core_library` and `CordovaLib`.
### Step 3
Configure the app to depend on Crosswalk-Cordova-Android library projects. Right-click on app project, then, in context menu, choose `Properties`. In the `Properties` dialog, remove the reference to the old CordovaLib.
After that, click `Add…` to configure your project to use a reference to CordovaLib in Crosswalk-Cordova-Android.
### Step 4
Build each project. Start from “xwalk_core_library”, then “CordovaLib”, and finally “HelloWorld”. If all builds pass, your app is now using Crosswalk.
