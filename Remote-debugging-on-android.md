## Map of Crosswalk versions to Chrome versions

Before debugging your web application, make sure the right Google Chrome version is installed on the host machine. If you fail to do this, **the remote debugging functionality may not work as expected**. The following table shows which version of Chrome you need to debug a given Crosswalk version.

### Version Mapping Table

| Crosswalk Version | Google Chrome Version |
|-------------------|-----------------------|
| Crosswalk-1 | >= 29 |
| Crosswalk-2 | >= 31 |
| Crosswalk-3 | >= 32 |
| Crosswalk-4 | >= 32 |
| Crosswalk-5 | >= 34 |
| Crosswalk-6 | >= 35 |
| Crosswalk-7 | >= 36 |

> You can also examine the Chrome version via the ```navigator.userAgent``` property in your web application.

## Remote debugging for XWalk Core Shell on Android

XWalkCoreShell is an internal test shell for Crosswalk developers. It enables remote debugging by default. 
Follow the steps 'Inspect web pages or web apps in Chrome Browser.

## Reference
* https://developers.google.com/chrome-developer-tools/docs/remote-debugging