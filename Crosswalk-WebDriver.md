## Introduction
 
WebDriver is an open source tool for automated testing of webapps across many browsers. It provides capabilities for navigating to web pages, user input, JavaScript execution, and more.  Crosswalk WebDriver(CrosswalkDriver) is a standalone server which implements WebDriver's wire protocol for Crosswalk.  Part of code is ported from ChromeDriver.

Please feel free to send an email to <mailto:crosswalk-dev@lists.crosswalk-project.org> or https://lists.crosswalk-project.org/mailman/listinfo/crosswalk-dev if you have any questions, help with troubleshooting, and general discussion. 

All code is currently in the open source crosswalk project. You can build it or download binary direct.This site hosts CrosswalkDriver documentation, issue tracking, and releases.

You can also download binary from https://github.com/crosswalk-project/crosswalk-web-driver/blob/master/bin/xwalkdriver.

## For Linux xwalk:
(1) Build XwalkDriver by building the 'xwalkdriver' target and get an executable
binary in the build folder named 'xwalkdriver'.

(2) Build 'xwalk' target, install it in "/opt/crosswalk" or working path of
'xwalkdriver'.

(3) Use following python instructions to do a basic test.

<pre>
$ export PYTHONPATH=~/path/to/xwalkdriver/server:~/path/to/xwalkdriver/client
$ python
>>> import server
>>> import xwalkdriver
>>> cd_server = server.Server('/path/to/xwalkdriver/executable')
>>> driver = xwalkdriver.XwalkDriver(cd_server.GetUrl())
>>> driver.Load('http://www.google.com')
>>> driver.Quit()
>>> cd_server.Kill()
</pre>

## For Android xwalk:

(1) Build XwalkDriver by building the 'xwalkdriver' target and get an executable
binary in the build folder named 'xwalkdriver'.

(2) Enable remote debugging in your Android app source code, like this

    public void onCreate(Bundle savedInstanceState) {
        ...
        setRemoteDebugging(true); // Enable remote debugging
        super.onCreate(savedInstanceState);
        ...
    }

(3) Pakage your app by execute command

<pre>
    python make_apk.py --manifest=YOUR_APP_PATH/manifest.json
</pre>

(4) Install your apk to device.

(5) Install Selenium package by executing command

<pre>
    pip install selenium
</pre>

(6) Run xwalkdriver binary.

(7) Execute following commands to test:

<pre>
$ python
>>> from selenium import webdriver
>>> capabilities = {
  'xwalkOptions': {
    'androidPackage': 'YOUR_PACKAGE_NAME',
    'androidActivity': '.YOUR_ACTIVITY_NAME',
  }
}
>>> driver = webdriver.Remote('http://localhost:9515', capabilities)
>>> driver.execute_script("alert('aaaa')")
</pre>

## For Tizen xwalk:
(1) Install and launch the xwalk as server mode on Tizen IVI:

<pre>
su - app
export XDG_RUNTIME_DIR="/run/user/5000"
export DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/5000/dbus/user_bus_socket
systemctl --user status xwalk.service
xwalkctl -i /'path'/wrt-rtbin-tizen-tests.xpk
</pre>

(2) Set remote debug port by insert "--remote-debugging-port='PORT'" into "/usr/lib/systemd/user/xwalk.service" on Tizen IVI.

(3) Connect Tizen IVI and PC with sdb.

a). Run the follow command on Tizen IVI:
 
<pre>
#systemd start sdbd_tcp
</pre>

b). Run the follow command on PC: 
<pre>
$sdb connect tizen_ivi_ip
$sdb root on
</pre>

(4) If Selenium package not installed on PC. Install Selenium package by executing command

<pre>
    pip install selenium
</pre>

(5) Run xwalkdriver binary on PC.

<pre>
$./xwalkdriver --sdb-port=26099
</pre>

(6) Execute following commands to test:

<pre>
$ python
>>> from selenium import webdriver
>>> 
capabilities = {
  'xwalkOptions': {
    'tizenDebuggerAddress': '10.238.158.97:9333',
    'tizenAppId': 'ihogjblnkegkonaaaddobhoncmdpbomi',
  }
}
>>> driver = webdriver.Remote('http://localhost:9515', capabilities)
>>> driver.title
>>> driver.save_screenshot("screenshottest.png")
>>> driver.quit()
</pre>

## Related Links

* ChroemDriver: https://sites.google.com/a/chromium.org/chromedriver/home
* CrosswalkDriver Source Code: https://github.com/crosswalk-project/crosswalk-web-driver.