_If you are a C/C++ developer and want to develop your own runtime built 
with Crosswalk, reference [Crosswalk Build Instructions](Build-Crosswalk) for instructions on how to build your own 
binary._

## Downloads

For official binaries, see [Downloads](#documentation/downloads). If you 
would like a binary for an operating system not provided, you will need 
to build Crosswalk yourself.

Once you have the binaries built, you can follow these instructions.

### Install Crosswalk

#### On Windows

On Windows, the zip package contains:

 * Crosswalk launcher - xwalk.exe (~33M)
 * Crosswalk packaged resources - xwalk.pak (~5M)
 * Unicode and i18n support library - icudt.dll (~9M)
 * EGL/OpenGLES support libraries - libEGL.dll, libGLESv2.dll (~1M)
 * Installer creation script (.bat or .sh)

For a quick 'smoke test', unzip the file into a directory and try to run:

`xwalk.exe http://www.google.com`

You should see a native app window that renders the `www.google.com` page. Reference [Crosswalk Command Line Options](Crosswalk-Command-Line-Options) to see which options are provided by this early binary.

#### On Linux

1. Download the binary for your platform from the URL in <a href="#Get Crosswalk">Get Crosswalk</a>.

1. Unpack the zip file.

1. Move to the unzipped directory: `cd xwalk-linux`

1. Smoke test with a known URL, e.g. `./xwalk http://google.com/`

#### On Android

See [Installing Crosswalk](#documentation/installing_crosswalk/android).

#### On Tizen

See [Installing Crosswalk](#documentation/installing_crosswalk/tizen).

### Package Your Web App  
Given a web app written in HTML5 and Javascript with an `index.html` 
entry page, the Crosswalk tools allows you to package it into a native 
app installer.

You can also pack a manifest.json file with your application. Reference 
[Crosswalk manifest](wiki/Crosswalk-manifest) to see how to write a manifest file.

#### For Windows Installer
The `create_windows_installer.bat` contained in the Crosswalk binaries is used to package a web app into a native app installer. 

A prerequisite for this installer is the Wix toolset. Download the toolset from http://wixtoolset.org/.

Run `create_windows_installer.bat --help` for instructions on how to use Wix.
```
usage: create_windows_installer.bat [options] [app_path]

The following options are supported:

app_path                Path to your Crosswalk application. If not specified, the
                          current directory is used.
--wix_bin_path=<path>   Path to Wix toolset binaries. If not specified, the
                          script will try to find them through PATH
--xwalk_path=<path>     Path to Crosswalk binaries. If not specified, the script
                          will try to find them through PATH, the app path, or
                          the current directory.
--app_name=<name>       Name of the application. If not specified, the name
                          of the application directory is used.
--version=<version>     The version of the application, defaults to 1.0.0
--app_arguments=<args>  Arguments that will be passed into Crosswalk executable.
                          If not specified, "index.html" is used. For example,
                          "--allow-file-access-from-files [INSTALLDIR]src/index.html"
--out=<pathname>        File Path of the output installer file, defaults to the
                          current directory with %app_name%.msi as its name.
--publisher=<name>      The manufacturer of this application, defaults to "Me"
--help                  Print this message
```

##### Example Usage
```
  create_windows_installer.bat webapps-scientific-calculator-master --wix_bin_path="C:\Program Files (x86)\WiX Toolset v3.7\bin" --xwalk_path="C:\Users\username\Desktop\xwalk paking\xwalk-win32"
```

#### For Linux Installer
The `create_linux_installer.sh` contained is used to create native installer in RPM or DEB package format through [checkinstall](http://asic-linux.com.mx/~izto/checkinstall/) utility. You MUST install `checkinstall` firstly.  Run `sudo apt-get install checkinstall` on Linux system. 

The usage is similar with that on Windows, but without Wix:
```
usage: create_linux_installer.sh [options] [app_path]

This script is used to create a standalone installer for web app. It
depends on checkinstall and crosswalk to function properly.
The following options are supported:

     app_path                Path to your web application. If not specified, the
                               current directory is used.
     --xwalk_path=<path>     Path to Crosswalk binaries. If not specified, the script
                               will try to find them through PATH, the app path, or
                               the current directory.
     --app_name=<name>       Name of the application. If not specified, the name
                               of the application directory is used.
     --version=<version>     The version of the application, defaults to 1.0.0
     --app_index=<path>      Path of app index file, relative to app_path. If not
                               specified, index.html is used.
     --out=<path>            Path of the output package file, defaults to
                               /tmp/xwalk_build/<app_name>
     --publisher=<name>      The manufacturer of this application, defaults to Me
     --help                  Print this message
```

#### For Android APK

The Android APK maker is included with the xwalk-android download. It can work on Linux, Windows and Mac OSX. For setting up the environment for Windows, please see the section 'Windows environment setup'.

To package your own web app, unpack the Crosswalk app template tarball. This is located inside the xwalk-android directory:

    host$ tar xzvf xwalk_app_template.tar.gz
    host$ cd xwalk_app_template

This template contains utilities and dependencies for packaging an application into an APK file, so it can be installed on an Android device.

<em>make_apk.py</em> is the key script for packaging a web app as an APK.

Note: For this script to work, you should ensure that the <code>android</code> command from the Android SDK is on your path. It is located in <em>&lt;Android SDK location&gt;/tools/android</em>.

Here is the help information for the <em>make_apk.py</em> script:

```
Usage: make_apk.py [options]

Options:
  -h, --help            show this help message and exit
  --package=PACKAGE     The package name. Such as:
                        --package=com.example.YourPackage
  --name=NAME           The apk name. Such as: --name=YourApplicationName
  --icon=ICON           The path of icon. Such as:
                        --icon=/path/to/your/customized/icon
  --app-url=APP_URL     The url of application. This flag allows to package
                        website as apk. Such as: --app-
                        url=http://www.intel.com
  --app-root=APP_ROOT   The root path of the web app. This flag allows to
                        package local web app as apk. Such as: --app-
                        root=/root/path/of/the/web/app
  --app-local-path=APP_LOCAL_PATH
                        The reletive path of entry file based on |app_root|.
                        This flag should work with "--app-root" together. Such
                        as: --app-local-path=/reletive/path/of/entry/file
  --keystore-path=KEYSTORE_PATH
                        The path of the developer keystore, Such as:
                        --keystore-path=/path/to/your/developer/keystore
  --keystore-alias=KEYSTORE_ALIAS
                        The alias name of keystore, Such as: --keystore-
                        alias=alias_name
  --keystore-passcode=KEYSTORE_PASSCODE
                        The passcode of keystore, Such as: --keystore-
                        passcode=code
  --enable-remote-debugging
                        Enable remote debugging.
  -f, --fullscreen      Make application fullscreen.
```

To package a local web app: Below is an example of how to package a local web app. We assume that the files for the app are in /home/abc/dist and the main entry point HTML file is /home/abc/dist/src/index.html:

    host$ python make_apk.py --package=com.abc.app --name=ABC \
      --app-root=/home/abc/dist --app-local-path=src/index.html

Package a host web app, e.g. a web page on a remote web site. Below is one example to package a host web app:

    host$ python make_apk.py --package=com.example.app --name=Test1 \
      --app-url=http://www.intel.com

In both cases, the apk file is output to the same directory as the <em>make_apk.py</em> script, with a filename &lt;name&gt.apk, where &lt;name&gt; is the name you set with the <code>--name</code> flag.

Install the APK on your device:

    host$ adb install -r ABC.apk Test1.apk
##### Windows environment setup
1. Install the Android SDK. Make sure to add “%SDK_PATH%\platform-tools” and “%SDK_PATH%\platform-tools\tools” into the "PATH" environment variable.

2. Update to the latest Android API level.

3. Install python and ant. Add the installed path of python and the bin path of ant are added into the "PATH" environment variable as well.

4. Install Oracle JDK and add the paths of “%JAVA_HOME%/bin” and “%JAVA_HOME%/jre/bin” into "PATH". Make sure 'where java' is the path you've set with Oracle JDK. This is very IMPORTANT. The version 1.6.x is preferred.

Note: The Android APK maker works much slower on Windows than Linux and Mac because it takes a so long time to search executives on Windows.

##### Example Usage
TBD

### Debug Your Web App
Crosswalk also enables remote debugging to a separate instance of a Chrome browser.

 * Step 1: Install Google's Chrome browser from www.google.com/chrome/‎,
 * Step 2: Launch Crosswalk with remote debugging option `xwalk.exe --remote-debugging-port=9222 index.html`
 * Step 3: Open `localhost:9222` in the Chrome browser, and you will see the inspectable pages in Chrome tab.
 * Step 4: Click the inspectable page to open the Web Inspector UI to start debugging.

### Known Issues
 * Network proxy set by environment doesn't take effect on Linux. Instead, you have to set the system wide network proxy.
 * Cannot play HTML5 video. It is because the ffmpeg library is not included in the Crosswalk binaries. Set Tips#1 for using ffmpeg to play HTML5 video in Crosswalk.
 * CSS3D and WebGL can not work on Windows if DirectX End-User Runtime is not installed on your system. Go to [here](http://www.microsoft.com/en-us/download/details.aspx?id=8109) to install DirectX End-User Runtime on your system.

### Tips
 1. How to enable multimedia in Crosswalk binary release?
 
 See [Enable Multimedia in Crosswalk](Enable-MultiMedia-in-Crosswalk)

 1. How to debug Javascript code in window.onload?

 Launch `xwalk.exe` with `--remote-debugging-port=9222`, and open `localhost:9222` in Chrome browser to start debugging and set breakpoint inside `window.onload` body, press `F5` in Chrome to refresh the Web inspector page. As expected, your app will be paused at the breakpoint you set.

 1. How to specify the app icon?
 
 You can use `--app-icon` command line option or use favicon metatag inside `<head>` tag:
`<head>
 <link rel="icon" href="48x48.png">
 </head>`