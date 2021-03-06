*This page has been promoted to the main website at https://crosswalk-project.org/#documentation/embedding_crosswalk. Any modifications to the content should preferably be made there, rather than to this wiki page.*

The Crosswalk embedding API provides a WebView-like view for displaying web pages. Unlike a WebView, it provides support for WebGL, plus access to a host of APIs which are not available to a WebView (see [this list](#documentation/apis/web_apis)). 

## Building your first app with Crosswalk Embedded API

**1. Before you start, [set up your development environment for Android development](http://developer.android.com/training/basics/firstapp/index.html).**

**2. Download Crosswalk Embedding API library**

  * Download Crosswalk package from [here](https://download.01.org/crosswalk/releases/crosswalk/android/)
      - Choose the release you want to use, [canary](https://download.01.org/crosswalk/releases/crosswalk/android/canary), [beta](https://download.01.org/crosswalk/releases/crosswalk/android/beta) or [stable](https://download.01.org/crosswalk/releases/crosswalk/android/stable)
      - Choose a version. _(the latest version is recommended)_
      - Choose the architecture `x86` or `arm`
      - Download the package named `crosswalk-webview-x.xx.xxx.x-<arch>.zip`
  * Extract the archive from the downloaded crosswalk-webview zip file to your work space.

**3. Import `crosswalk-webview` into Eclipse.**
  * Start Eclipse.
  * Select *File* > *New* > *Project...*, then *Android* > *Android Project From Existing Code*.
  * Set *Root Directory* to the path of the `crosswalk-webview/` directory you extracted.
  * Click *Finish*. The **crosswalk-webview** project will appear in the *Package Explorer*.

**4. Use the Crosswalk Embedding API in your project**
  * Create a new Android project. See [Building Your First Android App](http://developer.android.com/training/basics/firstapp/index.html) if you're unfamiliar with this.
  * Right click on your project, and select *Properties*.
  * The *Properties* dialog will appear. Select *Android*.
  * In the *Library* tab, click *Add*. Add the **crosswalk-webview** project as a library.
  * Click *Ok* to start.

**5. Use XWalkView in your project**
  * In your `AndroidManifest.xml` file, add the following permissions:

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

  * In your layout file (under `res/layout/`), add an XWalkView to your layout:

  ```
  <org.xwalk.core.XWalkView android:id="@+id/xwalkview"
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent">
  </org.xwalk.core.XWalkView>
  ```

  * In your code, you can now use XWalkView:

  ```
  XWalkView xwalkView = (XWalkView) findViewById(R.id.xwalkview);
  xwalkView.load("https://www.google.com/", null);
  ```

For a more detailed example of how to use the Crosswalk Embedding API, see the [Embedding API sample](https://github.com/crosswalk-project/crosswalk/tree/master/runtime/android/sample).