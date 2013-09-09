## APIs
In addition to the W3C standard APIs available to web pages, Crosswalk provides additional APIs to further support building a native application experience using web platform technologies.

This page is where those APIs will be listed and documented.

Until the build system is hooked in to auto generate the API pages, you can view the source for the <a href='https://github.com/crosswalk-project/crosswalk/tree/master/jsapi'>Crosswalk APIs</a>.

The APIs linked above are exposed under the **xwalk** namespace. For example, the <a href='https://github.com/crosswalk-project/crosswalk/blob/master/jsapi/runtime.idl'>xwalk.runtime</a> API exposes the function **getAPIVersion**. This can be used as follows:

```javascript
function versionCallback (version) {
  console.log ('Version: ' + version);
}

xwalk.getAPIVersion (versionCallback);
```