Not completed yet. Will continue to refine this page.

## Implementing an external extension for Crosswalk on Android
* Write the JavaScript stub code same as the native extension system, saved as a javascript file.
* Create a new class inherited from the class XWalkExtensionClient implements the methods used by JavaScript and compile and package it as a jar file.
```
class MyExtension extends XWalkExtensionClient {
  public MyExtension(String name, String jsApi, XWalkExtensionContextClient context) {
  }
  public void onMessage() {
  }
  public String onSyncMessage(String message) {
  }
  ...
}
```
* Configure the extension in a json format which should be packaged in android asset, like:
```
    {
       "name":  "mandatory property - the extension name.",
       "class": "mandatory property - the Java class name.",
       "jsapi": "mandatory property - the file name of JavaScript stub code.",
       "permissions": "optional property - Android permissions used in this extension, like CAMERA. Its value is a list."
     }
```
See details about [Android permissions](http://developer.android.com/reference/android/Manifest.permission.html).
* So for each extension, put three files '*.jar, *.js and *.json' into one directory. Package them with the option '--extensions=/path/to/extension/directory' of make_apk.py. 

Note: The packaging tool supports to package multiple extensions for one web app.

## Example
* Write the stub code in JavaScript, called myextension.js.
```
var echoListener = null;
extension.setMessageListener(function(msg) {
  if (echoListener instanceof Function) {
    echoListener(msg);
  };
});
// Export API 'echo'.
exports.echo = function(msg, callback) {
  echoListener = callback;
  extension.postMessage(msg);
};
// Export API 'echoSync'.
exports.echoSync = function(msg) {
  return extension.internal.sendSyncMessage(msg);
};
```
* Implementing the inherited Java class, called MyExtension.java. Compile and package it as 'myextension.jar'. It needs 'android.jar' from Android SDK and 'xwalk_app_runtime_client_java.jar' from xwalk_app_template.tar.gz.
```
package com.example.extension;

import org.xwalk.app.runtime.extension.XWalkExtensionClient;
import org.xwalk.app.runtime.extension.XWalkExtensionContextClient;

public class MyExtension extends XWalkExtensionClient {
    final private XWalkExtensionContextClient mExtensionContext;
    // Don't change the parameters in Constructor because XWalk needs to call this constructor.
    public MyExtension(String name, String JsApiContent, XWalkExtensionContextClient context) {
        super(name, JsApiContent, context);
        mExtensionContext = context;
    }

    @Override
    public void onMessage(String message) {
        postMessage("From java:" + message);
    }

    @Override
    public String onSyncMessage(String message) {
        return "From java sync:" + message;
    }
}
```
* Configure the extension in myextension.json so that Crosswalk can load the above files.
```
  {
    "name":    "Echo",               // The name of external extension.
    "class":   "com.example.extension.MyExtension",   // The name of the class that implements the extension.
    "jsapi":   "myextension.js"             // The path of the JavaScript code stub file.
  }
```
* Call the web APIs in the web app. Not needed for developing an extension for Crosswalk on Android. Just for reference.
```
<html>
<head>
<title></title>
</head>
<body>
<script>
try {
  var d = new Date().toString();
  // Echo is the name defined in myextension.json.
  Echo.echo(d, function(msg) {
    document.write(msg + "<br>");
    var expected = "From java:" + d;
    if (msg === expected) {
      document.write("Async echo <font color=green>passed</font>.");
      document.title = "Pass";
    } else {
      document.write("Async echo <font color=red>failed</font>.");
      document.title = "Fail";
    }
  });
} catch(e) {
  console.log(e);
  document.title = "Fail";
}
</script>
</body>
</html>
```
* Include the extension and package its files by Crosswalk packaging tool.
 * Put three files in one directory called 'myextension'.
```
myextension/
  myextension.js
  myextension.json
  myextension.jar
```
 * Specify the extension directory when using 'make_apk.py'.
```
python make_apk.py --extensions="/path/to/myextension/" ...
```