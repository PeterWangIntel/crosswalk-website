# Writing extensions for Tizen IVI on x86

This tutorial explains how to write a simple "echo" extension for Crosswalk running on [Tizen IVI](https://wiki.tizen.org/wiki/IVI).

Writing a Crosswalk extension for Tizen enables you to access native platform capabilities which are otherwise inaccessible via standard web APIs. You can also use an extension to utilise existing C/C++ libraries from a web application where no JavaScript equivalents are available.

The extension you'll write in this tutorial accepts an input and returns that input prefixed with "You said: ". It will be used from JavaScript code (in a HTML5 web application) like this:

    var response = echo.echoSync('hello');
    // response == 'You said: hello'

    echo.echoAsync('hello', function (response) {
      // response == 'You said: hello'
    });

The extension is implemented in C (though it's possible to write extensions in C++ as well). It is trivial and could easily be implemented using pure JavaScript. However, the aim is to reduce the complexity of the extension so you can focus on code structure and workflow.

As far as tooling goes, you'll use the Tizen SDK command line tools to compile the extension, and simple text editors to write the code. It is possible to use the Tizen SDK IDE to build Tizen applications; but using command line tools and a text editor exposes the internals of the extension more clearly.

**By the end of this tutorial**, you will understand the basics of writing a C extension for Crosswalk running on Tizen IVI.

# Preparation

The host should first be [setup for Crosswalk development](#documentation/getting_started/host_setup); in particular, you need to install the Tizen SDK. Then there are a couple of additional steps to enable you to compile native code for Tizen, described below.

**Note:** these steps are only necessary if you are writing Crosswalk Tizen extensions: they are not required if you are writing Crosswalk Android extensions, or just using Crosswalk as a runtime for a web app.

## Install a Tizen IVI image

First, get hold of a Tizen IVI emulator image (there are no physical Tizen IVI devices at present). To do this:

1.  [Install the Tizen SDK](#documentation/getting_started/host_setup/Optional:-installing-tools-for-Tizen-targets).

2.  Follow [these instructions](#documentation/getting_started/tizen_target_setup/Tizen-emulator) to set up the Tizen SDK emulator. Then start the Tizen SDK Install Manager.

3.  Use the Install Manager to set up the Tizen SDK for the "latest" channel, which contains the IVI image. You need to do this because the IVI image is not part of the stable SDK (as of 2014-03-03).

    To do this, open the Install Manager, then click the *Advanced* button. Follow the instructions at https://wiki.tizen.org/wiki/Tizen_IVI_SDK to enable the "latest" channel.

    Select *OK* to go back to the main Install Manager screen.

4.  Once configured, select *Next* to go to the component selection screen. Select the components you need:

        [ ] Native App Development
          [x] Toolchain
          [x] Native IDE
          [x] Command Line tools
            [x] Toolchain
            [x] Native IDE Core Resources
            [x] Native Rootstrap
        [x] Common Tools
          [x] x86 Emulator
        [ ] Platforms
          [x] IVI 3.0
            [x] x86 Platform Image
            [x] Web IDE Core Resources for IVI profile

    Even if you don't intend to use the Web IDE, the Emulator Manager will not run correctly without the *Web IDE Core Resources for IVI profile* component.

## Create a Tizen IVI virtual machine (VM)

You can now create an IVI image:

1.  Open the Tizen Emulator Manager. [These instructions](#documentation/getting_started/tizen_target_setup/Tizen-emulator) explain how to do this.

2.  In the *ivi-3.0* tab, select *Add New* to create a new virtual machine.

3.  In the *Detail* panel (on the right), set *Name* to **tizen-IVI** and *Base Image* to **emulimg-3.0.x86**. Accept the defaults for the remaining fields and click on *Confirm*.

    The result should look like this:

    ![Tizen emulator manager for Tizen IVI](assets/tizen-emulator-manager-tizen-ivi.png)

4.  Start the Tizen IVI VM using the blue "play" button. It can take a while to start, so don't be alarmed if nothing seems to be happening.

5.  From a command line, you can check whether the VM has booted with this command:

        sdb devices

    If the VM is ready, you should get output like this:

        List of devices attached
        emulator-26101          device          tizen-IVI

    If it isn't ready, you will see:

        error msg: target not found

## Install Crosswalk

You can now install Crosswalk:

1.  Once the VM is ready, get a root shell on it with:

        sdb root on
        Switched to `root` account mode

        sdb shell

    The shell prompt should be `#` if you are root. If it isn't, exit, ensure that root mode is on, then try to get a root shell again.

2.  From the shell on the VM, download the Crosswalk package:

        curl -O https://download.01.org/crosswalk/releases/tizen-ivi/canary/crosswalk-5.32.87.0-0.i586.rpm

    And install it:

        rpm -ih crosswalk-5.32.87.0-0.i586.rpm

    I suggest you use Crosswalk for Tizen, version 5.32.87.0: this will install successfully on the Tizen IVI emulator image. The other version I tried (5.34.94.0) wouldn't install. (Note that this is to be expected, as Crosswalk for Tizen IVI is still considered unstable, and some versions may not work.)

3.  Check the installation is working by switching to the `app` user. This user has the correct configuration to be able to run Crosswalk on the device:

        # still as the root user
        su - app

    Then test that Crosswalk can run:

        xwalk

    You should see some messages about [Ozone](https://github.com/01org/ozone-wayland), e.g.:

        [0306/093443:INFO:desktop_factory_wayland.cc(12)] Ozone: DesktopFactoryWayland
        [0306/093443:INFO:desktop_factory_wayland.cc(12)] Ozone: DesktopFactoryWayland

    These indicate that Crosswalk is running correctly on the Tizen IVI virtual machine.

## Configure the Tizen SDK CLI tools

The Tizen SDK includes a set of command line tools for building and packaging Tizen native apps. You can use these tools to build an extension for Crosswalk. Make sure these tools are on your path by editing your `~/.bashrc` file (Windows or Linux):

    export PATH=<TIZEN_SDK_HOME>tools/mingw/bin:$PATH

## Checkout Crosswalk source code

You will need a copy of the Crosswalk source, to enable you to compile against the Crosswalk headers.

Checkout the Crosswalk github repo on the host machine (the machine where you intend to compile your extension):

    git clone https://github.com/crosswalk-project/crosswalk ~/crosswalk-source/xwalk

It's important that you clone the code to a directory called `xwalk`, as this is the path the compiler will be looking on for headers/libraries.

## Create project directories

The project name is **simple**. Set up the directories for the project from a command line as follows:

    mkdir simple
    cd simple

    # directory for metadata about the application
    mkdir meta

    # directory for the HTML5 web app
    mkdir app

    # directory for the Crosswalk extension
    mkdir extension

Now the preparation is complete, you can start writing the application and associated extension.

# Create the application and extension

Although we are creating the application and the extension alongside each other, they are actually two separate pieces: one extension can be used to support multiple applications if desired.

The application itself can also be split into two: the application "proper", containing the HTML, JavaScript, CSS, and other assets; and the metadata describing the application and how it should be installed on the system.

The diagram below shows how these pieces interact:

![Structure of a Crosswalk application with extension](assets/crosswalk-extension-layout.png)

In the sections below, we create the metadata, the application, and the extension.

## Create the metadata

The application metadata consists of platform-specific files which aren't properly part of the application. They are really supporting files, which are used to integrate the application with the environment. Examples might be platform-specific configuration files and icons for different screen resolutions.

A manifest file for an application provides Crosswalk with metadata about that application: for example, which HTML file to load as the entry point, which icon to use for the application, and which permissions the application needs.

For now, this file can be very simple. Create `meta/manifest.json` with this content:

    {
      "name": "simple_extension",
      "description": "simple extension example",
      "version": "1.0.0",
      "app": {
        "launch":{
          "local_path": "index.html"
        }
      }
    }

For more information about what the manifest can contain, see [Crosswalk manifest](#wiki/Crosswalk-manifest).

## Create the web application

This is a standalone HTML5 application which uses the Crosswalk extension. It consists of a single HTML file, `index.html`, in the `app` directory. This file also contains the JavaScript to invoke the extension.

Create this file as `app/index.html`:

    <!DOCTYPE html>
    <html>
    <head>
    <title>Crosswalk extensions demo</title>
    <meta name="viewport" content="width=device-width">
    <style>
    body {
      font-size: 2em;
    }
    </style>
    </head>
    <body>

    <p>This uses the echo extension defined in echo-extension.c (compiled to
    libecho.so) to extend Crosswalk.</p>

    <div id="out"></div>

    <script>
    var div = document.getElementById('out');

    var p1 = document.createElement('p');
    var p2 = document.createElement('p');

    // async call to extension
    echo.echoAsync('hello async echo', function (result) {
      p1.innerText = result;
      div.appendChild(p1);
    });

    // sync call to extension
    p2.innerText = echo.echoSync('hello sync echo');
    div.appendChild(p2);
    </script>
    </body>
    </html>

Note that the `echo` extension is available globally to the application: there's no need to include a script to make use of it.

When the application runs, the extension's API is invoked asynchronously and synchronously (`echo.echoAsync()` and `echoSync()`). The returned responses (with the "You said: " prefixes added) are used to set the text of two paragraphs (`p`) elements.

## Create the Crosswalk extension

The code consists of three parts:

1.  A JavaScript file. This defines the API which applications can invoke from JavaScript code.

2.  A C header file containing a "stringified" version of the JavaScript file. This is used to set the JavaScript API for the extension. This file is generated at build-time, before the C library is compiled.

3.  The C file which implements the native side of the extension. This is compiled into a shared library file `libecho.so`.

    Note that the name is very important: it should begin with a "lib" prefix. Crosswalk will not load the extension correctly if it is called anything else.

### JavaScript bridge API to the C extension

This file wires the C interface to JavaScript and provides the bridge between the HTML5 application and the C code.

Note that it's not essential to maintain the JavaScript in a separate file: you can just add the JavaScript API inline to your C code. However, for purposes of maintainability, it makes sense to maintain the JavaScript API in its own file.

Add a file at `extension/api.js` with this content:

    var echoListener = null;

    extension.setMessageListener(function(msg) {
      if (echoListener instanceof Function) {
        echoListener(msg);
      };
    });

    exports.echoAsync = function (msg, callback) {
      echoListener = callback;
      extension.postMessage(msg);
    };

    exports.echoSync = function (msg) {
      return extension.internal.sendSyncMessage(msg);
    };

This JavaScript file is converted into a C header file at build-time; that header file is then referenced from the extension code. This is the simplest way to incorporate the JavaScript code into the C extension. See the next section for details of how the conversion happens.

#### A note on the JavaScript API

Note that the asynchronous part of this API is *not suitable* for a real production environment.

At the moment, when you invoke the `echoAsync()` method, you set a single global message listener: a function which waits for the next response to be returned by the C part of the extension. However, this approach would not work correctly if the processing which occurred in the extension took some time, and the `echoAsync()` method were invoked during that processing time.

For example, consider the following program:

    var callback1 = function (response) {
      console.log(response + ' world');
    };

    var callback2 = function (response) {
      console.log(response + ' cruel world');
    };

    // 1
    echo.echoAsync('hello', callback1);

    // 2
    echo.echoAsync('goodbye', callback2);

When invocation 1 occurs, the message listener is set to `callback1`. If the extension takes several seconds to respond, invocation 2, which resets the message listener to `callback2`, may have already happened. Consequently, both responses will be handled by `callback2`. Which in turn means you'll see this on the console:

    hello cruel world
    goodbye cruel world

instead of the anticipated:

    hello world
    goodbye cruel world

The solution is to pass a token from the JavaScript API to the C API; then return the same token with the response from the C extension. The JavaScript API maintains a mapping from these tokens to the appropriate callbacks, so when responses are returned, the correct handler can be invoked. The usual way to implement this would be to pass JSON strings between the JavaScript and C pieces of the extension. However, this is a complicated process, and too complex for the scope of this tutorial.

If you're interested in seeing a real world example of how this would be implemented, the [Crosswalk Tizen extensions](https://github.com/crosswalk-project/tizen-extensions-crosswalk) are a good place to start, e.g. [the application API JavaScript file](https://github.com/crosswalk-project/tizen-extensions-crosswalk/blob/master/application/application_api.js).

### C header file for the JavaScript API

The header file, `extension/echo-extension.h`, is a generated file which looks like this:

    static const char* kSource_echo_api = "var echoListener = null;"
    ""
    "extension.setMessageListener(function(msg) {"
    "  if (echoListener instanceof Function) {"
    "    echoListener(msg);"
    "  };"
    "});"
    ""
    "exports.echoAsync = function (msg, callback) {"
    "  echoListener = callback;"
    "  extension.postMessage(msg);"
    "};"
    ""
    "exports.echoSync = function (msg) {"
    "  return extension.internal.sendSyncMessage(msg);"
    "};"
    ;

By including this header file in a C file, you can access the `kSource_echo_api` constant, which defines the JavaScript API for the extension.

Note that this mirrors the JavaScript file created in the previous section, but is generated by a script (in the root directory of the project). Create a file called `js2c.sh` in the root of the **simple** project, with this content:

    #!/bin/sh
    JS=$1
    COUT=$2

    if [ ! $JS -o ! $COUT ] ; then
      echo "Usage $0 <js api file> <output c header file>"
      exit 1
    fi

    echo -n "static const char* kSource_echo_api = " > $COUT
    cat $JS | awk -F\n '{print "\"" $_ "\""}' | tr -d $'\r' >> $COUT
    echo ";" >> $COUT

You should make the script executable once you've created it with:

    chmod +x js2c.sh

Invoke it like this:

    ./js2c.sh <.js file> <output .h file>

While the script can be invoked manually for testing, the aim is to incorporate it into an automated build later.

### C program code

This implements the Crosswalk extension API and has access to the full Tizen native API. For the purposes of this tutorial, the C code simply prefixes a message string with "You said: " and returns it.

Create a file `extension/echo-extension.c` with this content:

    // echo extension for Crosswalk Tizen
    // adapted from
    // https://github.com/crosswalk-project/crosswalk/blob/master/extensions/test/echo_extension.c
    // Copyright (c) 2013 Intel Corporation. All rights reserved.
    // Use of this source code is governed by a BSD-style license that can be
    // found in the LICENSE file.

    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #include "xwalk/extensions/public/XW_Extension.h"
    #include "xwalk/extensions/public/XW_Extension_SyncMessage.h"

    // load kSource_echo_api string to set JavaScript API; echo-extension.h
    // is generated by the makefile at build time
    #include "echo-extension.h"

    static const char* echo_ext_response_prefix = "You said: ";

    static XW_Extension g_extension = 0;
    static const XW_CoreInterface* g_core = NULL;
    static const XW_MessagingInterface* g_messaging = NULL;
    static const XW_Internal_SyncMessagingInterface* g_sync_messaging = NULL;

    static void instance_created(XW_Instance instance) {
      printf("Instance %d created!\n", instance);
    }

    static void instance_destroyed(XW_Instance instance) {
      printf("Instance %d destroyed!\n", instance);
    }

    // add a "You said: " prefix to message
    static char* build_response(const char* message) {
      int length = strlen(echo_ext_response_prefix) + strlen(message);
      char* response = malloc(length);
      strcpy(response, echo_ext_response_prefix);
      strcat(response, message);
      return response;
    }

    static void handle_message(XW_Instance instance, const char* message) {
      char* response = build_response(message);
      g_messaging->PostMessage(instance, response);
      free(response);
    }

    static void handle_sync_message(XW_Instance instance, const char* message) {
      char* response = build_response(message);
      g_sync_messaging->SetSyncReply(instance, response);
      free(response);
    }

    static void shutdown(XW_Extension extension) {
      printf("Shutdown\n");
    }

    // this is the only function which needs to be public
    int32_t XW_Initialize(XW_Extension extension, XW_GetInterface get_interface) {
      // set up the extension
      g_extension = extension;
      g_core = get_interface(XW_CORE_INTERFACE);
      g_core->SetExtensionName(extension, "echo");

      // kSource_echo_api comes from the echo-extension.h header file
      g_core->SetJavaScriptAPI(extension, kSource_echo_api);

      g_core->RegisterInstanceCallbacks(
        extension, instance_created, instance_destroyed);
      g_core->RegisterShutdownCallback(extension, shutdown);

      g_messaging = get_interface(XW_MESSAGING_INTERFACE);
      g_messaging->Register(extension, handle_message);

      g_sync_messaging = get_interface(XW_INTERNAL_SYNC_MESSAGING_INTERFACE);
      g_sync_messaging->Register(extension, handle_sync_message);

      return XW_OK;
    }

Some notes on the code:

*   The only mandatory public function is `XW_Initialize()`, where the work is done to configure the extension.

*   `SetExtensionName()` sets the public name for the JavaScript API which will be available to your web application.

*   `SetJavaScriptAPI()` takes a JavaScript string to be presented as the API. The name you set with `SetExtensionName()` should match the one you use in the JavaScript API string. In the case of this extension, the API string is loaded from a header file which is generated by the build.

*   This example provides sync and async versions of the same handler. But an extension doesn't have to handle both synchronous and asynchronous messages: it can handle only one type if desired.

*   Both the sync (`XW_Internal_SyncMessagingInterface->SetSyncReply()`) and async (`XW_MessagingInterface->PostMessage()`) functions for returning a response "preserve their inputs", so you can free any pointers you pass to those functions once you've invoked them.

## Build the extension

The C compiler is part of the Tizen SDK. The compiler for x86 architecture is:

    <tizen SDK>/tools/i386-linux-gnueabi-gcc-4.5/bin/i386-linux-gnueabi-gcc-4.5.4.exe

The Tizen SDK also provides a *rootstrap*, which contains headers and libraries for compiling your code against. For code you intend to run on the emulator, the rootstrap is located at:

    <tizen SDK>/platforms/mobile-3.0/rootstraps/mobile-3.0-emulator.native

You can use a small `makefile` to invoke the compiler and generate the header file for the JavaScript API. The make file will also contain some conditional code, so that if the `TIZEN_SDK` environment variable is set, the Tizen SDK compiler and rootstrap will be used for compilation.

In the project directory, add a file called `makefile` with this content:

    ifneq ($(strip $(TIZEN_SDK)),)
	    CC=$(TIZEN_SDK)/tools/i386-linux-gnueabi-gcc-4.5/bin/i386-linux-gnueabi-gcc-4.5.4.exe
	    SYSROOT_FLAGS=--sysroot $(TIZEN_SDK)/platforms/mobile-3.0/rootstraps/mobile-3.0-emulator.native
    endif

    ECHO_CFLAGS=$(CFLAGS) -fPIC -Wall

    all: libecho.so
	    cp -a app/* build/app/

    echo-extension.h:
	    ./js2c.sh extension/api.js extension/echo-extension.h

    libecho.so: prepare echo-extension.h
	    $(CC) $(ECHO_CFLAGS) -shared -o build/extension/libecho.so \
	      $(SYSROOT_FLAGS) -I$(XWALK_HEADERS) extension/echo-extension.c

    prepare: check
	    mkdir -p build/app
	    mkdir -p build/extension

    check:
    ifeq ($(strip $(XWALK_HEADERS)),)
	    echo "XWALK_HEADERS must be set"
	    exit 1
    endif

    clean:
	    rm -Rf build

(As with all makefiles, indent using tabs, rather than spaces.)

The `--sysroot` option is set so that the libraries and headers used as the ones included with the Tizen SDK, rather than the host's.

The Tizen SDK provides `make` in `<tizen-sdk>/tools/mingw/bin/make.exe`. You added this to your `PATH` variable at the start of this tutorial. So you can now invoke the above `makefile` from your **simple** project directory. In a bash shell, run:

    TIZEN_SDK=/path/to/tizen-sdk XWALK_HEADERS=/path/to/crosswalk-source make

`/path/to/tizen-sdk` should point at the root directory of your Tizen SDK installation (e.g. `~/tizen-sdk` if you use the default location).

`/path/to/crosswalk-source` should point at the directory *above* the Crosswalk source code; the Crosswalk source code itself should be in a directory called `xwalk`.

Once the build completes, the output directory `build/` should contain two folders: `app` and `extension`. `app` contains the web application and its manifest; `extension` contains the compiled extension library (`libecho.so`).

Also note that you can use you host's compiler, providing you compile for the correct architecture (Tizen IVI emulator images are 32 bit). For example, on a 64 bit host, you would do:

    CFLAGS=-m32 XWALK_HEADERS=/path/to/crosswalk-source make

# Test on the emulator

You have now built the extension and application, and are at the point where you can test on the emulator.

1.  Use the emulator manager to start the Tizen IVI target (if it's not already running).

2.  Now you can use the `sdb` tool to push the application to the running Tizen IVI target, get a shell on it, and start the application

    If your host machine is Linux, open a bash shell. On Windows, you need a cmd shell instead (as `sdb push` doesn't work in a bash shell on Windows).

3.  In the shell, turn on sdb root mode:

        sdb root on

4.  Go to the root directory of the **simple** project on the host machine.

    Make sure you've run the build for the project, so the `build` directory is populated (see the previous section).

5.  Push the build directory of the project from the host to the target:

        sdb push build /home/app/simple

    This will create a `/home/app/simple` directory on the target.

6.  Now get a shell on the target and switch to the "app" user. This user has the correct configuration and permissions to run applications:

        # in the host shell
        sdb shell

        # now we're on the target as root
        # su - app

        # now we've switched to the app user
        app:~>

7.  Finally, run the application from the app user's shell (on the target):

        xwalk --fullscreen --external-extensions-path=/home/app/simple/extension/ \
          /home/app/simple/app/

    You should see this in the emulator:

    ![Crosswalk application with extensions on Tizen IVI](assets/tizen-ivi3-emulator-echo-extension.png)

    If you don't, check for errors and warnings coming from the `xwalk` command. In particular, the output from the command should end with:

        Instance 1 created!

    This message is coming from the `instance_created` callback of your extension. If it's not there, the extension is not being initialized correctly.