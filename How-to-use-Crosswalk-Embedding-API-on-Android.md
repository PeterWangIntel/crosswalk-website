# Introduction

Crosswalk Embedded API provides WebView like view which displays web pages, but has many differences. 

## Building your first app with Crosswalk Embedded API

**1. Before you start, be sure you have set up your development environment. Please refer to [Building Your First Android App](http://developer.android.com/training/basics/firstapp/index.html)**:

**2. Download Crosswalk Embedded API library**

  * Download Crosswalk package from [here](https://download.01.org/crosswalk/releases/android/)
      - Choose the release you want to use, [canary](https://download.01.org/crosswalk/releases/android/canary), [beta](https://download.01.org/crosswalk/releases/android/beta) or [stable](https://download.01.org/crosswalk/releases/android/stable)
      - Choose a version. _(suggest to use the latest one)_
      - Choose the architecture ```x86``` or ```arm```
      - Download the package named ```crosswalk-cordova-x.xx.xxx.x-x86.zip```
  * Extract ```framework/xwalk_core_library``` from the downloaded Crosswalk package to your work space.

**3. Import ```xwalk_core_library``` into Eclipse (if you’ll use the Eclipse IDE).**
  * Open [Eclipse]
  * From [File]-->[New]-->[Project...]-->[Android/Android Project From Existing Code], select [Root Directory] to the path of ```xwalk_core_library```  
  * Click [Finish], and then ```xwalk_core_library``` project will appear on the [Package Explorer].

**4. Using Crosswalk Embedded API in your project**
  * Create a new Android project. Please refer to [Building Your First Android App](http://developer.android.com/training/basics/firstapp/index.html).
  * Right click on your project, and select [Properties].
  * A properties dialog will appear. Select [Android]. On the [Library] form, click [Add], Add ```xwalk_core_library```
  * Click [Ok] to start using Crosswalk Embedded API.

**5. Quick start of XWalkView**
  * You have finished above 4 steps
  * On your ```AndroidManifest.xml```, You need to add below permissions:

  ```
        <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
        <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
        <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
        <uses-permission android:name="android.permission.CAMERA" />
        <uses-permission android:name="android.permission.INTERNET" />
        <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
        <uses-permission android:name="android.permission.RECORD_AUDIO" />
        <uses-permission android:name="android.permission.WAKE_LOCK" />
        <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
  ```

  * On your layout file under ```res/layout```, add XWalkView to your layout:

  ```
        <org.xwalk.core.XWalkView android:id="@+id/xwalkview"
           xmlns:android="http://schemas.android.com/apk/res/android"
           android:layout_width="fill_parent"
           android:layout_height="fill_parent">
        </org.xwalk.core.XWalkView>
  ```

  * On your code, you can use XWalkView now:

  ```
        XWalkView xwalkView = (XWalkView) findViewById(R.id.xwalkview);
        xwalkView.load("https://www.google.com/", null);
  ```

**6. For more detailed usage of Crosswalk Embedded API please refer to ```XWalkEmbeddedAPISample```.**