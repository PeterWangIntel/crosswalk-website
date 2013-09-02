We have two option: using aura, not using aura. If turning off aura, chromium uses Gtk in Linux and Win32 in Window.

# How content shell integrate Gtk toolkit.
## Look at Gtk window creation.
content shell creates WebContent via content api. Under content api layer, Gtk widget is created. We can get the Gtk widget pointer via content api. It means we will tightly depend on specific platform.

In Shell.cc, after creating WebContent, create Gtk window and several Gtk widgets (e.g. button, url field)
After that, Shell add Gtk widget of WebContent to a container widget. GetNativeView() returns gfx::NativeView type, but in linux it is GtkWidget.
`gtk_container_add(GTK_CONTAINER(vbox_), web_contents_->GetView()->GetNativeView());`

Following picture can help you see how content shell launches.
![launching Browser process](http://www.diagrammr.com/png?zx=0.5609126044437289&key=d6tP4hX5mnk)

## Integration point
If you are familiar with Gtk, it is easy to implement something like Minibrowser. You can get GtkWidget for contents via `web_contents_->GetView()->GetNativeView()`, and then just attach it to a container widget.

When loading pages that uses accelerated compositing, Gpu process actually draws XWindow buffer of Gtk widget. However, you don't need afraid. content api guarantees there is no data race of Window buffer between Browser process and Gpu process. It is implementation detail under the hood of content api. Just use Gtk widget of WebContents as normal Gtk Widget.

## Weak point
aura is brand new. chromium developer may put high priority on aura rather than old UI framework. Gtk way perhaps will be deprecated.

If we use aura, normal button and url field also have a benefit of GPU. For example, android chromium has a tab switching animation. Something like this animation can be more smooth with aura.

# How content shell integrate aura.
## Integration point
When turning on aura, we can not use our custom Gtk widget (as well as other platform UI toolkit). aura draws web content and url field in Gpu process. Using aura means we draw everything via only aura framework.

For example, if you want to add color chooser, how do you that? Using Gtk color picker widget? Unfortunately, you must implement color chooser window (aura term) for four ports: linux, mac, window and android.
So chromium developers are implementing color chooser window now. [Ash color chooser](https://sites.google.com/a/chromium.org/dev/developers/design-documents/aura/ash-color-chooser)

If we need something that chromium does not use yet, it is very tricky to implement it.

## Weak point
As mentioned, it is not proper for embedded WebView. Aura is framework itself. It is very hard to integrate with other framework.

aura is development stage. If you use chrome with aura, you can feel it is very creepy. When moving window, I often encountered crash.

In my opinion, our first target is Tizen. It is difficult to implement libxwalk.so for Tizen also.

# Reference
* [Understading Chromium Content shell](http://luxtella.blogspot.de/2013/05/chromium-launching-process.html)
* [How Gpu process draws contents on the surface of Browser process's window in chromium.](http://luxtella.blogspot.de/2013/05/how-gpu-process-draws-contents-on.html)
* [UI Framework and Graphics in chrome doc](https://sites.google.com/a/chromium.org/dev/developers/design-documents)