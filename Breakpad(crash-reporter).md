### What is it?
Breakpad is an utility that allows you to distribute an application to users with compiler-provided debugging information removed, record crashes in compact "minidump" files, send them back to your server, and produce C and C++ stack traces from these minidumps. More info can be found [here](http://code.google.com/p/google-breakpad/wiki/GettingStartedWithBreakpad). 

### Why do we care?
Since Crosswalk is using Google's content layer from Chromium it uses Breakpad for crash reporting purposes. By default it reports the crash reports to Google servers which neither we nor Google would ideally want. We would like to customize it so that it,

1. Generates the crash report as per Crosswalk code and symbol information.
2. Sends it to Crosswalk server.

### Plan
TBD

### Design
TBD


### How to test crash Browser?
chrome --enable-crash-reporter-for-testing --crash-test

### How to test crash Renderer?
type about:crash in the omnibox

### Crash sequence in Browser


### Crash sequence in Renderer

