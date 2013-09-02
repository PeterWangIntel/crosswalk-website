Brackets is an opensource code editor for web development. It is mainly developed by Adobe. It works in Mac and Windows. Linux support is working in progress.

* [Brackets home](http://brackets.io)
* [brackets-shell repo](https://github.com/adobe/brackets-shell)
* [brackets repo](https://github.com/adobe/brackets)
* [Development backlog](http://bit.ly/BracketsBacklog)
* [Notes about Linux support](https://github.com/adobe/brackets/wiki/Linux-Version)

## How it works today?

Brackets is composed by the following parts:

* `brackets` is the set of HTML/JS/CSS that makes the editor. While there is work on going to make it run in the browser, some features rely on custom JS APIs in the namespace brackets.*.
* `brackets-shell` is a native application, built using CEF3, that runs `brackets`. It exposes custom JS APIs and boots up the Node process.
* `node process` is still _experimental_, it can run JS code with native access (as opposed to code from `brackets`), and communicated with `brackets` via websockets.

It's important to note that _JS client code_ from `brackets` run inside the web runtime (`brackets-shell`), and do not have access to native features. _JS node code_ runs in the `node process` and have access to native node extensions.

## Custom JS APIs

`brackets-shell` exposes the following APIs:

* `brackets.fs.*`: it is an API to access file system, using filepaths and reading data directly. No objects involved, the API consists in a series of functions. JS client code wraps this into a 
* `brackets.app.*`
    * Native menu creation. Command dispatching is coupled with the CommandManager JS client code.
    * Live browser manipulation. Opens a browser to show updated content being edited. `brackets-shell` have C++ code to open and control a Google Chrome instance.
    * Quit the application
    * Open a certain URL in the default browser
    * Other misc functions: enabling dev tools, checking state of node server, showing OS folders, etc.

The `brackets` JS client code abstracts brackets.fs into a NativeFileSystemAPI, which mimics the FileSystem API from HTML5 but provide access to the whole filesystem instead of a sandbox.


## Brackets extensions

_Brackets extensions_ are groups of files that provide extra functionality to the Brackets editor.

The basic way to make extensions is to provide code that will be loaded by `brackets-shell` together with the JS client code. The extension code can interact with modules from `brackets` using `brackets.getModule` call, for example, one extension can use `var LanguageManager = brackets.getModule('language/LanguageManager')` to register new programming language.

See more in [How to write Brackets extensions](https://github.com/adobe/brackets/wiki/How%20to%20write%20extensions)

A new (experimental) ability for extensions to provide files that will run in node server. The idea is that this JS node code will be able to access native features of the platform using Node core libraries and _Node extensions_ (that can be done in C++). And JS client code (the code that makes the editor) communicates via websockets with the JS node code.

One example: I can make a JS node code that grabs git information about files that are changed and their diff, and make this information via websocket. Then the JS client code exposes a menu item that when click, asks for that information and show a dialog with it.

One reasoning behind having a Node.js server is that it allows easy access to the whole library of extensions already existent, and provides a well known way to create C++ extensions.

[Brackets Node Process: Overview for Developers](https://github.com/adobe/brackets/wiki/Brackets-Node-Process:-Overview-for-Developers) and 
[Research: Node.JS integration](https://github.com/adobe/brackets/wiki/Research%3A-Node.JS-Integration) which explains the reasons of the integration and the technical decisions.

See also a proposal for API simplifying the way extensions work and interact with each other: https://github.com/adobe/brackets/wiki/Extensions2

## How Brackets with Crosswalk should look like?

Brackets brings the requirement to run custom native code. This enables them to provide whatever interface seems convenient for Brackets extensions. 

Crosswalk should provide a runtime that loads external code dynamically. The nature of the external code we want to use will define which API we expose, for example: whether we want to expose a "native window handler" to the external code.

In both cases, Crosswalk should provide some kind of API for exposing new native functionality to the JS client code.

### Possibilities for replacing custom JS APIs

* FileSystem access possibilities
    * Use Crosswalk extension capability to provide implementation for `brackets.fs`.
    * Expose special ability in existing FileSystem local API for requesting a non-sandboxed filesystem.
* Native menus possibilities, solution depending
    * Implement in Crosswalk runtime a menu API to be used for applications. Chrome has one for extensions that want to add items to context menu, see [chrome.contextMenus](http://developer.chrome.com/extensions/contextMenus.html).
    * Use Crosswalk extension capability to provide implementation. This is a requirement if we go the _embedded_ solution.