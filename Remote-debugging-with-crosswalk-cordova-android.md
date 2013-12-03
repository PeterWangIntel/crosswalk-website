Please refer to [Remote debugging with the ADB Chrome extension](https://developers.google.com/chrome-developer-tools/docs/remote-debugging#remote-debugging) to setup the Google Chrome on your host and configure the USB debugging on your device.

If you haven't created your app, please refer to [Create Hello World App](Create-Sample-App-With-Crosswalk-Cordova-Android).

The remote debugging features is disabled by default in your Cordova app. To enable it, please call
    
    XWalkView.enableRemoteDebugging();

in the main activity explicitly. 

For example:


    public class cordovaExample extends DroidGap
    {
        @Override
        public void onCreate(Bundle savedInstanceState)
        {
            super.onCreate(savedInstanceState);
            super.loadUrl(Config.getStartUrl());       
    +       // Enable the remote debugging.
    +       this.appView.enableRemoteDebugging();
         }   
    }


After this change, rebuild and launch your app on device. Now you could navigate to `chrome://insepct/` in Google Chrome to see the inspectable pages in your app.