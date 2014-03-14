Please refer to [Remote debugging with the ADB Chrome extension](https://developers.google.com/chrome-developer-tools/docs/remote-debugging#remote-debugging) to setup the Google Chrome on your host and configure the USB debugging on your device.

The remote debugging is enabled in Cordova debug build. So after build app with `--debug` switch, such as:

    $ ./cordova/build --debug

Install and launch the output app on your device. Then you can navigate to `chrome://insepct/` in Google Chrome on host to see the inspectable pages.

If you build app with `--release`, the remote debugging is not enabled.

You may need to check [Version Mapping Table](https://crosswalk-project.org/#wiki/Remote-debugging-on-android). It indicates the corresponding Chrome version required by different Crosswalk version for remote debugging.