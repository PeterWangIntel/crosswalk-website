### Checkout crosswalk-cordova-android

    $ git clone https://git@github.com/crosswalk-project/crosswalk-cordova-android.git

Make sure you are on the `master` branch (the default one).

### Setup XWalkCoreLibrary dependency
You can either download the binary from crosswalk website or build from the source.

##### Download
To download XWalkCoreLibrary, please navigate to [crosswalk/releases](https://download.01.org/crosswalk/releases/). Choose the Android package with specific architecture you would like to build your app.
For example, for x86:

    $ wget https://download.01.org/crosswalk/releases/crosswalk/android/canary/5.34.104.0/x86/crosswalk-5.34.104.0-x86.zip

For arm: 

    $ wget https://download.01.org/crosswalk/releases/crosswalk/android/canary/5.34.104.0/arm/crosswalk-5.34.104.0-arm.zip

Extract it:

    $ unzip crosswalk-5.34.104.0-x86.zip
    $ cd crosswalk-5.34.104.0-x86/
    $ tar zxvf xwalk_core_library.tar.gz

##### Build (Optional)
To build XwalkCoreLibrary, please refer to [Build Crosswalk](https://crosswalk-project.org/#contribute/building_crosswalk) to prepare for Android build environment. Please pay attention to the architecture you build against.

Build XWalkCoreLibrary project by command:

    $ ninja -C out/Release xwalk_core_library

The output is located at: `/path/to/crosswalk/src/out/Release/xwalk_core_library`

##### Import
Import XWalkCoreLibrary by linking it to `framework` folder of crosswalk-cordova-android:

    $ ln -s /path/to/xwalk_core_library /path/to/crosswalk-cordova-android/framework/