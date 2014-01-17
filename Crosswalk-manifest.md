# Crosswalk Manifest Format

Crosswalk currently follows the manifest format used by [Chromium packaged applications](http://developer.chrome.com/apps/manifest.html).

However, many of the features are not yet supported in Crosswalk

Currently the required manifest fields are:
* **name**: A short, plain text string that identifies the application. No i18n for this field support yet. 
* **version**: One to four dot-separated integers identifying the version of this extension. A couple of rules apply to the integers: they must be between 0 and 65535, inclusive, and non-zero integers can't start with 0. 
* **app**: The "app" field will be used to specify the application’s entry, it must contains one of below objects:
  * **launch**: Indicate a normal page will be used as the app entry. It should contains "local_path" to specify the entry page's local path of the application.
  * **main**:  Indicate a main document (AKA event page) will be used as the app entry. It should contains "source" to specify the main document’s local path or a "scripts" array to specify JavaScript files local path for auto-generated main document. If both "source" and "scripts" are specified then "source" will be used.
* **icons**: The "icons" field represent which icons should be used for the application. The "128" size icon should be valid in manifest file. If it's not given, the Crosswalk default logo icon will be used.
* **permissions**: This field defines which web features are used for the application. See the [permissions](https://crosswalk-project.org/#wiki/manifest-permissions) support in Crosswalk.
* **content_security_policy**: The "content_security_policy" field represent the [CSP](http://w3c.github.io/webappsec/specs/content-security-policy/csp-specification.dev.html) policy which the packaged web application should be enforced. It will be disabled when it's not given.

**Note**

* If both "launch" and "main" are specified then "main" will be used.
* For Android port, only support to launch the application from "app.launch.local_path".

## Minimal manifest file
Developer can add a typical application manifest like below to declare application meta data:
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
or using the main document:
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
and
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
## Full manifest file
Here is the complete manifest file which contains all fields Crosswalk (Crosswalk 1, Crosswalk 2, Crosswalk 3) has already been supported:
```
{
  // Required
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
  // recommended
  "description": "a sample description",
  "icons": {
    "128": "icon128.png"
  }
}
```

Supported by canary:
```
{
  // Required
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
  // recommended
  "content_security_policy": "script-src 'self'",
  "description": "a sample description",
  "icons": {
    "128": "icon128.png"
  }
}
```

## Manifest fields supporting status
 Field | Platform | Canary | Crosswalk 1 | Crosswalk 2 | Crosswalk 3 
--- | --- | --- | --- | --- | ---
name | Tizen | Yes | Yes | Yes | Yes
 | Android | Yes | No | Yes | Yes
version | Tizen | Yes | Yes | Yes | Yes
 | Android | Yes | No | Yes | Yes
app.launch.local_path | Tizen | Yes | Yes | Yes | Yes
 | Android | Yes | No | Yes | Yes
app.main.source | Tizen | Yes | Yes | Yes | Yes
 | Android | N/A | N/A | N/A | N/A
app.main.scripts | Tizen | Yes | Yes | Yes | Yes
 | Android | N/A| N/A | N/A |
description | Tizen | Yes | Yes | Yes | Yes
 | Android | Yes | N/A | Yes | Yes
icons | Tizen | Yes | Yes | Yes | Yes
 | Android | Yes | N/A | Yes | Yes
content_security_policy | Tizen | Yes | N/A | N/A | N/A
 | Android | N/A | N/A | N/A | N/A 