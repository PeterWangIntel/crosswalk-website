## Setting up a Windows environment to build Crosswalk enabled Android applications.

In this tutorial we walk you through setting up a Windows host environment to build Crosswalk enabled Android applications. Development and testing is going to be performed using the hardware accelerated Android emulator on the host system. If you have an x86 based Android device, you can skip the emulator setup and use your target device instead.

### Install the GIT tools
The easiest way to perform a lot of these routines is inside the git bash environment. This tutorial will use various commands provided by that package, allowing you to copy/paste the commands from this tutorial straight to your command console.

You can find the git-scm tools on their website: http://git-scm.com/download/win

During the installation, select to add the utilities to your path.
[ image of utilities selection ]

### The command line

Most of these steps are performed via the command line. To launch a command line session, go to your start menu and select 'Run' and type the command "cmd".

[ image command line ]

### Installing the Android SDK

Regardless of the target environment, you need the Android SDK.

1. Download Android SDK - http://developer.android.com/sdk/index.html#download
1. Unzipped the contents into %HOMEPATH%/android
1. Add Android tools to your PATH:
```sh
set PATH=%PATH%;%HOMEPATH%\android\sdk\platform-tools;%HOMEPATH%\android\sdk\tools
```
1. Run the SDK Manager. 
cd %HOMEPATH%\android
"SDK Manager.exe"

4> You need to install:
Android 4.3 (API 18) => Intel x86 Atom System Image
Extras => Intel x86 Emulator Accelerator (HAXM)
Extras => Google USB Driver

5> Install HAXM
cd %HOMEPATH%\android\sdk\extras\Hardware_Accelerated_Execution_Manager
IntelHaxm.exe

NOTE: The path may change where it places the IntelHaxm installation program. To find it:
cd %HOMEPATH%\android
dir /s IntelHaxm.exe

5> Create a new emulator image using the AVD Manager:
android avd

For these instructions, call it Tablet. Select Intel Atom (x86) for CPU/ABI.

6> Launch the emulator
emulator -avd Tablet

4> adv devices
You should see your emulator listed.

You are now ready to install Crosswalk!

Almost. You need git, python, the Oracle JDK, and ant.

2> Install Python 2.7.x (don't install 3.x as some of the scripts do not support newer 3.x syntax)
http://www.python.org/getit

For the rest of the instructions, it is assumed you install Python into %HOMEPATH%\Python27\

3> Install the Oracle JDK.
http://www.oracle.com/technetwork/java/javase/downloads/index.html
http://download.oracle.com/otn-pub/java/jdk/7u40-b43/jdk-7u40-windows-x64.exe

Add the JDK to the *START* of your path.  If you accepted the default locations for the JDK to install:
export PATH=/c/Program\ Files/Java/jdk1.7.0_40/jre7/bin:/c/Program\ Files/Java/jdk1.7.0_40/bin:${PATH}

4> Install ant. If you haven't done this, we'll do it in a git bash session:
"C:\Program Files (x86)\Git\bin\sh.exe" --login -i
curl http://apache.spinellicreations.com//ant/binaries/apache-ant-1.9.2-bin.zip -o apache-ant-1.9.2-bin.zip
unzip apache-ant-1.9.2-bin -x '*/manual/*'
export PATH=${PATH}:${PWD}/apache-ant-1.9.2/bin


1> Launch a git bash session. We'll be doing the rest of his within that bash session.
set PATH=%PATH%;/Path/To/Python27/
"C:\Program Files (x86)\Git\bin\sh.exe" --login -i

1> Download the latest Crosswalk for Android release: http://crosswalk-project/#documentation/downloads
cd $HOMEPATH
curl https://download.01.org/crosswalk/releases/android/canary/crosswalk-1.29.5.0.zip -o crosswalk-1.29.5.0.zip

2> Uncompress the ZIP
unzip crosswalk-1.29.5.0.zip

3> Install Crosswalk to your device:
adb install ${HOMEPATH}/crosswalk-1.29.5.0/apks/XWalkRuntimeLib.apk 

You are now ready to build a Crosswalk application!
1> curl https://download.01.org/crosswalk/releases/crosswalk-samples-0.1.tgz -o crosswalk-samples-0.1.tgz
2> tar xvf crosswalk-samples-0.1.tgz
3> cd crosswalk-1.29.5.0
4> tar xvf xwalk_app_template.tgz
5> cd xwalk_app_template
FAIL! You need Linux. Sigh.


