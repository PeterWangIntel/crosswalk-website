Small edit to test webhooks.

## Is this a runtime like Java or Visual Basic?
No, because Crosswalk is based on W3C standards: HTML5, CSS and JavaScript.  Unlike the languages supported by earlier runtimes, W3C standards are implemented in multiple forms, by multiple companies, in both open source and commercial forms.  A broad range of open source as well as commercial tools and projects support the developer.  When you use a Crosswalk application runtime, you are participating in a growing ecosystem.
 
## If my apps need W3C standards, why shouldn't I target a browser?

Browsers do a great job of supporting W3C standards, but they are not allowed to support the APIs from the Systems Applications Working Group. This is because these APIs access platform features which, if known to a web site and combined with other data known to the browser, would allow violations of the consumer's privacy. Because Crosswalk applications have a different security model, where the consumer is able to choose which permissions an application is given, system application APIs **can** be supported. This in turn makes applications possible with Crosswalk which are not possible on the open web.

## How is Crosswalk different from other runtimes for HTML5?

The Crosswalk Project supports multiple operating systems (see [OS Support](OS-support-of-Crosswalk)). Support is planned for [SysApp](http://www.w3.org/2012/sysapps/) APIs. Extra support is included for applications aimed at mobile devices, e.g., orientation lock and viewport interaction. And you can extend Crosswalk with your own APIs.

A platform owner who provides a Crosswalk runtime can control runtime updates for a suite of applications without having to embed the runtime in each one. In addition, the platform owner may include APIs that are unique to their platform as part of the runtime.

A developer with a suite of apps could decide to offer a specific version of a Crosswalk runtime, shared among all the apps in the suite.

## How is Crosswalk different from CEF or QtWebKit?

Crosswalk is based on the same upstream code as CEF - Chromium and Blink.  QtWebKit is based on the WebKit project.  Blink is a fork of WebKit.  

CEF and QtWebKit are intended to be used by a native-savvy programmer who makes a native call to one or the other of these native libraries, passing in HTML5/CSS/JS as code to be executed by CEF or QtWebKit. By contrast, the Crosswalk model interposes a packaging tool between the binary of the runtime and an application, written in HTML5/CSS/JS which can be run as-is on the Crosswalk runtime.  The tool creates a native application based on the combination of web code + Crosswalk.

A CEF or QtWebKit user can execute arbitrary native code in their program along with HTML5/CSS/JS.  The Crosswalk user has two native code options: Native Client (also supported by CEF) and the Crosswalk extension mechanism.  Both native options in Crosswalk preserve the boundaries of the runtime.

CEF and QtWebKit are sometimes thought of as &quot;bring-your-own&quot; replacements for a platform's own webview component.  There is nothing to prevent a savvy developer from doing that based on Crosswalk code, too, but we haven't done it.  If you think we should, let us know, and why you think so.

## Why use Blink vs. the higher-level Chromium Embedded Framework as a basis for Crosswalk?

CEF 1.0 has proven to be quite popular, but is being [phased out](http://www.magpcss.org/ceforum/viewtopic.php?f=10&t=10647&sid=510426ccd8a9650f72ba416d7b51de06) in favor of the larger CEF 3.0.  Since we want a consistent implementation in the Crosswalk project, we had to pick a level in the Chromium architecture that could accommodate both use cases.  By starting with Blink and building up, rather starting with CEF 3.0 and removing pieces, we think we'll end up with a tighter, more consistent result.  

## Isn't the Crosswalk Project just going to mean more fragmentation of the web?

No, because:

* The Crosswalk Project isn't aimed at the web at all: it's aimed at applications that happen to be written in HTML5, CSS and JS.
* Applications using a Crosswalk runtime know about the environment they are built for.  Minor differences between runtime implementations (e.g. a sensor available on one platform but not on another) are easily accommodated by developers.
* We don't intend to fork Blink, the underlying rendering engine for Chromium.
* We are going to rebase regularly to new versions of Blink.
* If a change makes sense for generic Chromium, we will submit it upstream.

## When will there be Crosswalk products?

Anyone can take the code at any point and build a product. We're going to indicate relative stability at each milestone in the [roadmap](High-level-roadmap).  It's up to the community to offer commercial products.  So, please don't ask us when/if any particular product will use what we're building.  Even if we know we can't say.

## When should I use Chrome's new packaged apps vs. a Crosswalk Runtime?

With Chrome packaged apps, you get access to the Chrome app store and the capabilities Chrome offers.  With the Crosswalk project, you have different possibilities:

* If you are building a platform, you can include a Crosswalk Application Runtime as a service for your own catalog of applications.
* A developer can package an application with a Crosswalk Application runtime so that the app and runtime are never revised without developer permission.

Of course, because Crosswalk is based on Blink and Chromium, a developer could publish a standard HTML5 app for both Crosswalk and Chrome.