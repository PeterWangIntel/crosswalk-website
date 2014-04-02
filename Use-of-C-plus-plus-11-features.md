See also https://github.com/crosswalk-project/crosswalk-website/wiki/Coding-Style-of-XWalk-for-Android

ML discussion https://lists.crosswalk-project.org/pipermail/crosswalk-dev/2014-March/001233.html

The consensus at the moment seems to be to allow use of C++0x features for extensions, as they typically are platform (and thus compiler) bound.

## Chromium upstream

Currently, chromium officially does not support c++11 because of gcc on linux, cros and android. 
https://groups.google.com/a/chromium.org/forum/?fromgroups=#!searchin/chromium-dev/space$20android/chromium-dev/oVTPsijC7d0/WDcnq3AyE4gJ
* windows: msvs2012
* mac: clang
* linux: gcc4.7, clang
* chromeos: gcc4.7
* android: gcc4.6

After every platforms support gcc 4.8, chromium would support c++11.

## Gcc 4.6 features (relevant for Android)

http://gcc.gnu.org/gcc-4.6/cxx0x_status.html

Notable:
* Initializer lists
* `auto`-typed variables
* Lambdas
* Null pointer constant
* Strongly-typed enums
* Unicode and raw string literals
* Range-based `for`

## Gcc 4.7 features (relevant for Linux)

http://gcc.gnu.org/gcc-4.7/cxx0x_status.html

Changes over 4.6 http://gcc.gnu.org/gcc-4.7/changes.html#cxx

Notable:
* explicit override
* non-static data member initializers
* delegating constructors
