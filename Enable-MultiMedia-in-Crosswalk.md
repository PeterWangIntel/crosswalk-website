### Background
Since Crosswalk binary doesn't include any codecs, say `ffmpegsumo.dll` for Windows or `libffmpegsumo.so` for Linux, the HTML5 multimedia features (`<video>` and `<audio>`) cannot work by default. To enable multimedia in Crosswalk binary, end users need to download and install the third-part codecs. Developer has the option to build the codecs by themselves. 

Please note you might need to contact the legal for any potential licensing issues.

### Enable free codecs
They include:
 * Vorbis audio codec
 * Theora video codec
 * VP8 video codec
 * PCM

Please follow the steps for Crosswalk binary release:
 1. Download the appropriate upstream Chromium build. For example, for current Crosswalk release, fetch the [chrome-win32.zip](https://commondatastorage.googleapis.com/chromium-browser-snapshots/Win/196631/chrome-win32.zip) on Windows or the [chrome-linux.zip](https://commondatastorage.googleapis.com/chromium-browser-snapshots/Linux/196631/chrome-linux.zip) on Linux.
 2. Unzip and copy the `ffmpegsumo.dll` or `libffmpegsumo.so` to the directory which contains `xwalk` executable.
 3. Relaunch `xwalk`, the multimedia will work.

Developers can also build the codecs by themselves. Please refer to [Crosswalk Build Instruction](Build-Crosswalk). After build, the ffmpegsumo.dll or libffmpegsumo.so with open source codecs will be found in the build output directory.

### Enable proprietary codecs
They include:
 * MP3 audio codec
 * AAC audio codec
 * H.264 video codec

Developers need to build Crosswalk with "must accept a EULA" by one gyp definitions. Please refer to [Crosswalk Build Instruction](Build-Crosswalk):

    $ xwalk/gyp_xwalk -Dmediacodecs_EULA=1

Then build the Crosswalk. The `ffmpegsumo.dll` or `libffmpegsumo.so` in build output directory will contain the proprietary codecs.

### Reference
For more details, please refer to [Chromium Audio/Video](http://www.chromium.org/audio-video).
