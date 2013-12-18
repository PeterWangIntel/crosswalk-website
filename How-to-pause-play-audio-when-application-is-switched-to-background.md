The default behavior of Crosswalk is for audio elements to continue playing when an application is switched to the background. All current popular browsers show the same behavior.

However, this may cause problems for some applications, especially games. For these applications, the user expectation is that media pauses when the application is switched to the background.

Developers can meet this expectation in Crosswalk (and other browsers) by using `visibilitychange` events. These events are triggered whenever an application is switched to the background or foreground. A developer can control media playback in the application by listening for `visibilitychange` events and calling play and pause operations in the event handler.

The following is a simple demo:

    <!DOCTYPE html>
    <html>
    <head lang="en">
    <meta charset="utf-8">
    <title>visibilitychange demo</title>
    </head>
    <body>

    <audio id="player" controls loop>
    <source src="demo.ogg">
    <source src="demo.mp3">
    Browser can't support Audio tag.
    </audio>

    <script>
    var audioElement =  document.getElementById("player");

    function onVisibilityChange(event) {
      if (event.target.webkitHidden) {
        audioElement.pause();
      }
      else {
        audioElement.play();
      }
    }

    function onLoad() {
      audioElement.play();
      document.addEventListener(
        "webkitvisibilitychange",
        onVisibilityChange,
        false
      );
    }

    document.addEventListener("DOMContentLoaded", onLoad);
    </script>
    </body>
    </html>

**Note: in Crosswalk, `visibilitychange` events are prefixed with "webkit", so your listeners should be attached to `webkitvisibilitychange` events**

`visibilitychange` events are supported by almost all popular browsers and web runtimes. For more detailed information, see the w3c specification: http://www.w3.org/TR/page-visibility/.