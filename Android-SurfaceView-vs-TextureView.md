This page is intended to briefly introduce the differences between SurfaceView and TextureView.

### SurfaceView and TextureView

Both [SurfaceView](http://developer.android.com/reference/android/view/SurfaceView.html) and [TextureView](http://developer.android.com/reference/android/view/TextureView.html) are inherited from android.view.View class. They can be drawn and rendered from a separate thread, which is the major difference from other views. The feature of drawing separately is employed by Crosswalk to improve rendering performance greatly by a dedicated GPU thread.

SurfaceView provides a dedicated drawing surface embedded inside of a view hierarchy. You can control the format of this surface and, if you like, its size; the SurfaceView takes care of placing the surface at the correct location on the screen. Its behavior is more or less similar as an onscreen Window on a traditional desktop system, for example, XWindow on X11 system which can be frameless and embedded inside another XWindow.

The followings are two limitations of SurfaceView:
* You can not be animated, transformed and scaled;
* You can not overlay two SurfaceView.

TextureView looks like a general View. You can animate, transform and scale it, just like a TextView. TextureView can only be used in a hardware accelerated window. However, TextureView will consume much more memory than SurfaceView, and also may have a 1~3 frame latency. See the discussion on [3]

### Use Animitable XWalkView

Crosswalk Embedding API for Android supports both SurfaceView and TextureView very well. The [XWalkView](https://crosswalk-project.org/apis/embeddingapidocs/reference/org/xwalk/core/XWalkView.html) uses SurfaceView as default, but it allows your to use TextureView as well in case of:

* You want to make XWalkView can be animated and transformed, or
* You want to overlay two XWalkViews

by setting the boolean flag [ANIMATIBLE_XWALK_VIEW](https://crosswalk-project.org/apis/embeddingapidocs/reference/org/xwalk/core/XWalkPreferences.html#ANIMATABLE_XWALK_VIEW) to true for TextureView usage.

1. http://developer.android.com/reference/android/view/SurfaceView.html
1. http://developer.android.com/reference/android/view/TextureView.html
1. https://groups.google.com/a/chromium.org/forum/#!topic/graphics-dev/Z0yE-PWQXc4