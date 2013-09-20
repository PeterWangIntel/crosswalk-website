## Building Crosswalk

### Environment
Please setup the build environment by following the instructions in Chromium's wiki:
 * [Setting up the environment for Windows](http://www.chromium.org/developers/how-tos/build-instructions-windows#TOC-Build-environment).
 * [Setting up the environment for Linux](http://code.google.com/p/chromium/wiki/LinuxBuildInstructionsPrerequisites).
 * [Setting up the environment for Android](http://code.google.com/p/chromium/wiki/AndroidBuildInstructions#Install_prerequisites).

Additionally, make sure you have properly transferred your public SSH key(s) to GitHub. See this [help page](https://help.github.com/categories/56/articles) for more information.

### Get the code
#### Before starting: Android
If you are building Crosswalk for Android, you should first set the `XWALK_OS_ANDROID` environment variable:

    export XWALK_OS_ANDROID=1

#### Run `gclient`
Crosswalk uses `gclient` to manage the code and dependencies. To get `gclient` tool, you should install [depot_tools](http://www.chromium.org/developers/how-tos/install-depot-tools).

First, you need to create a source directory:

    mkdir ~/git/crosswalk
    cd ~/git/crosswalk

Execute the following command to gclient auto-generate `.gclient` file.

    gclient config --name=src/xwalk \
                   git://github.com/crosswalk-project/crosswalk.git

At the same level of `.gclient` file, execute

    gclient sync

to fetch all codes.

### Build Instructions
We recommend to use `ninja` as build tool. Please refer to [Ninja Build](http://code.google.com/p/chromium/wiki/NinjaBuild) to setup the environment.

We use `gyp` to generate Crosswalk projects, go to `src` directory, execute

    export GYP_GENERATORS='ninja'
    python xwalk/gyp_xwalk

**NOTE**: it is possible also to enable [Aura UI framework](http://www.chromium.org/developers/design-documents/aura) for Tizen 3.0 build; in that case execute:

    python xwalk/gyp_xwalk -Duse_aura=1 -Duse_gconf=0 -Duse_xi2_mt=2

at this point you have built the projects with gyp and are ready for the actual compilation. To build the launcher now execute:

    ninja -C out/Release xwalk

Optionally, to build the tests, execute:

    ninja -C out/Release xwalk_unittest
    ninja -C out/Release xwalk_browsertest

#### Build Instructions for Android
Setup environment for Android build for IA platform(Change x86 to arm for ARM build)

    . xwalk/build/android/envsetup.sh --target-arch=x86

Generate Crosswalk projects, execute

     export GYP_GENERATORS='ninja'
     xwalk_android_gyp

To build xwalk core and runtime shell(for developer testing purpose), execute:

    ninja -C out/Release xwalk_core_shell_apk xwalk_runtime_shell_apk

To build xwalk runtime library APK, execute:
   
    ninja -C out/Release xwalk_runtime_lib_apk

To build a sample web app APK, execute:
   
    ninja -C out/Release xwalk_app_template_apk

#### Building an RPM package for Tizen
Creating an RPM involves some additional work due to the way `gbs` works: it expects a single git repository with all files for it to run `git archive`. Crosswalk, on the other hand, contains several independent git and Subversion repositories in the same directory tree.

First of all, you need to create a separate, flat directory tree with all the files used by the project.

    export XWALK_PREFIX=/root/of/xwalk/tree
    cd $XWALK_PREFIX
    
    gclient recurse --no-progress -j 1 \
                    --gclientfile .gclient \
                    $PWD/src/xwalk/packaging/generate-flat-tree.sh
    gclient recurse --no-progress -j 1 \
                    --gclientfile .gclient-xwalk \
                    $PWD/src/xwalk/packaging/generate-flat-tree.sh

`XWALK_PREFIX` should point to the directory that **contains** the `src/` directory. The calls to `gclient recurse` create a tarball called `flat-xwalk-tree.tar` in your top-level `$XWALK_PREFIX` directory.

After that, you should create a new git repository using the contents of the generated tarball.

    mkdir tizen-package-root
    cd tizen-package-root
    
    tar -xf $XWALK_PREFIX/flat-xwalk-tree.tar
    cp -R $XWALK_PREFIX/src/xwalk/packaging .
    
    git init
    git add .
    git commit

What the commands above do are create a new git tree containing all the source files used by Crosswalk, put the `packaging/` directory in it and commit.

After that, `gbs` can be run as usual:

    gbs build -A i586

By default, the generated RPM files should be in `~/GBS-ROOT/local/repos/<repository name>/i586/RPMS`.

#### CAUTION!
* don't link symbolic your GBS-ROOT. It guides you hellgate.
* the GBS root has to be on the same partition as the /
