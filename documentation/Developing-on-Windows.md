## Building Crosswalk enabled Android applications

This tutorial goes over the steps for setting up a Windows host environment to build Crosswalk enabled Android applications. 

It will walk you through the following:

* **Install the GIT SCM tools** - used as a command shell interpreter and for access to utilities like unzip, tar, and gzip.
* **Install the Android SDK** - necessary for building Android applications. Also provides a hardware accelerated Android 
emulator.
* **Install Oracle JDK** - necessary for building Anrdoid applications.
* **Install Python27** - necessary to build Crosswalk enabled Android applications.
* **Install Apache ANT** - necessary to build Crosswalk enabled Android applications.
* **Download the Crosswalk packages**
* **Build a Crosswalk sample application**

### Install the GIT tools
The steps on this page use various commands provided by the git-scm tool package. Each step is written out in a way that lets you copy and paste them directly into your terminal window.

You can find the git-scm tools here: http://git-scm.com/download/win

While installing git-scm, select the following options:

<img src='wiki/assets/integrate.png'><br>

Then select Run Git from the Windows Command Prompt:

<img src='wiki/assets/path.png'><br>
The rest of the options are recommended to use the defaults.

To simplify installation and usage, you will want to add various directories to your PATH when you enter the git-bash session. To do this, open notepad, paste the following, and save it as **%USERPROFILE%\.bashrc**:
```bash
export PATH=${PATH}:${USERPROFILE}/android/sdk/platform-tools
export PATH=${PATH}:${USERPROFILE}/android/sdk/tools
export PATH=${PATH}:${USERPROFILE}/Python27
export PATH="C:/Program\ Files/Java/jdk1.7.0_40/jre/bin":${PATH}
export PATH="C:/Program\ Files/Java/jdk1.7.0_40/bin":${PATH}
export PATH=${PATH}:${USERPROFILE}/apache-ant-1.9.2/bin 
```

**NOTE:** If you already have the Android SDK, Python27, Apache ANT, or the JDK installed on your system, adjust the above path 
variables appropriately for your system configuration.

Finally, open a Git Bash session by going to your Start Menu and typing in **git bash** and select Git Bash.

<img src='wiki/assets/launch.png'><br>

You will then be presented with a Git Bash command shell. The prompt will be the dollar sign. To ensure you are in the correct directory, change to your home:
```bash
cd ~
```

### Installing the Android SDK
In all of the following steps, it is assumed that interaction is performed within a Git Bash shell. 

1. Download Android SDK - http://developer.android.com/sdk/index.html#download..
1. Extract the contents into %USERPROFILE%/android
1. Android's **platform-tools** and **tools** directories were added to the Git Bash session's PATH file while installing the Git SCM tools.

1. Run the SDK Manager.
```bash
cd ${USERPROFILE}/android
"SDK Manager.exe"
```
1. Within the SDK Manager you need to install:
```
[ ] Android 4.3 (API 18)
    [x] Intel x86 Atom System Image
...
[ ] Extras
    [x] Intel x86 Emulator Accelerator (HAXM)
```
1. Click **Install packages...**

#### OPTIONAL: Emulator Setup
1. Install HAXM. The Android SDK Manager will download the HAXM installer, however it does not install it.
```bash
cd ${USERPROFILE}/android/sdk/extras/Hardware_Accelerated_Execution_Manager
IntelHaxm.exe
```
**NOTE:** The path may change where it places the IntelHaxm installation program. To find it:
```bash
cd ${USERPROFILE}/android
find . -iname intelhaxm.exe
```

1. Create a new emulator image using the AVD Manager:
```bash
cd ${USERPROFILE}/android
sdk/"AVD Manager.exe"
```

For these instructions, we call the image Tablet. Select **Intel Atom (x86)** for CPU/ABI and **Use Host GPU**:

<img src='wiki/assets/emulator.png'><br>

1. Launch the emulator
```bash
emulator -avd Tablet
```

1. Once the emulator has loaded, you can use the adb comment to connect to the emulator:
```bash
adb devices
```
Which should output something similar to the following:
```
List of devices attached
emulator-5554   device
```

### Install Python
Install Python 2.7.x (don't install 3.x as some of the scripts do not support newer 3.x syntax)
http://www.python.org/getit

For the rest of the instructions, it is assumed you install Python into the default location **C:\Python27\**.

### Install the Oracle JDK
Download the Oracle JDK from:
http://www.oracle.com/technetwork/java/javase/downloads/index.html

Make a note of the path where you install. If you accept the defaults, it will install to **C:\Program Files\Java\jdk1.7.0_40**.

The JDK's  **jre/bin** and **bin** directories were added to the Git Bash session's PATH file while installing the Git SCM tools.

### Install ANT
We will install ant within the git-bash shell using the following commands, which will download the binary distribution and decompress it to ${USERPROFILE}, and add it to the PATH:
```bash
curl http://apache.spinellicreations.com//ant/binaries/apache-ant-1.9.2-bin.zip -o apache-ant-1.9.2-bin.zip
unzip apache-ant-1.9.2-bin -x '*/manual/*'
```

The Apache ANT **bin** directory was added to the Git Bash session's PATH file while installing the Git SCM tools.

### Install the Crosswalk for Android packages
The following steps will download the latest Crosswalk for Android release from http://crosswalk-project/#documentation/downloads and unzip it in ${USERPROFILE}:
```bash
cd ${USERPROFILE}
curl https://download.01.org/crosswalk/releases/android/beta/crosswalk-1.29.4.1.zip -o crosswalk-1.29.4.1.zip
unzip crosswalk-1.29.4.1.zip
```

To install the Crosswalk runtime onto your device, use the **adb install** command:
```bash
adb install -r ${USERPROFILE}/crosswalk-1.29.4.1/apks/XWalkRuntimeLib.apk 
```
Passing **-r** will re-install the Crosswalk runtime (if you already have a version installed on your device.)

At this point, if you go to your Android system settings, you should see XWalkRuntimeLib listed in the set of installed applications.

### Building a Crosswalk enabled Android application
You are now ready to build a Crosswalk application!

The following steps will download the **crosswalk-samples** source package, decompress it, and then build a Crosswalk enabled 
Android application hosting the WebGL sample.
```bash
curl https://download.01.org/crosswalk/releases/crosswalk-samples-0.1.tgz -o crosswalk-samples-0.1.tgz
tar xvf crosswalk-samples-0.1.tgz
cd crosswalk-1.29.4.1
tar xvf xwalk_app_template.tgz
cd xwalk_app_template
python make_apk.py --package=com.sample.webgl --name=WebGL --app-root=../../samples/webgl --app-local-path=index.html
```
You can install the WebGL sample on your device using **adb install**:

```bash
adb install WebGL.apk
```

The WebGL sample will now be in your application listing:

<img src='wiki/assets/android-apps.png'><br>

After launching WebGL, you should see the following application:

<img src='wiki/assets/android-webgl.png'><br>



