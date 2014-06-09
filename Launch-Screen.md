# Introduction

The launch screen is a static user interface that is shown immediately after the application is launched and is hidden when the application and required resources are loaded and the application’s actual user interface can be constructed. The use of a launch screen leads to a better perceived performance and improves the user experience of an application as the user is able to see content relevant to the application immediately.

## The full spec

[Interstitial launch screens](https://docs.google.com/a/intel.com/document/d/17PuNuHRTQuREUpaCvj-eEx7uYi2avd-VW-oaMXMpvwo/edit).

## Manifest definition

```
"launch_screen": {
  "ready_when": "first-paint | complete | custom",
  "default|portrait|landscape": {
     "background_color": "#ff0000",
     "background_image": "bgfoo.png [1x, bgfoo-2x.png 2x]",
     "image": "foo.png [1x, foo-2x.png 2x]",
     "image_border": "30px [30px 30px 30px] [repeat | stretch | round] [repeat | stretch | round]"
   }
}
```
Example:
```
"launch_screen": {
  "ready_when": "custom",
  "portrait": {
     "background_color": "#ff0000",
     "background_image": "bgfoo.png 1x, bgfoo-2x.png 2x",
     "image": "foo.png 1x, foo-2x.png 2x",
     "image_border": "30px 40px stretch"
   }
}
```

## "launch_screen" members
Member | Description
--- | ---
"ready_when" |  An application readiness state, at which to hide the launch screen. If undefined, defaults to first-paint application readiness state.
"default" | The launch screen to use for both landscape and portrait mode.
"landscape" | The launch screen to use for landscape mode.
"portrait" | The launch screen to use for portrait mode.

* **ready_when**:

Application readiness state | Preconditions
--- | ---
"first-paint" | * The first visually non-empty paint has occurred.
"complete" | * The first visually non-empty paint has occurred. <br> * All the resources have been loaded.<br> **_WARNING: It will take a long time as it need to wait until all sub resources are downloaded._**
"custom" | * The first visually non-empty paint has occurred. <br> * The ```window.screen.show()``` method was called.

* **background_color**: The background color for the launch screen in hexadecimal notation.
* **background_image**: The repeating background image. The upper left corner of the image is aligned with the upper left corner of the viewing area on the screen. Spec: [background_image](https://docs.google.com/a/intel.com/document/d/17PuNuHRTQuREUpaCvj-eEx7uYi2avd-VW-oaMXMpvwo/edit?pli=1#heading=h.p51ynj4nuqv7)
* **image**: The image centered horizontally and vertically.
* **image_border**: A border image, split into a 9-piece image with the intermediate border pieces scaled and/or stretched to fill the whole viewport as defined. Spec: [Image Border](https://docs.google.com/a/intel.com/document/d/17PuNuHRTQuREUpaCvj-eEx7uYi2avd-VW-oaMXMpvwo/edit?pli=1#heading=h.rq1ayw778vp6)
* **Supported image formats**: png, bmp, jpg, gif<br>
* **Tips**: The ```background_color``` and ```background_image``` will be displayed firstly when user clicked the app icon, and then display the ```image``` part over the backgrounds.