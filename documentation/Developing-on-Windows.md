## Setting up a Windows environment to build Crosswalk enabled Android applications.

This tutorial goes over the steps for setting up a Windows host environment to build Crosswalk enabled Android applications. Development and testing of the Crosswalk application will be done using the hardware accelerated Android emulator on the host system. If you have an x86 based Android device, you can skip the emulator setup and use your target device instead.

### Install the GIT tools
This tutorial will use various commands provided by the git-scm tool package. Each step is written out in a way that lets you copy and paste them directly into your terminal window.

You can find the git-scm tools here:

http://git-scm.com/download/win

While installing git-scm, select the following options:

<!--img style='float:left' src='assets/integrate.png'-->
```
[x] Windows Explorer integration
 |-(o)Simple context menu (Registry based)
 |  |-[x] Git Bash Here
 |   -[ ] Git GUI Here
 ...
```

Then select Run Git from the Windows Command Prompt:
```
(o) Run Git From the Windows Command Prompt
```
<!--img style='float:left' src='assets/path.png'-->
The rest of the options are recommended to use the defaults.

Once the installation is complete, start a git-bash session by going to your home directory: 

<!--img style='float:left' src='assets/launch.png'-->
Start => type **%HOMEPATH** and press ENTER. 

<!--img style='float:left' src='assets/gitbash.png'-->
Windows will display a file explorer window open to your home directory. Right click on that window and select **Git Bash Here**.

You will then be presented with a git-bash command shell. The prompt will be the dollar sign (**$**). To ensure you are in the correct directory, change to your home:
```bash
cd ~
```

### Installing the Android SDK
1. Download Android SDK - http://developer.android.com/sdk/index.html#download..
1. Extract the contents into %HOMEPATH%/android
1. Add Android's **platform-tools** and **tools** to your PATH within the git-bash session:
```bash
export PATH=${PATH}:${HOMEPATH}/android/sdk/platform-tools
export PATH=${PATH}:${HOMEPATH}/android/sdk/tools
```

1. Run the SDK Manager.
```bash
cd ${HOMEPATH}/android
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
cd ${HOMEPATH}/android/sdk/extras/Hardware_Accelerated_Execution_Manager
IntelHaxm.exe
```
**NOTE:** The path may change where it places the IntelHaxm installation program. To find it:
```bash
cd ${HOMEPATH}/android
find . -iname intelhaxm.exe
```

1. Create a new emulator image using the AVD Manager:
```bash
cd ${HOMEPATH}/android
sdk/"AVD Manager.exe"
```
<!--img style='float:left' src='assets/emulator.png'-->
For these instructions, we call the image Tablet. Select Intel Atom (x86) for CPU/ABI.

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

For the rest of the instructions, it is assumed you install Python into %HOMEPATH%\Python27\

### Install the Oracle JDK
Download the Oracle JDK from:
http://www.oracle.com/technetwork/java/javase/downloads/index.html

Make a note of the path where you install. If you accept the defaults, it will install to **C:\Program Files\Java\jdk1.7.0_40**.

You will need to add the JDK's **jre/bin** and **bin** directories to your path:
```bash
export PATH=/c/Program\ Files/Java/jdk1.7.0_40/jre7/bin:/c/Program\ Files/Java/jdk1.7.0_40/bin:${PATH}
```

### Install ANT
We will install ant within the git-bash shell using the following commands, which will download the binary distribution and decompress it to ${HOMEPATH}, and add it to the PATH:
```bash
curl http://apache.spinellicreations.com//ant/binaries/apache-ant-1.9.2-bin.zip -o apache-ant-1.9.2-bin.zip
unzip apache-ant-1.9.2-bin -x '*/manual/*'
export PATH=${PATH}:${PWD}/apache-ant-1.9.2/bin
```

### Install the Crosswalk for Android packages
The following steps will download the latest Crosswalk for Android release from http://crosswalk-project/#documentation/downloads and unzip it in ${HOMEPATH}:
```bash
cd ${HOMEPATH}
curl https://download.01.org/crosswalk/releases/android/canary/crosswalk-1.29.5.0.zip -o crosswalk-1.29.5.0.zip
unzip crosswalk-1.29.5.0.zip
```

To install the Crosswalk runtime onto your device, use the **adb install** command:
```bash
adb install -r ${HOMEPATH}/crosswalk-1.29.5.0/apks/XWalkRuntimeLib.apk 
```
Passing **-r** will re-install the Crosswalk runtime (if you already have a version installed on your device.)

At this point, if you go to your Android system settings, you should see XWalkRuntimeLib listed in the set of installed applications.

### Building a Crosswalk enabled Android application
You are now ready to build a Crosswalk application!
```bash
curl https://download.01.org/crosswalk/releases/crosswalk-samples-0.1.tgz -o crosswalk-samples-0.1.tgz
tar xvf crosswalk-samples-0.1.tgz
cd crosswalk-1.29.5.0
tar xvf xwalk_app_template.tgz
cd xwalk_app_template
python make_apk.py --package=com.sample.webgl --name=WebGL --app-root=../../samples/webgl --app-local-path=index.html
```
And then you can install and run it on your device:
```bash
adb install WebGL.apk
```