Crosswalk-based Cordova Android
==
Crosswalk-based Cordova Android is derived from [Cordova Android](https://github.com/apache/cordova-android) and embeds [Crosswalk](https://github.com/crosswalk-project/crosswalk) as the HTML5 runtime. It supports Android 4.0+.

Crosswalk-based Cordova Android aims to be compatible to Cordova Android as much as possible. Basically, you could refer to [Cordova Android Platform Guide](http://cordova.apache.org/docs/en/3.3.0/guide_platforms_android_index.md.html#Android%20Platform%20Guide).

Requires
---

- Java JDK 1.5 or greater
- Apache ANT 1.8.0 or greater
- Android SDK [http://developer.android.com](http://developer.android.com)
- Python 2.6 or greater

Please refer to **Requirements and Support** and **Install the SDK** in [Cordova Android Platform Guide](http://cordova.apache.org/docs/en/3.3.0/guide_platforms_android_index.md.html#Android%20Platform%20Guide) to install JDK, Ant and Android SDK.

And please install Python 2.6 or greater for your system.

Download
---

Please download the crosswalk-cordova-android development bundle from [Download Crosswalk Android](https://download.01.org/crosswalk/releases/crosswalk/android). Please pay attention to the release channels  and architectures.

For example, download beta 5.34.104.4 for X86:

    $ wget https://download.01.org/crosswalk/releases/crosswalk/android/beta/5.34.104.4/x86/crosswalk-cordova-5.34.104.4-x86.zip

for ARM:

    $ wget https://download.01.org/crosswalk/releases/crosswalk/android/beta/5.34.104.4/arm/crosswalk-cordova-5.34.104.4-arm.zip

Unzip it and you are ready to create app.

Creating & Running Apps
---

You could use the command-line tool and Android Developer Tool to create and manage your Crosswalk-based Cordova Android app.
 * [Create Hello World App](Create-Sample-App-With-Crosswalk-Cordova-Android)

Remote Debugging
---

Thanks to the remote debugging capability of Crosswalk, you are able to debug your Cordova Apps remotely via Chrome Developer Tools.
 * [Remote Debug Cordova App](Remote-Debugging-With-Crosswalk-Cordova-Android)

Adding Plugins
---

You could use the `plugman` command-line tool to add Cordova plugins as needed.
 * [Add Plugins into Your App](Add-Plugins-With-Crosswalk-Cordova-Android)
 * [Plugins Supported by Crosswalk-Cordova-Android 3.3.0](Plugins-List-@-3.3.0-Supported-by-Crosswalk-Cordova-Android)
 * Additional external plugins
  * [Use AdMob plugin in Crosswalk](AdMob-Plugin-on-Crosswalk)
  * [Use IAP plugin in Crosswalk ](IAP-Plugin-on-Crosswalk)