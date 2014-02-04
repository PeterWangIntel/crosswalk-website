*This is an archive page. The current "Getting started" docs are on [the Crosswalk website](http://crosswalk-project.org/#documentation/getting_started).*

<!-- page -->
<h1>Getting started with Crosswalk</h1>

<p>This site is designed to help you get up and running with Crosswalk as quickly as possible.</p>

<h2>Step 1 - Download Crosswalk</h2>

<p>The Crosswalk project currently provides binaries for Android and Tizen. Go to the <a href="http://crosswalk-project.org/#documentation/downloads">Downloads</a> page, pick your operating system, and download.</p>

<h2>Step 2 - Install Crosswalk on your device</h2>

<p>You can run Crosswalk either directly on a device supporting your selected operating system, or in one of the emulators provided by those operating system SDKs.</p>

<p>You can find steps for installing Crosswalk onto the device or into the emulator on the <a href="#installing-crosswalk">Installing Crosswalk</a> page.</p>

<h2>Step 3 - Package your application</h2>

<p>Crosswalk applications are made up of your HTML5 files and a manifest
file. When deploying your application, you would package those files
into a single archive. During development you can skip that step. The
steps for packaging your application are found on the <a href="#building-a-crosswalk-application">Building an application</a> page.</p>

<h2>Step 4 - Running your application</h2>

<p>The steps for pushing your application to the target device and
launching Crosswalk with your application are covered in the <a href="#running-a-crosswalk-application">Running an Application</a> section.</p>

<!-- page -->
<h1>Installing Crosswalk<a name="installing-crosswalk"></a></h1>

<h2>Android<a name="android"></a></h2>

<p>You will need to install the Android SDK, including <a href="http://developer.android.com/tools/help/adb.html">adb</a>, and use it to connect your device to your development machine or use the Android emulator.</p>

<ol><li>Install the <a href="http://developer.android.com/sdk/index.html">Android SDK</a>.</li>

<li>Download the Crosswalk binary for Android from a URL in [Downloads](http://crosswalk-project.org/#documentation/downloads).

<pre>
wget <a href="https://download.01.org/crosswalk/releases/android-x86/stable/crosswalk-*-x86.zip">https://download.01.org/crosswalk/releases/android-x86/stable/crosswalk-*-x86.zip</a>
</pre></li>
<li>Decompress the Crosswalk binary to access the various Android packages that can be installed:
<pre>
unzip crosswalk-*-x86.zip
</pre></li>
<li>Install the XWalkRuntimeLib package (This step is only necessary for the shared mode. See <a href="http://crosswalk-project.org/#wiki/Crosswalk-on-Android/packaging-modes">what are the shared and embedded modes</a>:
<pre>
adb install crosswalk-${XWALK-STABLE-ANDROID-X86}/apks/XWalkRuntimeLib.apk
</pre>
On successful completion, you should see the final string <em>Success</em> displayed.</li>
</ol><p>NOTE: If you have previously installed the XWalkRuntimeLib:</p>

<pre>
adb shell
pm uninstall org.xwalk.runtime.lib
</pre>

<p>You are now ready to install Crosswalk applications on your Android
system. If you go to your system Settings, you should see
<strong>XWalkRuntimeLib</strong> listed under the <strong>Apps/Downloaded</strong> list.</p>

<h2>Tizen<a name="tizen"></a></h2>

<p>These steps assume you have the <a href="https://developer.tizen.org/downloads/tizen-sdk">Tizen SDK</a> installed and correctly configured on your system.</p>

<p>You can use the Tizen emulator as a target for running and developing Crosswalk applications on Tizen.</p>

<ol>
<li>Install the <a href="http://developer.tizen.org/downloads/tizen-sdk">Tizen SDK</a>.</li>

<li>Download the Crosswalk binary for Tizen from the URL in <a href="http://crosswalk-project.org/#documentation/downloads">Downloads</a>. The exact URLs depend on the version of Crosswalk you intend to download.

<pre>
wget <a href="https://download.01.org/crosswalk/releases/tizen-mobile/stable/crosswalk-*-0.i586.rpm">https://download.01.org/crosswalk/releases/tizen-mobile/stable/crosswalk-*-0.i586.rpm</a>
wget <a href="https://download.01.org/crosswalk/releases/tizen-mobile/stable/crosswalk-emulator-support-$%7BXWALK-STABLE-TIZEN-X86%7D-0.i586.rpm">https://download.01.org/crosswalk/releases/tizen-mobile/stable/crosswalk-emulator-support-${XWALK-STABLE-TIZEN-X86}-0.i586.rpm</a>
wget <a href="https://download.01.org/crosswalk/releases/tizen-mobile/canary/tizen-extensions-crosswalk-0.26-0.i586.rpm">https://download.01.org/crosswalk/releases/tizen-mobile/canary/tizen-extensions-crosswalk-0.26-0.i586.rpm</a>
</pre>
</li>

<li>With the Tizen emulator started or a Tizen device connected to the computer, log into the device as root by default:
<pre>
sdb root on
</pre></li>
<li>Push the RPMs to the device:
<pre>
sdb push crosswalk-${XWALK-STABLE-TIZEN-X86}.rpm /tmp
sdb push tizen-extensions-crosswalk-0.26-0.i586.rpm /tmp
</pre></li>
<li>Install the RPMs on the device:
<pre>
sdb shell
# While in the shell on the Tizen device
rpm -i /tmp/crosswalk-${XWALK-STABLE-TIZEN-X86}-0.i586.rpm
rpm -i /tmp/tizen-extensions-crosswalk-0.26-0.i586.rpm
</pre></li>
<li>Additionally, if installing Crosswalk on the Tizen Emulator, you need to install an additional package:
<pre>
sdb push crosswalk-emulator-support-${XWALK-STABLE-TIZEN-X86}.rpm /tmp
sdb shell
rpm -i /tmp/crosswalk-emulator-support-${XWALK-STABLE-TIZEN-X86}-0.i586.rpm
</pre>
Please note that installing this package on an actual device can cause performance problems.</li>
<li>While still in the shell, you can launch xwalk:
<pre>
xwalk <a href="http://www.google.com">http://www.google.com</a>
</pre></li>
<li><em>Work in Progress</em> Installing Crosswalk will install an icon on the Tizen home screen.</li>
</ol>

<!-- page -->
<h1>Building a Crosswalk Application<a name="building-a-crosswalk-application"></a></h1>

<p>An application package is a compressed archive containing all of your application resources and a manifest file.</p>

<p>There are several sample applications which can be used as a seed for your project. These are listed on the <a href="http://crosswalk-project.org/#documentation/samples">Samples</a> page. The steps described below can be used to package those applications and deploy them into an Android or Tizen device.</p>

<h3>Manifest File</h3>

<p>The following is a minimal example for a manifest file, which should be named manifest.json and reside in your application's top level directory:</p>

<div class="highlight"><pre><span class="p">{</span>
  <span class="s">"name"</span><span class="o">:</span> <span class="s">"Sample App"</span><span class="p">,</span>
  <span class="s">"version"</span><span class="o">:</span> <span class="s">"1.3.5.2"</span><span class="p">,</span>
  <span class="s">"app"</span><span class="o">:</span> <span class="p">{</span>
    <span class="s">"launch"</span><span class="o">:</span><span class="p">{</span>
      <span class="s">"local_path"</span><span class="o">:</span> <span class="s">"index.html"</span>
    <span class="p">}</span>
  <span class="p">},</span>

  <span class="s">"icons"</span><span class="o">:</span> <span class="p">{</span>
    <span class="s">"128"</span><span class="o">:</span> <span class="s">"icon.png"</span>
  <span class="p">}</span>
<span class="p">}</span>
</pre></div>

<p>Note that the icons field is currently <strong>required</strong> if you intend to package your application for Android using the make_apk.py script. If you are only deploying to Tizen, it is optional.</p>

<p>At a minimum, the <code>icons</code> property should reference a 128 pixel square graphic to use as the icon for the application.</p>

<p>For more details on the manifest file, see the <a href="http://crosswalk-project.org/#wiki/Crosswalk-manifest">Crosswalk Manifest</a> entry in the <a href="http://crosswalk-project.org/#wiki">Wiki</a> section.</p>

<h2>The Application Structure<a name="the-application-structure"></a></h2>

<p>A typical application structure contains the manifest.json file in the root directory. The main entry point to the application is then referenced from that manifest file. In most applications this file is in the root directory as well.
</p><div class="highlight"><pre><span class="o">/</span><span class="n">home</span><span class="o">/</span><span class="n">foobar</span><span class="o">/</span><span class="n">dist</span><span class="o">/</span><span class="n">manifest</span><span class="p">.</span><span class="n">json</span>
<span class="o">/</span><span class="n">home</span><span class="o">/</span><span class="n">foobar</span><span class="o">/</span><span class="n">dist</span><span class="o">/</span><span class="n">index</span><span class="p">.</span><span class="n">html</span>
<span class="o">/</span><span class="n">home</span><span class="o">/</span><span class="n">foobar</span><span class="o">/</span><span class="n">dist</span><span class="o">/</span><span class="n">application</span><span class="p">.</span><span class="n">js</span>
<span class="o">/</span><span class="n">home</span><span class="o">/</span><span class="n">foobar</span><span class="o">/</span><span class="n">dist</span><span class="o">/</span><span class="n">assets</span><span class="o">/</span><span class="n">images</span><span class="p">.</span><span class="n">jpg</span>
</pre></div>

<h2>Packaging for Android<a name="packaging-for-android"></a></h2>

<p>The Android APK maker is included with the crosswalk-android binaries available in <a href="http://crosswalk-project.org/#documentation/downloads">Downloads</a>.</p>

<p>To package your own web application, unpack the Crosswalk app template tarball that was provided as part of the crosswalk-android ZIP archive.
</p><div class="highlight"><pre>tar xzvf xwalk_app_template.tar.gz
<span class="nb">cd </span>xwalk_app_template
</pre></div>
The xwalk_app_template contains utilities and dependencies for packaging an application into an APK file, so it can be installed on an Android device.
Since Crosswalk-3, it introduces a new packaging mode - embedded mode. Such that a version of Crosswalk can be bundled with each web application without depending on XWalkRuntimeLib.

<p><strong>Note</strong>: For this script to work, you should ensure that the android command from the Android SDK is on your path. It is located in /tools/android.</p>

<p>The xwalk_app_template supports three kinds of web application source:</p>

<ul><li><strong><a href="http://crosswalk-project.org/#wiki/Crosswalk-manifest">Crosswalk Manifest</a></strong>.</li>
<li><strong><a href="http://crosswalk-project.org/#wiki/Crosswalk-package-management">XPK package</a></strong>.</li>
<li><strong>Command line options</strong>. For example, '--app-url' for website, '--app-root' and '--app-local-path' for local web application.</li>
</ul><p><strong>Note</strong>: The manifest source and XPK source are preferred.</p>

<h3>Packaging from manifest source<a name="packaging-from-manifest-source"></a></h3>

<p>This feature is supported for Crosswalk-2 and later.
Below is an example of how to package a web app. We assume that the files for the app are in /home/foobar/dist and the manifest file is /home/foobar/dist/manifest.json:</p>

<p>For Crosswalk-3 and later:</p>

<p>Both shared and embedded modes are supported.
</p><div class="highlight"><pre>python make_apk.py --manifest<span class="o">=</span>/home/foobar/dist/manifest.json
  --mode<span class="o">=[</span>embedded <span class="p">|</span> shared<span class="o">]</span>
</pre></div>
For embedded mode, the APK 'FooBar_[arm | x86].apk' is written to the directory where you run the command. The APKs are architecture dependent, meaning that an APK with an *arm.apk suffix works on ARM devices, and an APK with an *x86.apk suffix works on x86 devices.
For shared mode, the APK 'FooBar.apk' is generated. This APK will work on both ARM and x86 devices (providing the shared runtime library is also installed).

<p>For Crosswalk-2:</p>

<p>Only shared mode is supported.
</p><div class="highlight"><pre>python make_apk.py --manifest<span class="o">=</span>/home/foobar/dist/manifest.json
</pre></div>
The architecture-independent APK 'FooBar.apk' is generated.

<h3>Packaging from XPK source<a name="packaging-from-xpk-source"></a></h3>

<p>This feature is supported for Crosswalk-3 and later.
Below is an example of how to package a web app. We assume that the files for the app are archived in FooBar.xpk, which is located at /home/foobar/FooBar.xpk:
</p><div class="highlight"><pre>python make_apk.py --xpk<span class="o">=</span>/home/foobar/FooBar.xpk <span class="se">\</span>
  --mode<span class="o">=[</span>embedded <span class="p">|</span> shared<span class="o">]</span>
</pre></div>
For embedded mode, the APK 'FooBar_[arm | x86].apk' is generated. For shared mode, the APK 'FooBar.apk' is generated.

<h3>Packaging from command line options<a name="packaging-from-command-line-options"></a></h3>

<p>For Crosswalk-3 and later:</p>

<p>Below you will find an example of how to package a local web app. We assume that the files for the app are in /home/foobar/dist and the main entry point HTML file is /home/foobar/dist/index.html:
</p><div class="highlight"><pre>python make_apk.py --package<span class="o">=</span>com.foo.bar --name<span class="o">=</span>FooBar <span class="se">\</span>
  --app-root<span class="o">=</span>/home/foobar/dist --app-local-path<span class="o">=</span>index.html <span class="se">\</span>
    --mode<span class="o">=[</span>embedded <span class="p">|</span> shared<span class="o">]</span>
</pre></div>
The apk file is output to the same directory as the make_apk.py script, with a filename  is the name you set with the --name flag.
For embedded mode, the APK 'FooBar_[arm | x86].apk' is generated. For shared mode, the APK 'FooBar.apk' is generated.

<p>For Crosswalk-1 and Crosswalk-2:</p>

<p>Only shared mode is supported. Below is an example of how to package a local web app. We assume that the files for the app are in /home/foobar/dist and the main entry point HTML file is /home/foobar/dist/index.html:
</p><div class="highlight"><pre>python make_apk.py --package<span class="o">=</span>com.foo.bar --name<span class="o">=</span>FooBar <span class="se">\</span>
  --app-root<span class="o">=</span>/home/foobar/dist --app-local-path<span class="o">=</span>index.html
</pre></div>
The architecture-independent APK 'FooBar.apk' is generated.

<p>For information on installing and running the application on Android,
see <a href="#running-on-android">Running on Android</a>.</p>

<h2>Packaging for Tizen<a name="packaging-for-tizen"></a></h2>

<p>To run Crosswalk packages on Tizen, web applications should be packaged using the XPK
package format. To package your own web application, you should save the
<a href="http://crosswalk-project.org/#wiki/crosswalk-package-management/xpk-package-generator-bash-shell-version">xpk_generator</a>
script to a local file, then call it like this:
</p><div class="highlight"><pre>xpk_generator /home/foobar/dist myapp.pem
</pre></div>
Then, an XPK package named <code>dist.xpk</code> should be created under the <code>/home/foobar</code>
directory.

<p>Note that the 'myapp.pem' (or whatever file name you chose) file is the XPK
package identity. It's generated the first time you created the web app XPK
package, and should use the same 'myapp.pem' file when packaging this web
app, otherwise the XPK package is treated as a new app.</p>

<p>To run your application in the Tizen environment, you can either launch xwalk manually,
directing it to load your application via the command line; or launch an
installed XPK package from the Tizen Home Screen. See the steps in
<a href="#running-on-tizen">Running on Tizen</a>.</p>

<!-- page -->
<h1>Running a Crosswalk Application<a name="running-an-application"></a></h1>

<h2>Running on Android<a name="running-on-android"></a></h2>

<p>Follow the steps for <a href="#packaging-for-android">Packaging on
Android</a>.
Once you have your APK, install it to your target device:
</p><div class="highlight"><pre>adb install -r <span class="o">[</span>FooBar.apk <span class="p">|</span> FooBar_arm.apk <span class="p">|</span> FooBar_x86.apk<span class="o">]</span>
</pre></div>
The application will now appear in your application list and can be
launched by clicking on its icon.

<h2>Running on Tizen<a name="running-on-tizen"></a></h2>

<h3>Launching unpacked Crosswalk applications on Tizen from command line<a name="launching-unpacked-crosswalk-applications-on-tizen-from-command-line"></a></h3>

<p>To access the files, xwalk needs to be launched as root
</p><div class="highlight"><pre>sdb root on
</pre></div>

<p>Set up port forwarding from the host port 9222 to the emulator port 9222
</p><div class="highlight"><pre>sdb forward tcp:9222 tcp:9222
</pre></div>

<p>Sync your application contents to the device
</p><div class="highlight"><pre>sdb push samples/hello_world /home/developer/hello_world
</pre></div>

<p>Launch Crosswalk. NOTE: This command passes the following parameters:
</p><div class="highlight"><pre><span class="o">--</span><span class="n">use</span><span class="o">-</span><span class="n">gl</span><span class="o">=</span><span class="n">osmesa</span>                <span class="n">Enable</span> <span class="n">WebGL</span> <span class="n">via</span> <span class="n">Mesa</span> <span class="p">(</span><span class="k">if</span> <span class="n">running</span> <span class="n">in</span>
                               <span class="n">the</span> <span class="n">emulator</span><span class="p">)</span>
<span class="o">--</span><span class="n">remote</span><span class="o">-</span><span class="n">debugging</span><span class="o">-</span><span class="n">port</span><span class="o">=</span><span class="mi">9222</span>   <span class="n">Listen</span> <span class="n">on</span> <span class="n">port</span> <span class="mi">9222</span> <span class="k">for</span> <span class="n">web</span> <span class="n">debugging</span>
</pre></div>

<p>The last parameter is the full path to the HTML file to load.
Eventually you will only need to point it to the base directory and
Crosswalk will load the manifest.json file it finds there.
</p><div class="highlight"><pre>sdb shell <span class="s2">"xwalk --remote-debugging-port=9222 --use-gl=osmesa /home/developer/hello_world"</span>
</pre></div>

<p>On the host, you can point your browser to http://localhost:9222/ and debug your application. As you debug and develop your application, you only need to run the '''sdb push''' command:</p>

<div class="highlight"><pre>sdb push samples/hello_world /home/developer/hello_world
</pre></div>

<p>and then refresh the debugger in your browser via CTRL-R.</p>

<p><strong>TIP</strong> — If you are running Tizen via the emulator, you can enable <a href="https://developer.tizen.org/help/index.jsp?topic=%2Forg.tizen.gettingstarted%2Fhtml%2Fdev_env%2Femulator_file_sharing.htm">File Sharing</a> which can allow you to access your application files directly in Tizen environment. This removes the <code>sdb push</code> step.</p>

<h3>Launching an XPK package on Tizen<a name="launching-an-xpk-package-on-tizen"></a></h3>

<p>Follow the steps for <a href="#packaging-for-tizen">Packaging on
Tizen</a>. Once
you have the XPK package, you can install and launch it on a Tizen device by
following the steps below.</p>

<ul><li><p>The XPK should be installed as root:
</p><div class="highlight"><pre>sdb root on
</pre></div></li>
<li><p>Sync your XPK package to the device:
</p><div class="highlight"><pre>sdb push FooBar.xpk /tmp/
</pre></div></li>
<li><p>Install the package:
</p><div class="highlight"><pre>sdb shell <span class="s2">"xwalk --install /tmp/FooBar.xpk"</span>
</pre></div></li>
</ul><p>The new application icon should now be visible on the device's home screen.</p>

<p>You can refer to <a href="http://crosswalk-project.org/#wiki/Crosswalk-package-management/xpk-package-management">XPK
package management</a>
for more details about how to manage an XPK package in Crosswalk.</p>