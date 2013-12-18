How to pause/play audio when application is switched to background

The default behavior of Crosswalk is continuing to play music when application is switched to background if audio element is playing, which is align with all the popular browsers currently, maybe it let developers in trouble, especial for web gaming developers, they maybe expect the media was paused when application is not visible.
Now you can control it by yourself through JavaScript event “visibilitychange”, which is supported by almost all the popular browsers and web runtime.
More detailed information, please see w3c spec. http://www.w3.org/TR/page-visibility/

When application is switched to background or back to the front, it will trigger visibilitychange event, web developers can register this event handler, and do the pause/play operation in handler function.

The following is the simple demo:
` <html>
<body onload="load()">
<audio id="audio_id" controls loop> 
<source src="demo-audio.mp3"/>
<source src="demo-audio.ogg"/>
Browser can't support Audio tag.
</audio>
<script>
var audioElement =  document.getElementById("audio_id");

function onVisibilityChanged(event) {
    var hidden = event.target.webkitHidden;
    if (hidden)
        audioElement.pause();
    else
        audioElement.play();
}

function load() {
    audioElement.play();
    audioElement.loop = true;
    document.addEventListener("webkitvisibilitychange", onVisibilityChanged, false);
}
</script>
</body>
</html> `