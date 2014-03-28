### Checkout crosswalk-cordova-android

    $ git clone https://git@github.com/crosswalk-project/crosswalk-cordova-android.git

Make sure you are on the `master` branch (the default one).

### Build XWalkCoreLibrary
To build XwalkCoreLibrary, please refer to [Build Crosswalk](https://crosswalk-project.org/#contribute/building_crosswalk) to prepare for Android build environment. Please pay attention to the architecture you build against.

Build XWalkCoreLibrary project by command:

    $ ninja -C out/Release xwalk_core_library

The output is located at: `/path/to/crosswalk/src/out/Release/xwalk_core_library`

### Import
Import XWalkCoreLibrary by linking it to `framework` folder of crosswalk-cordova-android:

    $ ln -s /path/to/xwalk_core_library /path/to/crosswalk-cordova-android/framework/