## Building a Crosswalk Application
An application package is a compressed archive containing all of your application resources and a manifest file.

### Manifest File
The following is a minimal example for a manifest file, which should be named manifest.json and reside in your application's top level directory:
```
{
  "name": "Sample App",
  "manifest_version": 1,
  "version": "1.3.5.2",
  "app": {
    "launch":{
      "local_path": "index.html"
    }
  }
}
```
For more details on the manifest file, see the [Crosswalk Manifest](#wiki/Crosswalk-manifest) entry in the [Wiki](#wiki) section.

### The Application Package
Assuming a directory structure as follows:
```
application/manifest.json
application/index.html
application/appliactions.js
application/assets/images.jpg
```
You create the archive by running the following:
```
cd application
tar czvf ../application.tgz .
```