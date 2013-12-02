This page is intended to document what Android versions Web APIs(SysApps) can work on.

# Details

| Category | API | Supported on Android versions |
-------------|--------------------|------------------
| Presentation | navigator.presentation | >= Android 4.2 |
| DeviceCapabilities CPU | xwalk.experimental.system.getCPUInfo()  | >= Android 4.0 |
| DeviceCapabilities Memory | xwalk.experimental.system.getMemoryInfo()  | >= Android 4.1 (Android 4.0 not supported due to a bug) |
| DeviceCapabilities Display | xwalk.experimental.system.getDisplayInfo()  | >= Android 4.2 |
| DeviceCapabilities Storage | xwalk.experimental.system.getStorageInfo() | >= Android 4.0 |

Notes:
Even if a devices supports Android 4.2, it doesn't mean all new features in Android 4.2 are already supported on some devices. For example, Presentation API can't work on ZTE Geek Phone(Android 4.2.2). 