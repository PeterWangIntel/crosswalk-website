We recommend to use `plugman` to install plugins. You need to have [node.js](http://nodejs.org/) installed. Then install `plugman` by:

    $ npm install -g plugman

If your app is not generated, please refer to [Create Sample App](Create-Sample-App-With-Crosswalk-Cordova-Android) to generate your app first. 

You can find the plugin API reference and install URL in Cordova API Reference. For example, if you would like to install [Accelerometer](http://cordova.apache.org/docs/en/3.0.0/cordova_accelerometer_accelerometer.md.html#Accelerometer) into your app, please install it by:
 
    $ plugman install --platform android --project /path/to/your/app --plugin https://git-wip-us.apache.org/repos/asf/cordova-plugin-device-motion.git

Please refer to [Using Plugman to Manage Plugins](http://cordova.apache.org/docs/en/3.0.0/plugin_ref_plugman.md.html) for more details.

Please refer to [Plugins Supported by Crosswalk-Cordova-Android 3.0.0](Plugins-List-@-3.0.0-Supported-by-Crosswalk-Cordova-Android) for plugin installation URLs.