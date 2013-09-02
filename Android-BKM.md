### adb no permissions on linux
1. Create a file named /tmp/android.rules with following content
```
  SUBSYSTEM=="usb", ATTRS{idVendor}=="8087", MODE="0666"
```
2. Execute following command
```
sudo cp /tmp/android.rules /etc/udev/rules.d/51-android.rules
sudo chmod 644   /etc/udev/rules.d/51-android.rules
sudo chown root. /etc/udev/rules.d/51-android.rules
sudo service udev restart
sudo killall adb
```
3. Disconnect the USB cable between the phone and the computer, reconnect the phone.
4. Run `adb devices` to confirm that now it has permission to access the phone. 

### Adjust default parameter
1. Edit a file named “xwview-shell-command-line” with content:
`Xwalk  –your-command-line-1  --your-command-line-2`

2. Push it to device:
`adb push xwview-shell-command-line /data/local/tmp/xwview-shell-command-line`
