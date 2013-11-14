Presentation API allows web app to stream web contents (aka. presentation) to the secondary display
connected to system via Miracast wireless display, HDMI port or Airplay. See
W3C spec draft at http://webscreens.github.io/presentation-api/.

Currently, Presentation API on Crosswalk is only for Android 4.2+ with Miracast
compatible wireless display.

* [navigator.presentation.requestShow Method](Presentation-api-manual#navigatorpresentationrequestshow-method)
* [navigator.presentation.displayAvailable Property](Presentation-api-manual#navigatorpresentationdisplayavailable-property)
* [navigator.presentation.displayavailablechange Event](Presentation-api-manual#navigatorpresentationdisplayavailablechange-event)

Sample Code
------------
The controller page is used to open another page on the secondary page:
```
<html>
<head>
<script>

var presentationWindow = null;

function onsuccess(w) {
  presentationWindow = w;
  w.postMessage("hello", "*");
}

function onerror(error) {
  console.log("failed to request show: " + error.name);
}

function showPresentation() {
  if (!navigator.presentation.displayAvailable) {
    alert("No available display is found.");
    return;
  }

  navigator.presentation.addEventListener("displayavailablechange", function() {
    if (!navigator.presentation.displayAvailable)
      presentationWindow = null;
  });
  navigator.presentation.requestShow("content.html", onsuccess, onerror);
}

window.addEventListener("message", function(event) {
  var msg = event.data;
  if (msg == "close me" && presentationWindow !== null) {
    presentationWindow.close();
    presentationWindow = null;
  }
}, false);

</script>
</head>
<body>
<input type="button" onclick="showPresentation();"></input>
</body>
</html>
```

The content page will be showed on the secondary display:
```
<html>
<body>
<script>
window.addEventListener("message", function(event) {
  var msg = event.data;
  console.log("Receive message for its opener: " + msg);
  event.source.postMessage("close me", "*");
}, false);
</script>
</body>
</html>
```
### JavaScript API Manual
* ##### navigator.presentation.requestShow Method

 `requestShow` is intended to request show a HTML page specified by `url` on the secondary display from the current browsing context. When the page is loaded successfully, the successCallback will be invoked with the 'window' object of the HTML page opened. The page navigation follows the legacy behavior of `window.open()` and thus allows navigating to URLs that are not at the same origin as the browsing
context of the incumbent script.

 The communication between the opener window and presentation window follows [HTML5 web messaging](http://www.w3.org/TR/webmessaging/). You can call `postMessage` to post a message and listen `onmessage` to handle the message from other side. 

 If one of the following conditions is satisfied, `requestShow` will fail and the
`errorCallback` gets called with an `DOMError`:

 * No available secondary display found (**NotFoundError**)
 * A presentation is already showed on secondary display (**InvalidAccessError**)
 * The platform doesn't support Miracast protocol (**NotSupportedError**)

> **Note**: Since there is no straightforward interaction on the secondary display. When designing the contents showed on the secondary display, the following things should be taken into considerations:
  * UI layout for big screen.
  * Avoid popup JavaScript dialog, e.g. alert and confirm dialog.

* ##### navigator.presentation.displayAvailable Property

 Indicates if there is at least an available secondary display for presentation show. When the display used for showing presentation is disappeared, 
  * If there is still another secondary display, the content will be switched to it automatically.
  * If there is no secondary display, the content will be disposed.

* ##### navigator.presentation.displayavailablechange Event

 When the first secondary display is arrived and last secondary display is removed, `displayavailablechange` event will be triggered, and the property of 'navigator.presentation.displayAvailable' is set to true/false.

 The presentation browsing context is closed if the secondary display becomes unavailable, so
that the app has no need to close it by 'window.close'.

Sample Demos
------------------
* Image Gallery
* HexGL