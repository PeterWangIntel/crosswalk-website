This page is intended to document what Android versions Web APIs(SysApps) can work on.

# Details

| Category | API | Supported on Android versions |
-------------|--------------------|------------------
| Presentation | navigator.presentation | >= Android 4.2 |
| DeviceCapabilities CPU | xwalk.experimental.system.getCPUInfo()  | >= Android 4.0 |
| DeviceCapabilities Memory | xwalk.experimental.system.getMemoryInfo()  | >= Android 4.0  |
| DeviceCapabilities Display | xwalk.experimental.system.getDisplayInfo()  | >= Android 4.2 |
| DeviceCapabilities Storage | xwalk.experimental.system.getStorageInfo() | >= Android 4.1 |

Notes:
Even if a device is installed with Android 4.2, it doesn't mean all new features in Android 4.2 are already supported. For example, Presentation API introduced from Android 4.2 can't work on ZTE Geek Phone(Android 4.2.2). 