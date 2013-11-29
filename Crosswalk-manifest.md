# Crosswalk Manifest Format

Crosswalk currently follows the manifest format used by [Chromium packaged applications](http://developer.chrome.com/apps/manifest.html).

However, many of the features are not yet supported in Crosswalk

As of crosswalk-1.28.1.0, crosswalk does not support background event page in this release.

Currently the required manifest fields are:
* **name**: A short, plain text string that identifies the application. No i18n for this field support yet. 
* **version**: One to four dot-separated integers identifying the version of this extension. A couple of rules apply to the integers: they must be between 0 and 65535, inclusive, and non-zero integers can't start with 0. 
* **app**: The "app" field will be used to specify the application’s entry, it must contains one of below objects:
  * **launch**: Indicate a normal page will be used as the app entry. It should contains "local_path" to specify the entry page's local path of the application.
  * **main**:  Indicate a main document (AKA event page) will be used as the app entry. It should contains "source" to specify the main document’s local path or a "scripts" array to specify JavaScript files local path for auto-generated main document. If both "source" and "scripts" are specified then "source" will be used.

If both "launch" and "main" are specified then "main" will be used.

## Minimal manifest file
Developer can add a typical application manifest like below to declare application meta data:
```
{
  "name": "Calculator",
  "manifest_version": 1,
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
  "manifest_version": 1,
  "version": "1.1.3.1",
  "app": {
    "main":{
      "scripts": ["main.js"]
    }
  }
}
```
## Full manifest file
Here is the complete manifest file which contains all fields Crosswalk has already been supported:
```
{
  // Required
  "name": "app name",
  "version": "1.0.0",
  "app": {
    "main":{
      "scripts": ["main.js"]
    },
    "launch":{
      "local_path": "index.html"
    }
  }
  // recommended
  "description": "a sample description",
  "icons": {
    "128": "icon128.png"
  }
}
```