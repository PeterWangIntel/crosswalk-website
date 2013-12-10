> Currently, Presentation API on Crosswalk is only for Android 4.2+ with Miracast compatible wireless display. The Presentation API first landed in Crosswalk 3.32.49.0.

Presentation API allows web app to stream web contents (aka. presentation) to the secondary display
connected to the Android device via Miracast compatible  wireless display. See
W3C spec draft at http://webscreens.github.io/presentation-api/.

* [navigator.presentation.requestShow Method](Presentation-api-manual#navigatorpresentationrequestshow-method)
* [navigator.presentation.displayAvailable Property](Presentation-api-manual#navigatorpresentationdisplayavailable-property)
* [navigator.presentation.displayavailablechange Event](Presentation-api-manual#navigatorpresentationdisplayavailablechange-event)

### Sample Code
The controller page is used to open another HTML page on the secondary display:
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

 `requestShow` sends a request to the user agent for presentation show. If an available secondary display is ready for use, a new presentation window for a HTML page specified by `url` will be opened on the secondary display from the current browsing context. Once the page is finished to load, the `successCallback` will be invoked and accepts the `window` object of the new page as the input parameter. Thus, the communication between the opener window and presentation window follows the approach of [HTML5 Web Messaging](http://www.w3.org/TR/webmessaging/). You could call `postMessage` to post a message and listen `onmessage` to handle the message from other side. 

 If one of the following conditions happens, `requestShow` will fail and the
`errorCallback` gets called with an `DOMError`:

 * No available secondary display found (**NotFoundError**)
 * A presentation is already showed on secondary display (**InvalidAccessError**)
 * The platform doesn't support Miracast protocol (**NotSupportedError**)
 * An invalid url parameter is passed (**InvalidParameterError**)

> **Note**: Since there is no straightforward interaction on the secondary display. When designing the contents showed on the secondary display, the following things should be taken into considerations:
  * UI layout for big screen.
  * Avoid popup JavaScript dialog, e.g. alert and confirm dialog.

* ##### navigator.presentation.displayAvailable Property

 Indicates if there is at least an available secondary display for presentation show. When the display used for showing presentation is disappeared, 
  * If there is still another secondary display, the content will be switched to it automatically.
  * If there is no secondary display, the content will be disposed.

* ##### navigator.presentation.displayavailablechange Event

 When the first secondary display is arrived and last secondary display is removed, `displayavailablechange` event will be triggered, and the property of `navigator.presentation.displayAvailable` is set to true/false.

 The presentation browsing context is closed if the secondary display becomes unavailable, so
that the app has no need to close it by `window.close`.

### How to setup wireless display?
#### Requirements
 * Android 4.2 or newer device with Miracast enabled
 * A TV or a display with HDMI port
 * Wireless display adapter, e.g. Netgear PTV3000, Intel WiDi® adapter
How to Setup Wireless Display:

Plugin the wireless display adapter to display's HDMI port
Open 'Setting' app and select 'Display' entry on Android device
Turn on 'Wireless display' to connect the available wireless display
Use Simulated Secondary Display

If you have no such wireless display adapter, but are willing to play it on your device, you could use the simulated secondary display:

Open `Setting` app and select `Developer Options` entry
Find `Simulate Secondary Display` to select a display

### Demos
* Image Gallery
* HexGL