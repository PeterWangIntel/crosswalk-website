Currently [Tizen Device API](https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/index.html) with Crosswalk works only on Linux. The implementation is under heavy developed, please track https://github.com/crosswalk-project/tizen-extensions-crosswalk/wiki/APIs for latest status.

### How to Build

1. If you do not have a Crosswalk binary, **[Follow the regular steps to build Crosswalk](Build-Crosswalk)**. The remaining instructions will assume that Crosswalk base directory is `~/dev/crosswalk`. That directory should contain an src subdirectory, and inside `src`, there's a `xwalk` directory. At this point there must be a ~/dev/crosswalk/src/out/Release/xwalk executable

1. `cd ~/dev`

1. `git clone git@github.com:crosswalk-project/tizen-extensions-crosswalk.git`

1. `cd tizen-extensions-crosswalk`

1. `export GYP_GENERATORS=ninja`

1. ./configure or `gyp -D extension_build_type=Release --depth=. tizen-wrt.gyp` for Release build. Add `-D extension_host_os=desktop` for desktop environment.

1. ninja -C out/Default

1. There should be several libtizen_xxx.so under `~/dev/tizen-extensions-crosswalk/out/Default` file after make runs.

1. `./run.sh` (make sure xwalk in your $PATH)

### BKMs
#### Remote debugging
1. `./run.sh --remote-debugging-port=9222` then follow https://github.com/crosswalk-project/crosswalk/wiki/Try-Crosswalk#debug-your-web-app