This page is intended to document the command line options specific to Crosswalk.

Note that when you build a Crosswalk application for Android, you can [define command-line options for the runtime when building the package with make_apk.py](Use-Chromium-command-lines-in-your-apps-on-Android).

|   Name     |    Description     |     Example
-------------|--------------------|------------------
```--app-icon``` | Specified the icon file path for the app window, support both ICO and PNG file format. | ```xwalk.exe --app-icon=XXX.png``` 
```--data-path```  | Specifies the folder name in system configuration folder for the web app launched by Crosswalk. On Linux, the configuration folder is $HOME/.config, while on Windows, it is ```$USER/AppData/Local``` | ```xwalk.exe --data-path=myapp```. You will find a new directory named ```myapp``` created under xwalk.exe working directory. 
```--fullscreen``` | Launch the application with fullscreen window. | ```xwalk.exe --fullscreen```. You will find Crosswalk launch with fullscreen window
```--remote-debugging-port``` | Enable remote debugging on the given local host port. | ```xwalk.exe --remote-debugging-port=9222```. Try to access 'http://localhost:9222' in Chrome Browser, you will all inspectable pages opened by Crosswalk 
```--list-features-flags``` | List all the features flags of Crosswalk. | ```xwalk.exe --list-features-flags```. You will have a list of all the features flags of Crosswalk and the command line argument to switch them on or off