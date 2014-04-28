Getting data from remote servers with XMLHttpRequest object is limited by the same origin policy. To allow Cross-Origin XHR, "xwalk_hosts" should be declared in manifest.json for web applications running on Crosswalk for Android.

## Requesting cross-origin permissions
By adding hosts or host match patterns to the "xwalk_hosts" list in manifest.json, you applications can request access to remote servers outside of its origin.

```
{
  ...
  "xwalk_hosts": [
    "http://crosswalk-project.org/*"
  ],
  ...
}
```

"xwalk_hosts" valus can be fully qualified host names, like:

* "http://crosswalk-project.org/"

Or they can be match patterns, like:

* "http://*.org/"
* "https://*/"

## Send Cross-Origin XHR
After adding permissions to manifest.json, you can access the target URL directly with XMLHttpRequest Object.

```
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://crosswalk-project.org/", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // Do something with xhr.responseText.
  }
}
xhr.send();
```