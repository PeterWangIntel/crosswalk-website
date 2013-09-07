# Crosswalk Manifest Format

Crosswalk currently follows the manifest format used by [Chromium packaged applications](http://developer.chrome.com/apps/manifest.html).

However, many of the features are not yet supported in Crosswalk

As of crosswalk-1.28.1.0, crosswalk does not support background event page in this release.

Currently the required manifest fields are:
* **name**: A short, plain text string that identifies the application. No i18n for this field support yet. 
* **version**: One to four dot-separated integers identifying the version of this extension. A couple of rules apply to the integers: they must be between 0 and 65535, inclusive, and non-zero integers can't start with 0. 
* **app**: The "app" field must contains a "launch" object which contains "local_path" to specify the entry page's local path of the application. 

The optional manifest fields are:
* **manifest_version**: One integer specifying the version of the manifest file format your package requires.

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