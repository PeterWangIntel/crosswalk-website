# Introduction

The launch screen is a static user interface that is shown immediately after the application is launched and is hidden when the application and required resources are loaded and the application’s actual user interface can be constructed. The use of a launch screen leads to a better perceived performance and improves the user experience of an application as the user is able to see content relevant to the application immediately.

## The full spec

[Interstitial launch screens](https://docs.google.com/a/intel.com/document/d/17PuNuHRTQuREUpaCvj-eEx7uYi2avd-VW-oaMXMpvwo/edit).

## Manifest definition

```
"launch_screen": {
  "ready_when": "first-paint | complete | custom",
  "default": {
     "image": "launch_image.png"
   }
}
```

## "launch_screen" members
Member | Description
--- | ---
"ready_when" |  An application readiness state, at which to hide the launch screen. If undefined, defaults to first-paint application readiness state.
"default" | The launch screen to use for both landscape and portrait mode.


* **ready_when**:

Application readiness state | Preconditions
--- | ---
"first-paint" | * The first visually non-empty paint has occurred.
"complete" | * The first visually non-empty paint has occurred. <br> * All the resources have been loaded.<br> **_WARNING: It will take a long time as it need to wait until all sub resources are downloaded._**
"custom" | * The first visually non-empty paint has occurred. <br> * The ```window.screen.show()``` method was called.


* **default.image**: The image which will be stretched to the entire viewport.
* **Supported image formats**: png, bmp, jpg, gif<br>
