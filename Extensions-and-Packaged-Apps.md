* Chromium Extensions are usually small programs written in JavaScript that can change the behavior of a website or the browser itself. Examples are ad blockers and a "new email indicator" on the browser toolbar that flashes when a new email arrives.

* Packaged Apps are programs written using web technologies, but they are as capable as a native app. A Packaged App might have access or not to the underlying operating system via special APIs, depending on the permissions requested on the manifest. Chromium is able to run Packaged Apps in the background or as standalone programs in a way that makes it hard for the end user to make a distinction between native apps and web apps.

* Chromium Extensions API are the APIs exposed to both Extensions and Packaged Apps. The APIs available for each category are different since Packaged Apps and Extensions aim for different goals, but some APIs might intersect. The APIs exposed to [Chromium Extensions](http://developer.chrome.com/extensions/api_index.html) will allow the extension to customize the browser UI and websites while the APIs exposed to [Packaged Apps](http://developer.chrome.com/apps/api_index.html) expose system functionality like filesystem and USB.

## Security aspects

Chromium has a pretty robust [security model](http://www.eecs.berkeley.edu/Pubs/TechRpts/2009/EECS-2009-185.pdf) for Extensions with an extra layer of process isolation compared to Packaged Apps. It makes sense since Extensions will usually work on top of untrusted content: you probably want your ad block extension to block ads from every website you are accessing, which might include the undergrounds of the Internet.

On both cases, it follows the pattern we have seen all around Chromium: least privilege. No platform access happens on the process running the App/Extension with some enforcement from the OS. Everything is delegated to a trusted process, known as the "browser" process, which is the same process that display the contents on  the screen.

So when an app queries for the number of CPUs by invoking "chrome.experimental.systemInfo.cpu.get()", a message is sent to the trusted process that reads the contents of /proc/cpuinfo on Linux and sends back the reply. The "browser" process acts like a broker/gatekeeper and wont allow any API access other than what was agreed on the app manifest. Any attempt from the app of circumventing these policies, like trying to exploit  a bug on Blink/V8 and calling open(2) directly on /proc/cpuinfo will result in the termination of the process (on Linux at least).

## Extensions API

All the API exposed to the Packaged Apps and Extensions are implemented on the Chromium side, using Chromiums own bindings generators. The bindings are completely agnostic of Blink and V8. Implementing a [new API](http://www.chromium.org/developers/design-documents/extensions/proposed-changes/creating-new-apis) is pretty straightforward and the majority of the code is generated, including the messages between the sandboxed process running the app and the trusted process accessing the platform. IDL is used as input for the generators.

It is important to highlight that these bindings are not exactly "native" bindings like we have when implementing a new API on Blink. What I could conclude so far is there is a code shim in charge of registering the APIs and serializing data to the trusted process using JSON + JSON Schema for validation.

For synchronous APIs, a JavaScript shim might be needed to emulate the synchronous behavior since synchronous calls are not supported.

## webview tag

Part of the Extensions API, the [webview tag](http://developer.chrome.com/apps/app_external.html) behave likes an iframe, although unlike an iframe, its contents lives in a separated process. It could be used for implementing a browser, but it is currently very
limited.

## Extensions system and Crosswalk

I see the Extensions system as the natural way of implementing the vast majority of our APIs, in special system APIs. The few that might require access to graphics context and realtime data, should be implemented directly on Blink.

The fact that most of the work is done by generators that are proved to work, will leave us less room for mistakes and speed up the development process. Intel has contributed 2 APIs to Chromium upstream, which means we have in-house expertise already for the task.

Unfortunately the extension system is bound to Chrome (the browser). There are [plans to make it modular](http://www.chromium.org/developers/design-documents/making-chrome-independent-of-extensions) and we should help this plan to materialize. For Crosswalk, it would be good if the Extension system could be modular enough that the content_shell is able load a Packaged App by specifying its path. 

We also need self registering extensions: currently Chrome is aware of what extensions are implemented. New extensions can only be added in build time. In order to make it less intrusive to implement a new extension, the extensions should register themselves like plugins. 

Improving the webview tag can also be an area of interest for Crosswalk. A browser could be developed using Crosswalk and the browser itself would be a webapp.