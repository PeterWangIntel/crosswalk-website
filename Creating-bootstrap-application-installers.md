This tool is for developers who need to distribute their applications along with Crosswalk runtime in an all-in-one  installer.
## How to install:
Download all the files in the following URL put them into a folder:

   https://github.com/crosswalk-project/crosswalk/tree/master/tools/packaging/bootstrapped

## How to use:
For Windows, run "create_windows_installer.bat --help" to see the usage of the tool.<br>
For Linux, run "./create_linux_installer.sh --help" to see the usage of the tool.
### Notes:
On Windows, if you specify --app_arguments, you'd better specify the full path of your app's startup page. For example:

    --app_arguments="--allow-file-access-from-files [INSTALLDIR]src/index.html" 

<br>
[INSTALLDIR] will be replaced with the actually installed dir of your application.
### Examples:

    create_windows_installer.bat webapps-scientific-calculator-master --wix_bin_path="C:\Program Files (x86)\WiX Toolset v3.7\bin" --xwalk_path="C:\Users\zchen42\Desktop\xwalk paking\xwalk-win32"


