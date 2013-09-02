This page is intended to document the command line options specific to Crosswalk.

|   Name     |    Description     |     Example
-------------|--------------------|------------------
```--app-icon``` | Specified the icon file path for the app window, support both ICO and PNG file format. | ```xwalk.exe --app-icon=XXX.png``` 
```--data-path```  | Specifies the folder name in system configuration folder for the web app launched by Crosswalk. On Linux, the configuration folder is $HOME/.config, while on Windows, it is ```$USER/AppData/Local``` | ```xwalk.exe --data-path=myapp```. You will find a new directory named ```myapp``` created under xwalk.exe working directory. 
```--fullscreen``` | Launch the application with fullscreen window. | ```xwalk.exe --fullscreen```. You will find Crosswalk launch with fullscreen window
```--remote-debugging-port``` | Enable remote debugging on the given local host port. | ```xwalk.exe --remote-debugging-port=9222```. Try to access 'http://localhost:9222' in Chrome Browser, you will all inspectable pages opened by Crosswalk 