### Prerequisite

* Crosswalk Cordova Android: [Setup Development Environment](https://crosswalk-project.org/#wiki/Setup-Development-Environment-Of-Crosswalk-Cordova-Android) of Crosswalk Cordova Android.
* An android device with GMS installed, here is guide of [how to install GMS on ZTE Geek.](http://powerbuilder.sh.intel.com/projects/wrtonandroid/wiki/xwalk/geek_install_gms)

### Build an example app using IAP plugin

1. Update the xwalk_core_library project.

    ```
    $ cd [path_to_xwalk_core_library]
    $ android update lib-project -p . --target android-19
    ```

1. [Install plugman](https://crosswalk-project.org/#wiki/Add-Plugins-With-Crosswalk-Cordova-Android) for plugin management.

    ```
    $ npm install -g plugman
    ```

1. [Create example app](https://crosswalk-project.org/#wiki/Create-Sample-App-With-Crosswalk-Cordova-Android):

    ```
    $ [path_to_cordova_xwalk_android]/bin/create example org.apache.example example --shared
    $ cd example
    ```

1. Install IAP plugin as following from upstream repo:

    ```
    $ cd [path_to_example]
    $ plugman install --platform android --project ./ --plugin https://github.com/poiuytrez/AndroidInAppBilling.git#master:v3
    ```

1. Add Google Play SDK dependency:

    a.  [Install the Google Play services SDK](https://developer.android.com/google/play-services/setup.html).<br>
    b.  Copy the library project at ```<android-sdk>/extras/google/google_play_services/libproject/google-play-services_lib/``` to the location where you maintain your Android app projects. <br>
    c.  Add SDK dependency:
    ```
    # add "android.library.reference.2=./google-play-services_lib" to project.properties.
    $ cd google-play-services_lib
    $ android update lib-project -p . --target android-19
    ```

1. Generate your private key for your app.

    ```
    $ keytool -genkey -v -keystore private_key.keystore -alias alias_private_key -keyalg RSA -keysize 2048 -validity 10000`<br>
    ```
    This generates a key file called `private_key.keystore`, which contains a single key, valid for 10000 days. The alias is a name that you that you will use later, to refer to this keystore when signing your application. Running this command you will be prompted provide passwords for the keystore and alias.

1. Create a file called `ant.properties` in your project's base directory, in the same directory as `build.xml` and the other properties files.

1. Add following lines to `ant.properties`
    ```
key.store=private_key.keystore
key.alias=alias_private_key
    ```

1. Replace the [path_to_example]/assets/www/js/index.js with following content, which tests basic methods of the IAP plugin.
    ```
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        if (inappbilling) {
            console.log("[IAP] InAppBillingPlugin exists.");
            var toStr = function(o) { return (typeof o === 'object') ? JSON.stringify(o) : o; }
            var errorHandler = function(error) { console.log("[IAP] ERROR: "+error); }

            // Following methods will be tested:
            // * Init
            // * GetPurchase
            // * Buy
            // * Consume
            var initHandler = function(result) {
                console.log("[IAP] init success: " + toStr(result));
                inappbilling.getPurchases(getPurchasesHandler, errorHandler);
            }
            var getPurchasesHandler = function(result) {
                console.log("[IAP] getPurchases returns: " + toStr(result));
                inappbilling.buy(buyHandler, errorHandler, "gas");
            }
            var buyHandler = function(result) {
                console.log("[IAP] buy returns: " + toStr(result));
                inappbilling.consumePurchase(consumeHandler, errorHandler, "gas");
            }
            var consumeHandler = function(result) {
                console.log("[IAP] consume returns: " + toStr(result));
            }

            inappbilling.init(initHandler, errorHandler, {showLog:true});
        } else {
            console.log("[IAP] InAppBillingPlugin does not exist!");
        }
    }
};
    ```

1. For security reason, IAP APIs is not allowed in debug version, so we need to build a release version of our app: <br>

    ```
    # In build.xml, change "debuggable" to false.
    $ ./cordova/build --release
    ```
    You will be prompted to enter the password of your private key.<br>
    If this blocks for a long time, try run `ant release` with your build.xml directly.<br>

1. Alternatively you can add following lines into ant.properties to skip the password prompt.
    ```
key.store.password=password
key.alias.password=password
    ```

1. After `ant` finish building the app, upload the `example-release.apk` to your Google Play Developer Console. You might need to [obtain a Google Play Developer account](https://support.google.com/googleplay/android-developer/answer/113468?hl=en) if you haven't. Apps that using [Google IAB APIs](http://developer.android.com/google/play/billing/api.html) can only be tested via developer console and on a real device, not on emulator.

1. In In-app Products tab of the Google Play Developer Console of your new uploaded app, add a new item `gas`, set price to $0.99 (Or bigger amount, if you like :) ), remember to set status to Active.

1. Sideload your app to a device:

    ```
$ adb install -r ./bin/example-release.apk
    ```

1. Run this example app. You should see a dialog pops up asking you to confirm buying an item. And log should be found similar to following:

    ```
I/chromium(24322): [INFO:CONSOLE(49)] "[IAP] InAppBillingPlugin exists.", source: file:///android_asset/www/js/index.js (49)
I/chromium(24322): [INFO:CONSOLE(6)] "InAppBilling[js]: setup ok", source: file:///android_asset/www/plugins/com.smartmobilesoftware.inappbilling/www/inappbilling.js (6)
I/chromium(24322): [INFO:CONSOLE(59)] "[IAP] init success: OK", source: file:///android_asset/www/js/index.js (59)
I/chromium(24322): [INFO:CONSOLE(6)] "InAppBilling[js]: getPurchases called!", source: file:///android_asset/www/plugins/com.smartmobilesoftware.inappbilling/www/inappbilling.js (6)
I/chromium(24322): [INFO:CONSOLE(63)] "[IAP] getPurchases returns: []", source: file:///android_asset/www/js/index.js (63)
I/chromium(24322): [INFO:CONSOLE(6)] "InAppBilling[js]: buy called!", source: file:///android_asset/www/plugins/com.smartmobilesoftware.inappbilling/www/inappbilling.js (6)
I/chromium(24322): [INFO:async_pixel_transfer_manager_android.cc(60)] Async pixel transfers not supported
I/chromium(24322): [INFO:CONSOLE(67)] "[IAP] buy returns: gas", source: file:///android_asset/www/js/index.js (67)
I/chromium(24322): [INFO:CONSOLE(6)] "InAppBilling[js]: consumePurchase called!", source: file:///android_asset/www/plugins/com.smartmobilesoftware.inappbilling/www/inappbilling.js (6)
I/chromium(24322): [INFO:CONSOLE(71)] "[IAP] consume returns: {"orderId":"12999763169054705758.1370855591922601","packageName":"org.apache.example","productId":"gas","purchaseTime":1393405213376,"purchaseState":0,"purchaseToken":"qgwgidfrszaykcuzscwqanua.AO-J1OxuK1P0r9ipbSR4_LG60JSEtFbFOgiSXGIAaIvCQMZuB-2Y5OJqrvsEh_4Bf8oz3eMuMxoCw5BoCTfpznx917hru1WNWpRhQPZOuWkJSFLXaA-ZSSo"}", source: file:///android_asset/www/js/index.js (71)
    ```

Tips:
* No need to publish your app, just a draft version is ok for testing. 
* No need to upload the apk onto developer console every time when you have changed the code, just keep the version unchanged.
* If seeing "-1003:Purchase signature verification failed", you might need to double check the public key(hard coded by `base64EncodedPublicKey` in `InAppBillingPlugin.java`), to make sure it is the same as the key in your developer console.
* Before debugging your own application, better use a test app on the same device to help check if the In App Billing API of Google Play itself is working fine. For example, the TrivialDrive sample is a good choice.
* Google In-App Billing API: http://developer.android.com/google/play/billing/api.html
* Remember the account on the device which you are using to test your IAP app should be the test account listed in your developer console, for more information please see [Testing an APK with Google In-App Billing API](http://developer.android.com/google/play/billing/billing_testing.html)
* Full guide of signing an app by ant: http://tipsinandroid.blogspot.com/2011/10/android-tips-building-android.html
* Maybe you would like to enable [Remote Debugging](https://crosswalk-project.org/#wiki/Remote-Debugging-With-Crosswalk-Cordova-Android) for Crosswalk Cordova Android.