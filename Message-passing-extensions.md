*NOTE: This document is the original design document for Crosswalk Extensions. We'll release an updated one with the current work on running extensions in an external process.*

Contact: caio.oliveira@intel.com

# Introduction: Why extensions?

While HTML5 APIs are growing every year, and covering more and more of the
functionalities applications use, there are several use cases in which an user
of Crosswalk, or even Crosswalk itself might need to expose new functionalities:

* An application that embeds Crosswalk (either as a WebView or the full Crosswalk
  binary) might want to implement certain functionality using native code
  instead of JS, but still use this from the HTML/JS code.

* A webruntime developed using Crosswalk needs to expose its own specific APIs,
  some examples would be: PhoneGap and Tizen.

* Crosswalk itself might want to provide some specific APIs that doesn't make
  sense as part of the Web platform (so not suitable to be implemented in
  Blink). One example would be a Native Menu API for webapps running in the
  desktop.

We categorize extensions in two groups: _builtin_ extensions, which are
deployed as part of Crosswalk itself; and _external_ extensions, to be used by
applications embedding Crosswalk (either as a WebView or the full Crosswalk
binary). An important part of _external_ extensions is to figure out the
API/ABI that the extension code need to follow to be successfully loaded by
Crosswalk.


# Some assumptions

* We want to use **sandbox** for the renderer process, so we will have to
  exchange messages -- either explicitly or implicitly.

* Extensions are a critical part of Crosswalk, so we want to **explore that part
  as soon as possible**. By exploring we mean not only developing but also
  using the extensions with Crosswalk when developing applications and
  webruntime(s).

* Because of the previous point, we want a flexible system so we can evolve
  it.


# Message passing extensions design

The core idea: expose a message passing API for extensions and allow them to
provide JavaScript code to encapsulate it when necessary. An extension in the
system will implement three operations:

* `GetJavaScriptAPI()`, which returns the JavaScript API be executed in the
  renderer process initialization.

* `HandleMessage()`, which will process a message from the renderer process.

and will be able to use

* `PostMessage()`, which sends a message back to the renderer process.

This design is flexible enough so we can execute extension code both in the
Browser Process (we might want to do that for Native Menu builtin extension),
and in a different extension process -- the ideal case for external
extensions.

Decision about which extensions will be installed on renderer process JS
environment, and which extensions will receive messages from renderer process,
are two ways to enforce permissions.

The typically predicted bottleneck in a system like this with IPC system, but
there are some ways to improve performance:

* Using shared memory for posting really big messages.
* Explore sharing higher level types, like ArrayBuffers.

Also worth noting that extension itself can optimize by sending less
messages. While this is valid for all systems, the fact that messages are in
the control of the extension and it can evaluate code in JavaScript
environment might enable better optimizations.


# Current implementation overview (2013-06-10)

See https://github.com/crosswalk-project/crosswalk/tree/master/extensions for the code.

We currently implement only builtin extensions that run on the browser
process. The plan is to cover also external extensions in another process as
the work progresses.

## Browser process

* ``XWalkExtension`` interface: the messaging interface implemented by
  extensions. We have one example which is the ``BracketsExtensions`` that
  implements some of ``brackets.fs.*`` functions.

* ``XWalkExtensionHost`` object: used by Crosswalk to manage the extensions and
  dispatch its messages. Once extensions are registered with it, notify the
  renderer process about and pass the JavaScript APIs of the extensions to
  renderer process.

* **Changes to XWalk:** ``XWalkContentBrowserClient``, to create the host and
  extensions, then register then.

## Renderer process

* ``XWalkExtensionRendererController`` object: keeps track of which extensions
   were registered, as well as its JavaScript APIs (so they can be loaded by
   RenderViews).  It currently also bootstraps a v8::Extension that contains
   the code for xwalk.* functions (see below).

* ``XWalkExtensionRenderViewHandler`` object: associated with each RenderView,
  handles the message exchange between JavaScript and the browser process. It
  is also responsible for installing the JavaScript API for each extension.

* **Changes to XWalk:** ``XWalkContentRendererClient``, to create the
  controller and to notify it when a render view was created.

## JavaScript code

* ``xwalk.postMessage(extension, msg)`` JS function allows the JavaScript to
  send a message to a certain extension.

* ``xwalk.setMessageListener(extension, callback)`` JS function allows to register
  a function to listen for messages from extension.

* In many cases, the idea is that extensions exposes JavaScript APIs that
  encapsulate the message passing.


## How will extension process be implemented?

The idea here is to have Browser Process create a new process for handling
extensions and acting as man-in-the-middle between the renderer process and
the extension process. Chromium has machinery for spawning new process that
we should be able to use.

We don't plan to run that extension process sandboxed, since its goal usually
is to talk to the system directly in ways we couldn't predict.


## How will external extensions be implemented?

External extensions are detailed in its own page, [in this wiki page](Extensions).


## How could synchronous messages be implemented?

We could build upon existing IPC mechanism for synchronous messaging, and add
a new HandleSyncMessage() operation to the interface. In the ideal scenario we
should be able to

While this is possible, is not something we are currently
targetting.


# Brackets implementation

In the same branch there's a concrete implementation of a Brackets extension
for some of ``brackets.fs.*`` APIs. The extension is in ``src/brackets`` is
divided as such:

* ``BracketsExtension`` implements the xwalk extension interface. Right now
  there's a very naive message and callback dispatcher, but enough to show how
  the system works.

* ``brackets_platform.h`` and ``brackets_platform_gtk.cpp`` are the
  implementations of the functionality with platform specific code. This code
  was mostly reused from the previous prototype of extensions.

* **Changes to Crosswalk:**: in ``XWalkContentBrowserClient`` we create and
  register the extension with the ``XWalkExtensionHost``.

As the other features are implemented, the goal it to make that brackets
extension an external extension.

We are also working in the Native Menu functionality needed by brackets, that
we want to provide as a builtin ``xwalk.*`` extension.


# Characteristics of this approach

* It **complements** other proposals so far: once we have knowledge and the
  Chrome Extension machinery is decoupled from Chrome Browser, we might be
  able to reuse some of its classes. Once NPRuntime proposal implementation is
  available, we can extend the current extension interface with NPRuntime
  capabilities.

* It's a very **non-intrusive implementation**, all the code is in a separate
  directory/namespace and there are three entry points in all Crosswalk code. It
  shouldn't cause problems to other on-going efforts.

* It'll allow us to **build requirements** for the future changes, by showing
  working versions of Brackets, webruntimes and other applications, with their
  extensions early, we can make sure we have the proper testing scenarios for
  future solutions.
