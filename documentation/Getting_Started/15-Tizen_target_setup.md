# Tizen target setup

To run Crosswalk applications on Tizen, you must install the Crosswalk runtime on each target. (Unlike Crosswalk for Android, it is currently not possible to bundle the Crosswalk runtime with the application for deployment to Tizen.)

Tizen extensions for Crosswalk are also available, which enable you to make use of [Tizen APIs](https://developer.tizen.org/documentation/dev-guide/2.2.1?redirect=https%3A//developer.tizen.org/dev-guide/2.2.1/org.tizen.web.appprogramming/html/api_reference/api_reference.htm) in applications running in Crosswalk on Tizen. We don't need them for this tutorial, so we won't cover them here.

Crosswalk is available for Tizen version 2.1 or higher.

In the instructions below, `<path to Tizen SDK>` refers to the path to the root directory of your Tizen SDK installation.

## Tizen device

At the time of writing (April 2014), there are no Tizen devices on the market, so your only option is to use an emulated Tizen device.

## Tizen emulator

To test your application on Tizen, use an emulated x86 device. This can be installed via the Tizen SDK install manager:

<ol>

<li>Start the Tizen SDK Install Manager:
  <ul>
    <li>
      <p>On Windows:</p>

<pre>
> cd <path to Tizen SDK>
> .\install-manager\inst-manager.exe
</pre>
    </li>

    <li>
      <p>On Linux, run the Tizen `.bin` file you originally downloaded, e.g.:</p>

<pre>
> ./tizen-sdk-ubuntu64-v2.2.32.bin
</pre>
    </li>
  </ul>
</li>

<li>Select <em>Install or update the Tizen SDK</em>, then select the <em>Next</em> button.</li>

<li>
  <p>Select the Tizen system image and emulator from the list of components available:</p>

<pre>
[ ] Common Tools
  [x] Emulator

[ ] Platforms
  [ ] Tizen 2.2
    [x] Platform Image
</pre>

  <p>Then select <em>Install</em>.</p>
</li>

</ol>

<p>Once the download is complete, you can create a Tizen virtual machine (VM) - an emulated Tizen device:</p>

<ol>

<li>
  <p>Start the Tizen Emulator Manager.</p>

  <ul>
    <li>On Windows:

<pre>
> cd <path to Tizen SDK>
> .\tools\emulator\bin\emulator-manager.exe
</pre>
    </li>

    <li>On Linux:

<pre>
> cd <path to Tizen SDK>
> ./tools/emulator/bin/emulator-manager
</pre>
    </li>
  </ul>
</li>

<li>
Once the manager has loaded, ensure that the drop-down menu in the top-left of the window has <strong>x86-standard</strong> selected; then select <em>Create New VM</em>.
</li>

<li>
  <p>Set the name to <strong>Tablet</strong> and ensure that <em>Base Image</em> is set to <strong>emulimg-2.2.x86</strong>. Accept the defaults for the other settings and select <em>Confirm</em> to create the VM.</p>

  <p>The result should look like this:</p>

  <p><img src="assets/tizen-emulator-manager.png"></p>
</li>

<li>
  <p>To run the image, stay in the Tizen Emulator Manager and click the play button for the VM (see above). The emulator should now run your VM:</p>

  <p><img src="assets/tizen-emulated-running.png"></p>
</li>

<li>
  <p>Download a Crosswalk Tizen 3.0 Mobile (x86) (canary) rpm file from <a href="#documentation/downloads">the Downloads page</a>.</p>
</li>

<li>
  <p>Copy the rpm to the <code>/home/developer/</code> directory on the Tizen target:</p>

<pre>
# on the host machine
> sdb push crosswalk*.rpm /home/developer/
</pre>
</li>

<li>
  <p>The final step is to install the Crosswalk Tizen rpm on the VM. This can be done by using <code>sdb</code> to get a root shell on the VM:</p>

<pre>
# on the host machine
> sdb root on

Switched to 'root' account mode

# get a root shell on the VM
> sdb shell
sh-4.1#

# now we're on the VM (note that your prompt may
# be slightly different from "sh-4.1#")

# install the Crosswalk Tizen rpm
sh-4.1# rpm -ih /home/developer/crosswalk*.rpm
</pre>
</li>

<li><p>Still in the shell on the VM, test that crosswalk has installed and is working:</p>

<pre>
sh-4.1# xwalk
</pre>

</li>

</ol>

<p>The VM is now set up and ready to use as a Tizen deployment target.</p>
