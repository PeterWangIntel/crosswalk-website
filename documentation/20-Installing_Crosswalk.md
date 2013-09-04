## Install Crosswalk
### On Android

You will need to install [adb](http://developer.android.com/tools/help/adb.html), and use it to connect your device to your development machine.

Once you've done that, follow these steps to install crosswalk. (In this example, we were installing onto an HTC One X.)

1.  Download the binary for Android from the URL in <a href="#Get Crosswalk">Get Crosswalk</a>.

1.  Install the xwalk binary on the device (here we're assuming the *xwalk-android.zip* file is the *~/Downloads* directory on a Linux machine):

    <pre>
    host$ cd ~/Downloads
    host$ mkdir xwalk; cd xwalk
    host$ unzip ../xwalk-android.zip
    host$ adb shell ‘pm set-install-location 2’
    host$ adb install xwalk-android/apks/XWalkCoreShell.apk
        629 KB/s (18634788 bytes in 28.899s)
        pkg: /data/local/tmp/XWalkCoreShell.apk
    Success
    </pre>

1.  Go to the application list and locate the `XWalkCoreShell` app. Run it.

1.  Once it's running, give it a URI to run by entering it into the address bar at the top of the application. This can either be an absolute URL, e.g.

    http://google.com/

    or the location of an app unpacked on the device, e.g.

    file:///tmp/myapp/index.html

### On Tizen 2.1

1. Log into the device as root by default: `sdb root on`.
1. Push the crosswalk RPM to the device: `sdb push [crosswalk].rpm /tmp`
1. Push the crosswalk Tizen extensions RPM to the device: `sdb push [crosswalk extensions].rpm /tmp`
1. Install the RPMs on the device: `sdb shell` then `rpm -i /tmp/[crosswalk].rpm /tmp/[crosswalk extensions].rpm`.
1. From there, you can launch: `xwalk http://www.google.com`
1. You will be able to create an xwalk icon on the home screen (to launch xwalk) later. (It is a 'work in progress'.)