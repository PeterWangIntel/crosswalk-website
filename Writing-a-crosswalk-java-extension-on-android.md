Not completed yet. Will continue to refine this page.

## Implementing an external extension
* Write the JavaScript stub code same as the native extension system.
* A new class inherited from the class XWalkExtensionClient implements the methods used by JavaScript.
```
class XWalkExtensionClient {
  public XWalkExtensionClient(Activity activity, String name, String jsApi, XWalkExtensionContextClient context) {
  }
  public void onMessage() {
  }
  public String onSyncMessage(String message) {
  }
  ...
}
```
* Configure the extension in extensions-config.json which should be packaged in android asset, like:
```
    [
     {
       "name": "[the extension name]",
       "class": "[the Java class name]",
       "js_api": "[the file name of JavaScript stub code]"
     }
    ]
```
* Package them with the Crosswalk packaging tool.

## Example
* Write the stub code in JavaScript, called myextension.js
```
var echoListener = null;
extension.setMessageListener(function(msg) {
  if (echoListener instanceof Function) {
    echoListener(msg);
  };
});
exports.echo = function(msg, callback) {
  echoListener = callback;
  extension.postMessage(msg);
};
exports.echoSync = function(msg) {
  return extension.internal.sendSyncMessage(msg);
};
```
* Implementing the inherited Java class MyExtension.java
```
package com.example.extension;

import org.xwalk.app.runtime.extension.XWalkExtensionClient;
import org.xwalk.app.runtime.extension.XWalkExtensionContextClient;

public class MyExtension extends XWalkExtensionClient {
    final private XWalkExtensionContextClient mExtensionContext;
    // Don't change the parameters in Constructor.
    public MyExtension(Activity activity, String name, String JsApiContent, XWalkExtensionContextClient context) {
        super(activity, name, JsApiContent, context);
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
* Configure the extension in extensions-config.json so that Crosswalk can load them.
```
[{
  "name":       "echo",               // The name of external extension.
  "class":      "com.example.extension.MyExtension",   // The name of the class that implements the extension.
  "js_api":     "myextension.js"             // The path of the JavaScript code stub file.
}]
```
* Call the APIs in the web page.
```
<html>
<head>
<title></title>
</head>
<body>
<script>
try {
  var d = new Date().toString();
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
* Build extension and package them with Crosswalk packaging tool.