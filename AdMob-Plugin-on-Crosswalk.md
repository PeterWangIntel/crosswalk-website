Please refer to [Setup Development Environment](https://crosswalk-project.org/#wiki/Setup-Development-Environment-Of-Crosswalk-Cordova-Android) if it is not ready.

Note: please remember to update the xwalk_core_library project.
    
    $ cd [path_to_xwalk_core_library]
    $ android update lib-project -p . --target android-19

We use `plugman` to install plugins. Please refer to [Using Plugman to Manage Plugins](https://crosswalk-project.org/#wiki/Add-Plugins-With-Crosswalk-Cordova-Android). Install it via:

    $ npm install -g plugman

Create example app:

    $ [path_to_cordova_xwalk_android]/bin/create example org.apache.example example --shared
    $ cd example

Install API plugins as following from upstream repos:
     
    $ cd [path_to_example]
    $ plugman install --platform android --project ./ --plugin https://github.com/floatinghotpot/cordova-plugin-admob.git

Add Google Play SDK dependency:

* Install the Google Play services SDK. Please refer to [https://developer.android.com/google/play-services/setup.html](official doc).
* Copy the library project at ```<android-sdk>/extras/google/google_play_services/libproject/google-play-services_lib/``` to the location where you maintain your Android app projects. 
* Add SDK dependency:

    * add ```android.library.reference.2=./google-play-services_lib``` to project.properties.
    * enter the google-play-services_lib directory, run ```android update lib-project -p . --target android-19```

Replace the [path_to_example]/assets/www/js/index.js with following content:
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
        if (window.plugins.AdMob) {
            var adIdiOS = 'a151e6d43c5a28f';
            var adIdAndroid = 'a151e6d65b12438';
            var adId = (navigator.userAgent.indexOf('Android') >= 0) ? adIdAndroid : adIdiOS;

            var am = window.plugins.AdMob;
            am.createBannerView(
                {
                    'publisherId' : adId,
                    'adSize' : am.AD_SIZE.BANNER,
                    'bannerAtTop' : true
                },
                function() {
                    am.requestAd(
                        {  'isTesting' : true },
                        function() { am.showAd(true); },
                        function() { alert('Failed to request Ad'); }
                    );
                },
                function() { alert('Failed to create Ad Banner'); }
            );
        } else {
            alert('AdMob plugin not available!' );
        }
    }
};
```

**Note:**

* Test the Banner Ad without ID: 

Please add  ```request.addTestDevice("TEST_DEVICE_ID");``` in ```RequestAdRunnable``` class of AdMob.java

You can find your Device ID in the logcat output by requesting an ad when debugging on your device.

* You may need to enable the [Remote Debugging](https://crosswalk-project.org/#wiki/Remote-Debugging-With-Crosswalk-Cordova-Android)

Finally, Build and Run:

    $ cd [path_to_example]
    $ ./cordova/build
    $ ./cordova/run



 
  
 