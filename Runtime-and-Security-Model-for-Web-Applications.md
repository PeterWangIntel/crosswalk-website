## Introduction

1. [The Latest Version](http://runtime.sysapps.org/)
1. [The standalone manifest spec](http://manifest.sysapps.org/)
1. [github repo](https://github.com/sysapps/runtime)
1. [System Applications Working Group](http://www.w3.org/2012/sysapps/)
1. [Meeting minutes of the first F2F meeting was held 9-11 April 2013 in Madrid and hosted by Telefonica](http://www.w3.org/2013/04/09-sysapps-minutes.html)

## The API

- ApplicationRegistry
 - DOMRequest install (DOMString manifestUrl, [Optional] Object parameters); **(Permission check)**
 - DOMRequest getSelf ();
 - DOMRequest getInstalled ();
 - DOMRequest checkInstalled (DOMString manifestURL);
 - attribute ApplicationManagement? management;
- Application
 - readonly attribute DOMString origin;
 - readonly attribute Object manifest;
 - readonly attribute DOMString installOrigin;
 - readonly attribute unsigned long installTime;
 - readonly attribute Object parameters;
 - DOMRequest launch (); **(Permission check)**
 - DOMRequest uninstall (); **(Permission check)**
 - readonly attribute DOMString updateState;
 - readonly attribute unsigned long downloadSize;
 - DownloadRequest? downloadUpdate ();
 - readonly attribute DOMString state;;
 - void hide ();
 - void exit ();
 - attribute EventHandler onlaunch;
 - attribute EventHandler onpause;
 - attribute EventHandler onresume;
 - attribute EventHandler onterminate;
- ApplicationManagement **(webapps-manage Allow access to the navigator.apps.management API to manage installed webapps.)**
 - DOMRequest getAll ();
 - DOMRequest applyUpdate (Application application);
 - attribute EventHandler oninstall;
 - attribute EventHandler onuninstall;

## Comparation of config.xml and application manifest
||config.xml|manifest|
|---|---|---|
|Configformat|xml|JSON|
|Package format|zip|zip|
|Zip contents|Fixed format(file name,folder name, locales..)|Only manifest|
|Application life cycle|`N/A`|3 status: running, paused, terminated|
|Supporting devices|Tizen,PhoneGap,BB,..|`N/A`|
|Security Model|'feature'|'required_features'|

## Comparation of Tizen web runtime and W3C runtime
Actually, Tizen web runtime could be looked as w3c widget + DeviceAPI/Application, since we've already compared widget and manifest, so let's go through the difference between DeviceAPI/Application and W3C runtime.

||Tizen DeviceAPI/Application|W3C runtime|
|---|---|---|
|Application Status|Visible,hidden,terminated|running, paused, terminated|
|Call back|`N/A`|onpause/onresume/onterminate/onlaunch|
|Background|hidden but running|`N/A`|
|Install/Uninstall|`N/A`|ApplicationRegistry/ApplicationManagement|
|Install/Uninstall call back|oninstalled/onuninstalled|oninstall/onuninstall|
|Able to update an existing application|`no`|`yes`|
|Able to enum all installed applications|`no`|`yes`|
|Able to find specific application|`yes`|`yes`|
|Able to launch another application|`yes`|`yes`|
|Launch parameter|`yes`|`N/A`|
|Launch callback|`yes`|`yes`|
|Extension point|Tizen|Navigator|

## Mozilla's Open Web App Manifest
 - [https://marketplace.firefox.com/developers/docs/manifests](https://marketplace.firefox.com/developers/docs/manifests)

## Updates - Apr/19/2013
 - First Public Working Draft 21 March 2013
 - Prefer JSON over XML, and consequently prefer runtime manifest over widget config.xml.
 - There will be a transition from widget to packaged app and therefore there will be a tool to convert xml to JSON.
 - Active members agreed this transition: Mozilla,Samsung,Intel,RIM (Blackberry)...
 - Currently widget Spec is used by: Tizen, BlackBerry, Cordova, etc..
 - Agreed that there should be a spec about mappings between widgets xml and runtime manifest

## Updates - Apr/22/2013
 - There has been a lot argument surrounding the new URI scheme -  app://
 - The URI:app is going to the FPWD.
 - The application manifest is going to be splitted into another specification whereas the reduced one will not.
  - [The new manifest spec](http://manifest.sysapps.org/)
  - [github location](https://github.com/sysapps/manifest)

## Updates - Apr/27/2013
  - Initiated the collaboration between sysapps group and webapps group to replace xml with JSON.
   - Discussing how to split the tasks, manifest, extensions, etc...