The intention of this page is to act as a replacement for the content of "Getting Started" on the main website. The *page* section would replace the top level "Getting Started" page; the *subpage* sections would sit underneath the "Getting Started" heading.

The aim is to cover both Linux and Windows hosts, and Android and Tizen targets.

One issue at the moment is that there's very little room to manoeuvre in the navigation, as you can only have one top level page, with subpages (page &gt; subpage); ideally, I would like to have a structure which allows page &gt; subpage &gt; subsubpage, so I could isolate the OS-specific pieces better.

I'm posting this draft here for comments.

*******
# Getting started with Crosswalk (page)

This tutorial covers:

*   How to set up the tools needed to deploy Crosswalk applications, on Linux or Windows.
*   How to deploy simple HTML5 applications using stable releases of Crosswalk. The versions used for this tutorial are:
    *   Crosswalk Android for x86, version ${XWALK-STABLE-ANDROID-X86}
    *   Crosswalk Tizen for x86, version ${XWALK-STABLE-TIZEN-X86}

This tutorial doesn't cover:

*   How to write HTML5 applications. We use the simplest possible HTML5 application for this tutorial, so we can focus on the packaging and deployment aspects of Crosswalk.
*   How to use Crosswalk-specific APIs. The code in the tutorial should run perfectly well on any modern web browser, as well as on Crosswalk.
*   How to write [Crosswalk extensions](#wiki/Crosswalk-Extensions). This will be covered in other tutorials.
*   How to compile Crosswalk itself. This is covered in the [Contribute](#contribute) section.

You will need to be comfortable using a command line to follow this tutorial.

By the end of the tutorial, you should understand the workflow for creating Crosswalk applications from your own HTML5 projects.

*******
# Setting up your development host (subpage)

What you need to set up depends on two things:

1.  **Host platform**

    This is the operating system you're using for development. You will need the [core dev tools](#Installing-the-dev-tools) for your chosen platform.

    Your choice of host platform depends on the targets you wish to deploy to:

    *   *For Crosswalk Android*, Linux and Windows are officially supported as host platforms. However, it may be possible to build Crosswalk apps on other platforms which support the Android SDK and Python (e.g. Mac).

    *   *For Crosswalk Tizen*, you need to use a platform which can run the [`sdb`](https://developer.tizen.org/documentation/articles/smart-development-bridge) tool. `sdb` is officially supported on platforms where the [Tizen SDK](https://developer.tizen.org/downloads/tizen-sdk) is available, i.e. Ubuntu Linux, Windows, and Mac OS X.

        However, `sdb` is the only tool you really need from the Tizen SDK for Crosswalk development, and is relatively simple to build from source. So other platforms may be used with a little effort.

        Note that (at the moment) you have to manually install and run Crosswalk applications on Tizen, as there are no stable packaging tools.

2.  **Target platforms**

    These are the devices or emulators you want to develop for and deploy to. Android and Tizen, on both ARM and x86 architectures, are the supported targets. These can be either real devices (e.g. phones, tablets) or emulated ones.

    You will need to install [target-specific tools](#Installing-target-specific-tools) for each target platform.

## Installing the dev tools

The steps for installing the dev tools are:

1.  Install utilities (curl, unzip, tar, gzip; used to install other tools):
    *   [Linux]
    *   [Windows]
2.  Create a directory for other dev tools.
3.  Install Python 2.7 (**note that you need version 2.7.* of Python, as the Crosswalk scripts are not compatible with Python 3**):
    *   [Linux]
    *   [Windows]
3.  Install the Oracle Java Development Kit (JDK). **Note: It is important that you use the Oracle JDK, rather than the OpenJDK, as Ant may not work correctly with the latter.**
4.  Install Apache Ant.
5.  Configure your environment.
6.  Check your environment.

The instructions below explain how to set up the required dev tools on the following host platforms:

*   Fedora Linux 17. (If you are using a different flavour of Linux, the package names may vary slightly.)
*   Windows Enterprise 7

On both host platforms, a bash shell is used as the main installation environment. This is readily available on Linux (look for *Terminal* in the list of applications); or can be installed easily on Windows (see [installing utilities on Windows](#Install-OS-specific utilities-Windows));

### Install utilities (Linux)

The utilities can be installed from a bash shell with this command:

```
$ sudo yum install curl unzip tar
```

### Install utilities (Windows)

Bash is provided as part of the git download for Windows. In addition to bash, git for Windows also provides curl, tar, unzip, and gzip, which are used in later steps.

Download and install git for Windows from the git-scm website:
<a href='http://git-scm.com/download/win' target='_blank'>http://git-scm.com/download/win</a>

While installing git, select the following options:

<img src='wiki/assets/integrate.png'>

Then select *Run Git from the Windows command prompt*:

<img src='wiki/assets/path.png'>

You can now open a Git Bash session by going to your Start Menu and typing **Git Bash** to find the command:

<img src='wiki/assets/launch.png'>

Select *Git Bash* to open a console window running the bash shell.

### Create a directory for other dev tools

From a bash shell:

```
$ mkdir ~/xwalk-tools
$ cd ~/xwalk-tools
```

### Installing Python 2.7 (Linux)

This can be installed via your package manager. For example, on Fedora Linux:

```
$ sudo yum install python
```

This installs Python globally, so any user can run it.

### Installing Python 2.7 (Windows)

Install Python 2.7.x. You can get it from http://www.python.org/getit. Look for the latest 2.7.x release for Windows, and choose an "MSI installer" for your architecture (32 or 64 bit).

When the installer starts, choose *Install for all users* and set **C:\Python27** as the installation location. You will need to manually add the Python directory to your path for it to be available in the bash shell (see [Configuring your environment](#Configuring-your-environment)).

### Installing the Oracle JDK

The Oracle JDK has to be downloaded manually (you must accept a licence agreement):

1.  Go to the Oracle Java 7 SE JDK download page in a browser:

    http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html

2.  Accept the licence agreement.

3.  In the section headed *Java SE Development Kit*, choose the appropriate archive file for your platform. Save it to your `~/xwalk-tools` directory.

4.  Once downloaded:

    <ul>

    <li>On Linux, unpack the tarball and symlink it:

    ```
    $ cd ~/xwalk-tools/
    $ tar zxvf <jdk file>.tar.gz
    $ ln -s <jdk directory> jdk7
    ```
    </li>

    <li>On Windows, run the Java `.exe` installer, and set `C:\jdk7` as the installation directory.</li>

    </ul>

### Installing Ant

The instructions are the same for Linux and Windows. From a bash shell:

```
$ cd ~/xwalk-tools
$ curl http://www.apache.org/dist/ant/binaries/apache-ant-1.9.3-bin.zip \
    -o ant.zip
$ unzip ant.zip
```

### Configuring your environment

The next step is to set up your environment so that binaries and scripts which were installed manually (ant, JDK, Python on Windows) are on your `PATH`. The easiest way to do this is to edit your `~/.bashrc` file, adding these lines at the end (create the file if it doesn't exist):

```
# note that we prepend the new paths to the
# PATH variable to ensure that we use scripts and binaries
# from our newly-installed packages
export PATH=~/xwalk-tools/apache-ant-1.9.3/bin:$PATH

# on Windows, you need to add the Python install directory
# and the JDK bin directory
export PATH=/c/jdk7/bin:$PATH
export PATH=/c/Python27/:$PATH

# on Linux, you just need the JDK bin directory as Python is
# installed globally
export PATH=~/xwalk-tools/jdk7/bin:$PATH
```

You should also set the `JAVA_HOME` environment variable to the path of the JDK installation (ant uses this to choose the java binary to invoke):

```
# Windows
export JAVA_HOME=/c/jdk7

# OR

# Linux
export JAVA_HOME=~/xwalk-tools/jdk7/
```

To activate these changes in your current bash shell:

```
$ source ~/.bashrc
```

When you start a bash shell in future, your `.bashrc` file will automatically be used to set `PATH` and `JAVA_HOME`.

### Verifying your environment

Check that you have installed the tools properly by trying these commands from a bash shell:

```
$ java -version
java version "1.7.0_45"
Java(TM) SE Runtime Environment (build 1.7.0_45-b18)
Java HotSpot(TM) 64-Bit Server VM (build 24.45-b08, mixed mode)

$ ant -version
Apache Ant(TM) version 1.9.3 compiled on December 23 2013

$ python --version
Python 2.7.6
```

### Tips for Java on Linux

If you are on Linux and your version of java returns something like this:

```
java version "1.7.0_25"
OpenJDK Runtime Environment (fedora-2.3.12.1.fc17-x86_64)
OpenJDK 64-Bit Server VM (build 23.7-b01, mixed mode)
```

then you may also need to append an alias to the bottom of your `~/.bashrc` file to ensure that the correct java binary is being used:

```
alias java="~/xwalk-tools/jdk7/bin/java"
```

### Tips for ant

When you run ant, if you see something like this:

    Unable to locate tools.jar.
    Expected to find it in c:\Program Files (x86)\Java\jre7\lib\tools.jar

it may mean that ant is using a Java Runtime Environment (JRE) version of Java, rather than the full JDK. This can be resolved by setting an alias for java in your `.bashrc` file, pointing at your JDK install:

```
alias java="/c/jdk7/bin/java"
```

## Installing target-specific tools

These are optional tools, installed on the host to support the targets you intend to deploy to:

*   **Android targets**

    To deploy to Android targets, you need:

    *   *Crosswalk for Android:* This includes utilities for generating Crosswalk Android packages for installation on Android targets.

    *   *Android SDK:* This includes generic tools for creating Android packages, as well as the `adb` tool, for installing those packages on Android targets.

*   **Tizen targets**

    To deploy to Tizen targets, you need:

    *   *Tizen SDK:* This includes the [`sdb`](https://developer.tizen.org/documentation/articles/smart-development-bridge) tool for communicating with Tizen targets, which enables you to install the Crosswalk runtime on a target and run Tizen applications from the shell.

### Optional: installing tools for Android targets

These tools are only required if you intend to deploy Crosswalk applications to Android targets.

#### Install the Android SDK

1.  Download the Android SDK from <a href='http://developer.android.com/sdk/index.html' target='_blank'>http://developer.android.com/sdk/index.html</a>
2.  Extract the file into `~/xwalk-tools/android-sdk`.
3.  Run the *SDK Manager*. You can do this from a bash shell as follows:

    ```
    # on Windows
    $ cd ~/xwalk-tools/android-sdk
    $ "SDK Manager.exe"

    # on Linux
    $ cd ~/xwalk-tools/android-sdk/tools
    $ ./android
    ```
4.  In the SDK Manager window, select the following items from the list:

    ```
    [ ] Tools
      [x] Android SDK Platform-tools 19.0.1
      [x] Android SDK Build tools 18.0.1
    [ ] Android 4.3 (API 18)
      [x] SDK Platform
    ```

5.  Add the `tools` and `platform-tools` directories to your `PATH` by appending these lines to `~/.bashrc`:

    ```
    export PATH=~/xwalk-tools/android-sdk/tools:$PATH
    export PATH=~/xwalk-tools/android-sdk/platform-tools:$PATH
    ```

    Read in `~/.bashrc` for your changes to take in the current shell:

    ```
    $ source ~/.bashrc
    ```

6.  Test the installation:

    ```
    $ adb help
    Android Debug Bridge version 1.0.31
    ...
    ```

#### Download the Crosswalk Android app template

The Crosswalk Android distribution contains an application template which can be used as a wrapper for an HTML5 application. It also includes a script which will convert a wrapped HTML5 application into an installable Android package (`.apk` file).

To get Crosswalk Android for x86, run these commands in a bash shell:

```
$ cd ~/xwalk-tools/

# the `-k` option prevents curl from failing due to SSL
# certificate verification errors.
$ curl -k https://download.01.org/crosswalk/releases/android-x86/stable/crosswalk-${XWALK-STABLE-ANDROID-X86}-x86.zip -o crosswalk-${XWALK-STABLE-ANDROID-X86}-x86.zip

# unzip the Crosswalk Android archive
$ unzip crosswalk-${XWALK-STABLE-ANDROID-X86}-x86.zip

# unpack the xwalk app template archive inside it
$ tar zxf crosswalk-${XWALK-STABLE-ANDROID-X86}-x86/xwalk_app_template.tar.gz -C crosswalk-${XWALK-STABLE-ANDROID-X86}-x86
```

You should now have a `~/xwalk-tools/crosswalk-${XWALK-STABLE-ANDROID-X86}-x86` directory with an `xwalk_app_template` directory inside it.

### Optional: installing tools for Tizen targets

If you intend to deploy Crosswalk applications to Tizen targets, you only need to install the Tizen SDK: there are no Crosswalk packaging tools for Tizen yet.

However, this does mean that the Crosswalk runtime for Tizen must be manually installed on each target (see ???).

1.  Download the Tizen SDK for your platform from <a href="https://developer.tizen.org/downloads/tizen-sdk" target="_blank">https://developer.tizen.org/downloads/tizen-sdk</a>.

2.  [Following the instructions](https://developer.tizen.org/downloads/sdk/installing-tizen-sdk) to install it.

3.  Once installed, you need to ensure that the `sdb` tool is on your `PATH` by adding this line to `~/.bashrc`:

    ```
    # assuming the Tizen SDK is installed in /c/tizen-sdk (on Windows)
    export PATH=/c/tizen-sdk/tools/:$PATH
    ```

    Read `~/.bashrc` to update `~/.bashrc`:

    ```
    source ~/.bashrc
    ```

4.  Test `sdb` from a bash shell:

    ```
    $ sdb
    Smart Development Bridge version 2.0.2
    ...
    ```

*******
# Setting up target devices (subpage)

TODO

## Android

TODO

which Android versions do we support?

### Android device

TODO

### Android emulator

TODO

4.  In the SDK Manager window, check the following boxes in the list:

    ```
    [ ] Android 4.3 (API 18)
        [x] Intel x86 Atom System Image
    ```

    On Windows, install HAXM as well:

    ```
    [ ] Extras
        [x] Intel x86 Emulator Accelerator (HAXM)
    ```

## Tizen

To run Crosswalk applications on Tizen, you must install the Crosswalk runtime on each target. (Unlike Crosswalk for Android, it is currently not possible to bundle the Crosswalk runtime with the application when deploying to Tizen.)

Tizen extensions for Crosswalk are also available, which enable you to make use of Tizen APIs in applications running in Crosswalk on Tizen. We don't need them for this tutorial, so we won't cover them here.

TODO Tizen versions

### Tizen device

TODO

### Tizen emulator

TODO

*******
# Building an application (subpage)

TODO

## Android

TODO

## Tizen

TODO - not sure there are any "build" steps yet

basically copy it to the device right now

*******
# Running an application (subpage)

see edit

## Android

TODO should be in the application list

## Tizen

TODO start from command line