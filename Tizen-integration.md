### This document is deprecated. It will be removed.

# Build
* Define tizenos variable to build XWalk for Tizen OS
```
> ./xwalk/gyp_xwalk -Dtizenos=1 -Duse_aura=1 -Duse_gconf=0 -Duse_xi2_mt=2
```

# Integration points
## Integration with Tizen framework.
* XWalk runtime should handle various callbacks: pause, resume, low_battery, device_orientation, etc.
* There are two options: OSP layer or capi-appfw-application package.
* XWalk chooses capi-appfw-application because it is more thin.
```
struct _appdata ad;
memset(&ad, 0x0, sizeof(struct _appdata));
ad.name= PACKAGE;

app_event_callback_s event_callback;
event_callback.create = app_create;
event_callback.terminate = _terminate;
event_callback.pause = _pause; 
event_callback.resume = _resume;
event_callback.service = _service;
event_callback.low_memory = NULL; 
event_callback.low_battery = NULL; 
event_callback.device_orientation = NULL; 
event_callback.language_changed = _lang_changed;
event_callback.region_format_changed = NULL; 

app_efl_main(&argc, &argv, &event_callback, &ad);

```
* app_efl_main() calls elm_init() and elm_run().
 * So XWalk aura runtime is integrated with ecore main loop.

## Integration with Tizen Window Manager
* Illume2 is the window manager part of Tizen OS and communicates elementary via the x11 protocol (Couple of atoms with some information).
* There are two options: Communication using the atoms, or Implementing elementary window wrapper.
* XWalk chooses implementing elementary window wrapper because:
 * Prevent from depending Illume2's implementation detail.
 * XWalk already is integrated with ecore main loop, so it is easy to make elementary window.
