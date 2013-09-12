# Set up your Tizen environment
[Installing development tools](https://source.tizen.org/documentation/developer-guide/installing-development-tools)
* You must have gbs and mic
``` sudo apt-get install gbs mic```
* If you suffer Intel proxy, refer to [Using git at intel](https://opensource.intel.com/linux-wiki/Using_git)

[Creating a Tizen Platform Image from Scratch through Local Build](https://source.tizen.org/documentation/developer-guide/creating-tizen-platform-image-scratch-through-local-build)
For example, my .gbs.conf
```
[general]
tmpdir = /media/dshwang/ExtHDD/tmp
profile = profile.mobile_public
buildroot = ~/GBS-ROOT/
work_dir=.

[profile.mobile_public]
repos = repo.mobile_public_2.1
buildconf=/media/dshwang/ExtHDD/tizen/build-config/build.conf

[repo.mobile_public_2.1]
url = http://download.tizen.org/releases/2.1/tizen-2.1_20130517.6/

```