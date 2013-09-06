### Codec support in Crosswalk

The Crosswalk binary includes free codecs (<em>ffmpegsumo.dll</em> for Windows and <em>libffmpegsumo.so</em> for Linux). This enables HTML5 multimedia features (&lt;video&gt; and &lt;audio&gt; elements) to work by default.

The codecs included are:

 * Vorbis audio codec
 * Theora video codec
 * VP8 video codec
 * PCM

While free codecs are included with Crosswalk binary downloads, the instructions below explain how to download compiled versions of the free codecs manually, if desired.

We also provide instructions for developers who want to build the free codecs manually.

Finally, a developer can enable proprietary codecs in a Crosswalk build. When an xwalk binary with these codecs is started, the end user must accept the EULAs for those third-party codecs to use them. Instructions on how to create such a build are given below.

### Downloading free codecs

Follow the steps below to get the codecs for a Crosswalk binary release:

 1. Download the appropriate upstream Chromium build. For example, for the current Crosswalk release, fetch [chrome-win32.zip](https://commondatastorage.googleapis.com/chromium-browser-snapshots/Win/196631/chrome-win32.zip) for Windows or [chrome-linux.zip](https://commondatastorage.googleapis.com/chromium-browser-snapshots/Linux/196631/chrome-linux.zip) for Linux.
 2. Unzip and copy the <em>ffmpegsumo.dll</em> or <em>libffmpegsumo.so</em> file to the directory which contains the <em>xwalk</em> executable.
 3. Relaunch <em>xwalk</em> and multimedia will work.

### Building free codecs

Developers can also build the codecs for themselves. Please refer to [Crosswalk Build Instruction](Build-Crosswalk) for instructions. After building, the <em>ffmpegsumo.dll</em> or <em>libffmpegsumo.so</em> with open source codecs will be found in the build output directory.

### Enabling proprietary codecs

Examples of proprietary codecs include:

 * MP3 audio codec
 * AAC audio codec
 * H.264 video codec

To build Crosswalk with these codecs, a developer must run the build with the "must accept a EULA" switch turned on:

    $ xwalk/gyp_xwalk -Dmediacodecs_EULA=1

Then build Crosswalk. The <em>ffmpegsumo.dll</em> or <em>libffmpegsumo.so</em> in the build output directory will contain the proprietary codecs.

Refer to [Crosswalk Build Instruction](Build-Crosswalk) for more details.

Also please note you might need to take legal advice to determine and resolve potential licensing issues if you want to include these codecs in a build.

### References

For more details, please refer to [Chromium Audio/Video](http://www.chromium.org/audio-video).