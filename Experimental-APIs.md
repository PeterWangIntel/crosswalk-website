This page describes the current JS Experimental APIs. These APIs are accessible through `xwalk.experimental`.

**IMPORTANT:** We hold no compromise with the experimental APIs. They can be modified/updated/removed at any time. They can also be promoted to the stable API set when ready (becoming accessible through `xwalk` directly).

### xwalk.experimental.dialog

#### showOpenDialog
Displays a native Open File or Open Directory dialog. Its prototype is `showOpenDialog = function (allowMultipleSelection, chooseDirectory, title, initialPath, fileTypes, callback)`, where:

* allowMultipleSelection - If true then multiple files/directories can be selected.
* chooseDirectory - If true then only directories can be selected.
* title - Title of the open dialog.
* initialPath - Initial path to display in the dialog. NULL or "" for current path.
* fileTypes - Array of strings specifying the selectable file extensions.
* callback = function(error, selection) - Async callback. Selection is an array of the names of the selected files.


#### showSaveDialog
Displays a native Open File or Open Directory dialog. Its prototype is `showSaveDialog = function (title, initialPath, proposedNewFilename, callback)`, where:

* title - Title of the Save As dialog.
* initialPath - Initial path to display in the dialog. NULL or "" for current path.
* proposedNewFilename - Filename proposal to be used for saving the file.
* callback = function(error, absoluteFilePath) - Async callback. Absolutefilepath is the absolute path to the saved file.