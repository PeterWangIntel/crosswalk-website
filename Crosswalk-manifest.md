# Crosswalk manifest format

Crosswalk currently follows the manifest format used by [Chromium packaged applications](http://developer.chrome.com/apps/manifest.html).

However, many of the features are not yet supported in Crosswalk.

## Required fields

* **name**: A plain text string that identifies the application. This field does not yet support internationalisation. 

* **version**: A string containing one to four dot-separated integers identifying the application version; for example: "2", "1.2", "1.3.0", "4.0.0.11". A couple of rules apply to the integers: they must be between 0 and 65535, inclusive; and you can't prefix any non-zero values with "0" (e.g. "01.1" is **invalid**).

* **app**: Specifies the application entry point. It must contain one of the fields below:

  * **launch**: Specifies a normal page to use as the app entry point. It must contain a **local_path** field which sets a path to an HTML page, relative to the application's root.

    *Note: app.launch.local_path is the only supported entry point for applications on Crosswalk Android.*

  * **main**: Specifies a main document (a.k.a. "event page") to use as the application entry point. This field should itself contain either:
    * A **source** field, which sets the main document's local path.
    * OR
    * A **scripts** array to specify JavaScript files. These will be loaded into an automatically-generated main document.
  
  If both **source** and **scripts** are specified, **source** takes precedence.

Note that if both **launch** and **main** are specified, **main** takes precedence.

## Optional fields

The following fields are *not* required by the manifest specification, but are available:

* **description**: A text string describing the application.
* **icons**: Specifies icon graphics files to use for the application. The "128" size icon should be set as a minimum. If it's not given, the Crosswalk default logo icon will be used.
* **permissions** (Crosswalk 4 or later): This field defines which features are used by the application. See the [permissions](https://crosswalk-project.org/#wiki/manifest-permissions) support in Crosswalk.
* **content_security_policy** (Crosswalk 4 or later): The "content_security_policy" field represents the [CSP](http://w3c.github.io/webappsec/specs/content-security-policy/csp-specification.dev.html) policy which should be enforced for the application. CSP be disabled if this field is not set.
* **launch_screen** (Crosswalk 5 or later for Android): The "launch_screen" field represents the [Launch Screen](https://crosswalk-project.org/#wiki/Launch-Screen) feature, which is a static user interface that is shown immediately after the application is launched.
* **xwalk_hosts** (Crosswalk 6 or later for Android): The 'xwalk_hosts' field allows [Cross Origin XHR](https://crosswalk-project.org/#wiki/Cross-Origin-XHR) on Android.

## Minimal manifest file

This is an example of the minimal amount of metadata required in a manifest:

```
{
  "name": "Calculator",
  "version": "1.1.3.1",
  "app": {
    "launch":{
      "local_path": "calculator.html"
    }
  }
}
```

Another example, using **main.scripts** instead of a **launch** object:
```
{
  "name": "Calculator",
  "version": "1.1.3.1",
  "app": {
    "main":{
      "scripts": ["main.js"]
    }
  }
}
```

and an example using **main.source**:

```
{
  "name": "Calculator",
  "version": "1.1.3.1",
  "app": {
    "main":{
      "source": "main.html"
    }
  }
}
```

## Full manifest file (Crosswalk 1-3)

Here is the complete manifest file which contains all fields supported by Crosswalk (Crosswalk 1, Crosswalk 2, Crosswalk 3):

```
{
  "name": "app name",
  "version": "1.0.0",
  "app": {
    "main":{
      "scripts": ["main.js"],
      "source": "main.html"
    },
    "launch":{
      "local_path": "index.html"
    }
  },
  "description": "a sample description",
  "icons": {
    "128": "icon128.png"
  }
}
```

## Full manifest file (Crosswalk 4)

This example shows additional fields supported by Crosswalk 4:

```
{
  "name": "app name",
  "version": "1.0.0",
  "app": {
    "main":{
      "scripts": ["main.js"],
      "source": "main.html"
    },
    "launch":{
      "local_path": "index.html"
    }
  },
  "content_security_policy": "script-src 'self'",
  "permissions": [
    "Contacts",
    "Geolocation",
    "Messaging"
  ],
  "description": "a sample description",
  "icons": {
    "128": "icon128.png"
  }
}
```

## Manifest fields support status

 Field | Platform | Canary | Crosswalk 1 | Crosswalk 2 | Crosswalk 3 | Crosswalk 4 | Crosswalk 5
--- | --- | --- | --- | --- | --- | --- | ---
name | Tizen | Yes | Yes | Yes | Yes | Yes
 | Android | Yes | N/A | Yes | Yes | Yes | Yes
version | Tizen | Yes | Yes | Yes | Yes | Yes | Yes
 | Android | Yes | N/A | Yes | Yes | Yes | Yes
app.launch.local_path | Tizen | Yes | Yes | Yes | Yes | Yes | Yes
 | Android | Yes | N/A | Yes | Yes | Yes | Yes
app.main.source | Tizen | Yes | Yes | Yes | Yes | Yes | Yes
 | Android | N/A | N/A | N/A | N/A | N/A | N/A
app.main.scripts | Tizen | Yes | Yes | Yes | Yes | Yes | Yes
 | Android | N/A | N/A | N/A | N/A | N/A | N/A
description | Tizen | Yes | Yes | Yes | Yes | Yes | Yes
 | Android | Yes | N/A | Yes | Yes | Yes | Yes
icons | Tizen | Yes | Yes | Yes | Yes | Yes | Yes
 | Android | Yes | N/A | Yes | Yes | Yes | Yes
content_security_policy | Tizen | Yes | N/A | N/A | N/A | Yes | Yes
 | Android | N/A | N/A | N/A | N/A | N/A | N/A
permissions | Tizen | |  |  | | |
 | Android | N/A | N/A | N/A | N/A | Yes | Yes
launch_screen | Tizen | N/A | N/A | N/A | N/A | N/A | N/A
 | Android | N/A | N/A | N/A | N/A | N/A | Yes