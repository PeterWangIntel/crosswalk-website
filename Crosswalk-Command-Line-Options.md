This page is intended to document the command line options specific to Crosswalk.

Note that when you build a Crosswalk application for Android, you can [define command-line options for the runtime when building the package with make_apk.py](Use-Chromium-command-lines-in-your-apps-on-Android).

In the examples below, the Crosswalk binary is denoted with `xwalk`. On Windows, the executable is called `xwalk.exe`. On Tizen, it is in `/usr/lib/xwalk/xwalk`; but Crosswalk applications are typically launched via the Crosswalk service, defined in `/usr/lib/systemd/user/xwalk.service`.

|   Name     |    Description     |     Example
-------------|--------------------|------------------
```--app-icon``` | Specified the icon file path for the app window, support both ICO and PNG file format. | ```xwalk --app-icon=XXX.png``` 
```--data-path```  | Specifies the folder name in system configuration folder for the web app launched by Crosswalk. On Linux, the configuration folder is $HOME/.config, while on Windows, it is ```$USER/AppData/Local``` | ```xwalk --data-path=myapp```<br>Data goes into a new directory named ```myapp``` under xwalk working directory.
```--fullscreen``` | Launch the application with fullscreen window. | ```xwalk --fullscreen```<br>Launch Crosswalk in full screen mode.
```--remote-debugging-port``` | Enable remote debugging on the given local host port. | ```xwalk --remote-debugging-port=9222```<br>Access 'http://localhost:9222' in Chrome Browser to see all inspectable pages running under Crosswalk.
```--list-features-flags``` | List all the features flags of Crosswalk. | ```xwalk --list-features-flags```<br>Display a list of all the feature flags of Crosswalk and the command line argument to switch them on or off.