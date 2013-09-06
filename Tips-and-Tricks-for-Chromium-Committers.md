## Convert your non-committer checkout to a committer one
* Make sure you are not on a firewalled network to do these steps.
* Open your ~/.subversion/servers
   * Make sure you have `store-passwords = yes`
   * Under `[groups]` add `chromium = *.chromium.org`
   * Create `[chromium]` category and add `username = foo.bar@intel.com` which will tell subversion to use your intel email as a login for all chromium repository (instead of the shell login).
* Run `fetch --dry-run blink` inside your blink/chromium checkout (not in src) to get all the svn commands needed displayed so you can copy/paste them.
* Run `svn ls --non-interactive svn://svn.chromium.org/chrome`
* Run `svn ls --non-interactive svn://svn.chromium.org/blink/trunk`

**These two commands will ask you to log-in, you can get the svn password at https://chromium-access.appspot.com/, and no you can't change it (svn will store it for you).**

* Go into the src/ of your blink/chromium checkout
* Run `git svn init --prefix=origin/ -T trunk/src svn://svn.chromium.org/chrome`
* Run `git config --replace svn-remote.svn.fetch trunk/src:refs/remotes/origin/git-svn`
* Run `git svn fetch`
* Go into the Blink checkout src/third_party/WebKit
* Run `git svn init --prefix=origin/ -T trunk svn://svn.chromium.org/blink/trunk`
* Run `git config --replace svn-remote.svn.fetch trunk:refs/remotes/origin/master`
* Run `git svn fetch`

You're done!

Source for the svn switch : https://git.wiki.kernel.org/index.php/GitSvnSwitch
