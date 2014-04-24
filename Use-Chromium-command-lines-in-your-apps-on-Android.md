Crosswalk is powered by Chromium and supports all [the command lines of Chromium](http://peter.sh/experiments/chromium-command-line-switches/). To achieve this, developers can directly use the "--xwalk-command-line" option in make_apk.py script when generating the application for Android.

For example, force enabling webGL for all devices in Crosswalk,
    `python make_apk.py --manifest=xwalk-simple/manifest.json --xwalk-command-line='--ignore-gpu-blacklist'`

If developers don't want to use make_apk.py, they could write a command line file named `xwalk-command-line` and put it under assets folder of the apk with the format:
    `xwalk --ignore-gpu-blacklist`