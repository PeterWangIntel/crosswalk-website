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
 |  `-[ ] Git GUI Here
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
1. Download Android SDK - http://developer.android.com/sdk/index.html#download. Save the zip 
1. Unzipped the contents into %HOMEPATH%/android
1. Add Android's **platform-tools** and **tools** to your PATH:
```bash
set PATH=%PATH%;%HOMEPATH%\android\sdk\platform-tools
set PATH=%PATH%;%HOMEPATH%\android\sdk\tools
```

1. Run the SDK Manager.
```bash
cd %HOMEPATH%\android
"SDK Manager.exe"
```

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


