If you haven't setup the development environment yet, please refer to [Setup Development Environment](Setup-Development-Environment-Of-Crosswalk-Cordova-Android)

### Create, Build and Run a Sample App with Command-line Tool:
Create a sample app, for example:

    $ /path/to/crosswalk-cordova-android/bin/create HelloWorld com.example.helloworld HelloWorld

A new project is created in folder `HelloWorld`. The example HTML, JS and CSS files are located in `/path/to/HelloWorld/assets/www` (You may replace them with yours later).

Then build and run the sample app:

    $ cd HelloWorld
    $ ./cordova/build
    $ ./cordova/run

You will see the 'APACHE CORDOVA' page with a blinking 'DEVICE IS READY' tag.

Please refer to [Android Command-line Tools](http://cordova.apache.org/docs/en/3.0.0/guide_platforms_android_tools.md.html#Android%20Command-line%20Tools) for more command-line commands.

### Importing a Crosswalk-based Cordova Android Project into Eclipse

1. Import Crosswalk-based Cordova Android and XWalkCoreLibrary library projects by File > Import... > Existing Android Code Into Workspace. Point to /path/to/crosswalk-cordova-android/framework and click Finish.
2. Build xwalk_core_library and Cordova project by right clicking on each project then choose Build Project.
3. Import the generated project by File > Import... > Existing Android Code. Point to the generated app path.
4. Right click on the project root: Run as > Run Configurations
5. Click on the Target tab and select Manual (this way you can choose the emulator or device to build to)