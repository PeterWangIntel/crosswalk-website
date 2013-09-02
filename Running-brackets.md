Currently Brackets with Crosswalk works only on Linux. We'll need three separate parts:

* Crosswalk. This is our application that runs web content.

* Brackets. Repository with HTML/JS files that implement the Brackets editor. We are using cmarcelo/test branch, because we need some modifications that are not available upstream.

* Brackets-Crosswalk. The external extension that adds features to Crosswalk so Brackets can run.

### Steps

1. If you do not have a Crosswalk binary, **[Follow the regular steps to build Crosswalk](Build-Crosswalk)**. The remaining instructions will assume that Crosswalk base directory is `~/dev/crosswalk`. That directory should contain an src subdirectory, and inside `src`, there's a `xwalk` directory. At this point there must be a ~/dev/crosswalk/src/out/Release/xwalk executable

1. `cd ~/dev`

1. `git clone git@github.com:cmarcelo/brackets.git`

1. `cd brackets`

1. `git checkout -b test origin/test`

1. `git submodule update --init`

1. `cd ~/dev`

1. `git clone git@github.com:crosswalk-project/brackets-crosswalk.git`

1. `cd brackets-crosswalk`

1. `make`

1. There should be a `~/dev/brackets-crosswalk/brackets.so` file after make runs.

1. `./run-brackets.sh PATH_TO_XWALK_EXECUTABLE ~/dev/brackets`

Note that not all features are working at the moment. It should be possible to see dialogs (Open File, Open Folder, Save As, etc) with native look and feel. 