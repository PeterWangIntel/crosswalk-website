## Implement an external extension for Crosswalk on Android
* Write the JavaScript stub code same as the native extension system, saved as a .js file.
* Create a new class inherited from the class XWalkExtensionClient implements the methods used by JavaScript and compile and package it as a jar file.
```
class MyExtension extends XWalkExtensionClient {
  public MyExtension(String name, String jsApi, XWalkExtensionContextClient context) {
  }
  public void onMessage(int instanceId, String message) {
  }
  public String onSyncMessage(int instanceId, String message) {
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
See details about [Android permissions]. 
(http://developer.android.com/reference/android/Manifest.permission.html). Permissions are supported since Crosswalk-3.
* So for each extension, put three files '*.jar, *.js and *.json' into one directory. Note that the name of these 3 files should be the same as the name of the directory.
* Package them with the option '--extensions=/path/to/extension' of make_apk.py. 
* The packaging tool supports to package multiple extensions for one web app. For each extension, follow the first 4 steps and package them by adding all paths in the option '--extensions' with the path separator. For example, --extensions='/path/to/extension1:/path/to/extension2' on Linux and Mac.

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
* Implementing the inherited Java class, called MyExtension.java. Compile and package it as 'myextension.jar'. It needs 'android.jar' from Android SDK and 'xwalk_app_runtime_client_java.jar' from xwalk_app_template.tar.gz. So add them in your classpath when doing Java compilation.



The source code of class XWalkExtensionClient:
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
    public void onMessage(int instanceId, String message) {
        postMessage(instanceId, "From java:" + message);
    }

    @Override
    public String onSyncMessage(int instanceId, String message) {
        return "From java sync:" + message;
    }
}
```

 The commands to compile and package it to myextension.jar:
 ```
  javac MyExtension.java -classpath /path/to/xwalk_app_template/libs/xwalk_app_runtime_java.jar:
        /path/to/androidsdk/platforms/android-[version-number]/android.jar
  jar cvf myextension.jar MyExtension.class
```
* Configure the extension in myextension.json so that Crosswalk can load the above files.
```
  {
    "name":    "echo",               // The name of external extension.
    "class":   "com.example.extension.MyExtension",   // The name of the class that implements the extension.
    "jsapi":   "myextension.js"             // The path of the JavaScript code stub file.
  }
```
* Call the web APIs in the web app. Not needed for developing an extension for Crosswalk on Android. Just for reference.
```
<html>
<head>
<title>Test</title>
</head>
<body>
<script>
try {
  var d = new Date().toString();
  // The first 'echo' is the extension name defined in myextension.json.
  echo.echo(d, function(msg) {
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
python make_apk.py --name=TestExtension --package=org.example.testextension --extensions="/path/to/myextension/" ...
```