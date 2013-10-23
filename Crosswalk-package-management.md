# Package Management
The document will introduce that how the Crosswalk runtime will manage the application package, such as installation, uninstall, launching and so on.

## XPK package supporting
### XPK package format
 * Application package is zip format with a magic header.
 * Application package file extension should be "xpk".
 * Magic header contains:
   - Magic string at beginning: ```CrWk```
   - Public key size
   - Signature key size
   - Public key value
   - Signature key value
 * The package, the raw zip file, is signed by the private key with RSA algorithm using the SHA-1 hash function, and the Signature key is the result.
 * The package is validated by the public key and the Siguature key.
 * The package file structure looks like this:

| address(byte) | item | value/type |
|----------|---------|---------|
| 0~3 | magic string | "CrWk"/uint8
| 4~7 | public key size | uint32
| 8~11 | signature key size | uint32
| 12~12+public key size-1 | public key | uint8[]
| 12+public key size~12+public key size+signaure key size-1 | signature key | uint8[]
| 12+public key size+signaure key size~file end | zip file | uint8[]

### XPK package generator (Bash shell version)
XPK package is very similar as CRX Format, the reference link is: [CRX Format](http://developer.chrome.com/extensions/crx.html), and here is a generator shell adapted from the example:

```bash
#!/bin/bash -e
#
# Purpose: Pack a CrossWalk directory into xpk format
# Modified from http://developer.chrome.com/extensions/crx.html

if test $# -ne 2; then
  echo "Usage: `basename $0` <unpacked dir> <pem file path>"
  exit 1
fi

dir=$1
key=$2
name=$(basename "$dir")
xpk="$name.xpk"
pub="$name.pub"
sig="$name.sig"
zip="$name.zip"
trap 'rm -f "$pub" "$sig" "$zip"' EXIT

[ ! -f $key ] && openssl genrsa -out $key 1024

# zip up the xpk dir
cwd=$(pwd -P)
(cd "$dir" && zip -qr -9 -X "$cwd/$zip" .)

# signature
openssl sha1 -sha1 -binary -sign "$key" < "$zip" > "$sig"

# public key
openssl rsa -pubout -outform DER < "$key" > "$pub" 2>/dev/null

byte_swap () {
  # Take "abcdefgh" and return it as "ghefcdab"
  echo "${1:6:2}${1:4:2}${1:2:2}${1:0:2}"
}

crmagic_hex="4372 576B" # CrWk
pub_len_hex=$(byte_swap $(printf '%08x\n' $(ls -l "$pub" | awk '{print $5}')))
sig_len_hex=$(byte_swap $(printf '%08x\n' $(ls -l "$sig" | awk '{print $5}')))
(
  echo "$crmagic_hex $pub_len_hex $sig_len_hex" | xxd -r -p
  cat "$pub" "$sig" "$zip"
) > "$xpk"
echo "Wrote $xpk"
```
You can save the shell script content into a file, e.g "xpk_generator", then:
```sh
$ chmod u+x xpk_generator
$ ./xpk_generator xpk_package_directory_path private_key_file
```
It will generate a xpk file in current directory. If there's no private key file, it'll generate one for this application, and please use the same private key file for this application next time, otherwise, the package will be recognized as a different one.

### XPK package generator (Python version)
* There is a new Python version XPK package generation tool named ```make_xpk.py``` in ```xwalk/tools``` directory, it has the same usage as "xpk_generator" shell script. Like this:
```sh
$ python path_to/xwalk/tools/make_xpk.py xpk_package_directory_path private_key_file
```
A XPK package will be generated at the present directory.
* The ```make_xpk.py``` is required an additional Python plugin [Pycrypto](https://www.dlitz.net/software/pycrypto/)
* When generating the XPK package, please make sure there's a manifest file, named ```manifest.json```, placed at the package root directory, with this [format](https://github.com/crosswalk-project/crosswalk-website/wiki/Crosswalk-manifest#crosswalk-manifest-format)

## XPK package management
This section will introduce the process and usages that Crosswalk runtime how to manage the xpk package, like install, uninstall.
### Application information storage
It is a JSON file database, will save applications' information in it.
 * The data base file named: ```applications_db```, and placed under CrossWalk data directory, which is ```$HOME/.config/xwalk``` in Linux, ```%LocalAppData%\xwalk``` in Windows, and ```/opt/usr/apps/``` in Tizen Mobile OS.
 * The preferences file is JSON format, and will save such info in it for each application:
   - Installed time, it's the time for when the application is installed, it's saved as a double number type.
   - Manifest, it will save all the contains of application's manifest file
   - Install path, where to place the application resources.
   - Key value, the key value is to identify each record in database, the key value is application ID.

### Install
 * Start install function when the switch "--install" is enabled in the command line, and with the application package url follow it.
```sh
$ xwalk --install path/to/target.xpk
```
 * Prepare the XPK package
   - If the package path is invalid, exit the steps.
 * Verify the application package
   - Check the package's magic header, if the magic string is **not** "CrWk", then exit the steps.
   - Verify the package with the signature key and public key included in the header by SHA1 algorithm. If it's not match, exit the steps.
   - Check if the package with same ID has been installed in the runtime, if yes, exit the steps.
 * Decompress the package
   - Unpack the package as a zip file to a temporary directory, if there are some wrong, exit the steps.
 * Parse and verify the manifest included in the package
   - Read and parse the manifest file, manifest.json, in the package root directory, if any errors, exit the steps.
   - Check each items in the manifest, if any errors, exit the steps.
 * Save application info
   - Generate the application id by the public key in the magic header, if any errors, exit the steps.
   - Move the unpacked the package into the applications storage dirctory, which is ```$xwalk_data_path/applications/```, and rename the package root directory as application ID. If any errors, exit the steps.
   - Save the application info into application information storage.   

### Uninstall
 * Start the uninstall functionality with the swith "--uninstall" in command line, and using the application ID as its argument. Like this:
```sh
$ xwalk --uninstall application_ID
```
 * Query the record using application ID in appliation information database, when it's invalid, exit the steps.
 * Remove the application information in database, if any errors, exit the steps.
 * Remove the application resources.

### Launch
 * An application will be launched when using ```xwalk``` command with its id followed.
```sh
$ xwalk application_ID
```
 * Check if the application information is valid in database. If no, exit the steps.
 * Read the application's manifest from application information database and parse it. If any errors, exit the steps.
 * Check the application resources path saved in database, if the directory is not exist, exit the steps.
 * Start to launch an application normally.

### List installed applications
 * Crosswalk runtime can list all installed applications from command line, like this:
```sh
$ xwalk --list-apps
[1023/151523:INFO:xwalk_browser_main_parts.cc(272)] Application ID                       Application Name
[1023/151523:INFO:xwalk_browser_main_parts.cc(273)] -----------------------------------------------------
[1023/151523:INFO:xwalk_browser_main_parts.cc(276)] cefebchicgfeafgeemhbknlehlaildhj     Numeroo
[1023/151523:INFO:xwalk_browser_main_parts.cc(276)] jhnafkobpahgnkbhiijoeijbchlfnjeh     Calculator
[1023/151523:INFO:xwalk_browser_main_parts.cc(276)] oaebeffdeaajdminlhgehcgmahiflini     Memory Match for Older Kids
[1023/151523:INFO:xwalk_browser_main_parts.cc(277)] -----------------------------------------------------
```
Applications ID and name will be displayed in standard IO stream.

# Tips
 * NOTE: The behavior explained before requires building from trunk, and is expected to ship in next release.