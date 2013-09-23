# Crosswalk Testing Framework

Since Crosswalk is designed to be built upon content layer, besides the test suites written in content layer, it is important for Crosswalk to setup its own testing framework besides the existing tests written in content module.

## Existing tests in content

All content tests can be found in src/content/content_tests.gypi file.

* content_unittests 
* content_browsertests
* video_decode_accelerator_unittest (For Windows, ChromeOS)
* h264_parser_unittest (For ChromeOS, Linux)

We can make use of these tests for Crosswalk as possible to make sure nothing is broken once code change in content layer, and we might still need to build content_shell executable binary to run these tests.

## Tests in Crosswalk

In Chromium, several kinds of testing are provided from Chrome, see [Chromium Testing and Infrastructure](https://sites.google.com/a/chromium.org/dev/developers/testing).

For Crosswalk, to ensure the code quality, at least 2 kinds of testing should be developed along with the process of feature development and bug fixing.

### Unit Test
Unit test is intended to test whether a function works as expected. The unit test writing is based on gtest framework. Use TEST_F to add test case into testing framework. See [here](https://code.google.com/p/googletest/) for more information about gtest.

### Browser Test
Browser test is another special unit test which is considered as Crosswalk integration test. It requires all test cases MUST run in the browser process, which means the browser environment and context must have been setup and bring up a browser window to load a given URL. For example, you can query the title and URL of web contents loaded in the browser window. 

Similarly with Chromium does, we also define `InProcessBrowserTest` derived from `content::BrowserTestBase` to help set up the browser testing environment and use `IN_PROC_BROWSER_TEST` to define browser test case. See `content/public/test/browser_test.h` and `content/public/test/browser_test_base.h` for `IN_RPOC_BROWSER_TEST` macro definition and `BrowserTestBase` class.

To use `InProcessBrowserTest` do the following:
* Use the macro `IN_PROC_BROWSER_TEST_F` to define your test.
* Your test method is invoked on the UI thread. If you need to block until state changes you'll need to run the message loop from your test method.
* If you subclass and override SetUp, be sure and invoke `InProcessBrowserTest::SetUp`. (But see also `SetUpOnMainThread`, `SetUpInProcessBrowserTestFixture` and other related hook methods for a cleaner alternative).

## Tests in Android port
The instrumentation tests for Android port has been enabled for runtime core but not for app wrapper(will be supported soon). To understand the background of this kind of tests, please refer to [Testing Android](http://developer.android.com/tools/testing/testing_android.html). Below is the instruction on how to run instrumentation tests for crosswalk runtime core:
* Set up the environment for Android build for IA. It's always needed when running instrumentation tests.
```
    . xwalk/build/android/envsetup.sh --target-arch=x86
```
* Build the testing APK for runtime core and install it to the target Android device.
```
    ninja -C out/Release xwalk_core_test_apk
    build/android/adb_install_apk.py --release --apk XWalkCoreShell.apk
```
* Run all testing cases
```
    build/android/run_instrumentation_tests.py --release --test-apk XWalkCoreTest --test_data xwalkview:xwalk/test/data/device_files/  --verbose -I
```

## Code Reviewing and Trybots
Crosswalk's developer is required to add test for any non-trivial code change. A effective and collaborate testing for your code is always a good practice when uploading a patch to trunk. Generally, a reviewer might reject a patch without testing code.

The trybots will run the tests firstly before checking in a patch into trunk. The patch is allowed to be checked in only if all tests are passed (Green).

## References
1.  [Chromium Testing Infrastructure](https://sites.google.com/a/chromium.org/dev/developers/testing)
1.  [Browser Tests](https://sites.google.com/a/chromium.org/dev/developers/testing/browser-tests)
1.  [Google test framework](https://code.google.com/p/googletest/)