As described in our [Release Methodology](Release-methodology) page, Crosswalk follows a release process similar to Chromium's. Part of the release of Crosswalk it involves rebasing our forks of our Blink, Chromium and V8 on top of a certain upstream release.

This article shows how perform these rebases and what pitfalls to look out for, as well as how to update Crosswalk itself once the forks have been rebased.

## Before you begin
Some skills are essential in order to rebase the code without losing half of your hair or running away in despair.

First of all, you *must* be familiar with Chromium's release process (which is what we have based our own relase methodology on). Particularly important things to know include:
* [ViewVC](https://src.chromium.org/viewvc/chrome/) and how to use it.
* Chromium's SVN repository organization: development happens in trunk (`/trunk/src`), trunk gets branched and branches have numbers (`/branches/<NUMBER>/src`), certain branches are chosen for releases (`/releases/<RELEASE NUMBER>`).
* `DEPS` and `DEPS.git` are *not* updated in a branch after it is created from trunk.
* `DEPS` in a release _is_ updated. However, releases do not have a `DEPS.git`.
* Analogously, [Blink's](https://src.chromium.org/viewvc/blink/) development happens in trunk (`/trunk`) and a branch is created with the same number as the Chromium one when the latter is branched (`/branches/chromium/<NUMBER>`), except that Chromium branches such as *1234_55* do not have a corresponding branch in Blink; all commits to *1234*, *1234_56*, *1234_678* etc in Chromium go to the same branch *1234* in Blink.
* Finally, V8's development happens in trunk with release branches accompanying each Chromium release. For example, Chromium 34 uses V8 from the *3.24* branch.

You also need to be familiar with [OmahaProxy](https://omahaproxy.appspot.com/). Understand which row you are supposed to choose and what the columns mean. If you are rebasing Crosswalk's dependencies for a new cycle (ie. you are working on what Crosswalk's `master` branch is going to be based on), you should check the **linux-beta** row in OmahaProxy. Likewise, if you are simply maintaining Crosswalk's stable branch and are thus updating from one Chromium release to another in the _same_ milestone, use the **linux-stable** row.

As for columns, we are particularly interested in _true branch_ and _branch revision_.
* _true branch_ is the branch number from which a certain release (row in the table) was cut.
* _branch revision_ is the actual SVN commit number in the _true branch_ corresponding to a certain release (more than one release can come from the same branch, they just use different _branch revisions_).

Finally, spend some time getting to know git better. Do not follow the instructions below blindly. Specifically, make sure you know how [references](http://git-scm.com/book/en/Git-Internals-Git-References) and [refspecs](http://git-scm.com/book/en/Git-Internals-The-Refspec) work.

## Branch names in blink-crosswalk, chromium-crosswalk and v8-crosswalk
When creating new branches or updating existing ones, it is important to pay attention to Crosswalk's branch naming conventions for the forks. They apply to all our forks (blink-crosswalk, chromium-crosswalk and v8-crosswalk).

The most basic distinction is between the `master` and the `crosswalk-*` branches:
* `master`, as usual in a git-based workflow, is the current development branch and the one everyone works on at the moment. It corresponds to the fork versions Crosswalk's `master` branch is using.
* When rebasing to track a different release, the previous branch should be backed up and preserved as `crosswalk-<version>/<release_number>`. For example, `crosswalk-1/28.0.1500.36` corresponds to all the commits we made to chromium-crosswalk (or blink-crosswalk) while we were tracking Chromium's 28.0.1500.36 release.

In other words, `crosswalk-<version>/<release_number>` simply contains a certain number of commits made by Crosswalk contributors on top of an upstream branch.

## Rebasing blink-crosswalk
Let's start with the dependency deepest down the stack we have: Blink. Most of the time, rebasing Blink should be trivial: not only are fork-specific commits discouraged in general, but Blink normally serves Crosswalk's purposes just fine without requiring any changes from our part.

1. Fork blink-crosswalk.

    In case this was not obvious, make sure you have your own fork of the blink-crosswalk both for experimenting and also for submitting pull requests and exercising the bots. Do **NOT** push your changes directly to `crosswalk-project/blink-crosswalk.git` directly without testing and talking to people first!

    Also, do not forget to add your remote to your checkout if you have not done so yet:
    ```sh
    cd third_party/WebKit
    git remote add my-fork git@github.com:myusername/blink-crosswalk.git
    ```

1. Back up the existing `master` branch.

    As mentioned above, since the `master` branch is going to have its history changed, it must be backed up into a history branch first. For example, if we are currently tracking Chromium release 28.0.1500.36, a branch called `crosswalk-1/28.0.1500.36` must be created.
    ```sh
    git branch crosswalk-1/28.0.1500.36 master
    ```

1. Determine the new Blink branch and revision that are going to be used.

    Let us assume we are working on Crosswalk's development branch (`master`). We look at the proper row (linux-beta) in OmahaProxy, and determine its version number is **30.0.1599.66**. Moving right, we see that the _true branch_ column shows the branch number is **1599_59**. This means the Subversion branch in Blink's repository is `branches/chromium/1599` (not 1599_59, as explained above), which can also be accessed with [ViewVC](http://src.chromium.org/viewvc/blink/branches/chromium/1599/).

    As mentioned above, the `DEPS` and `DEPS.git` files are not updated in the Subversion branches. You need to check the correct Subversion revision for Blink and Chromium in the *_release_* `DEPS` file (ie. [/releases/31.0.1650.12/DEPS](http://src.chromium.org/viewvc/chrome/releases/31.0.1650.12/DEPS?pathrev=226911)). In this file, we can see the following snippet:
    ```python
    # ...
    'src/third_party/WebKit':
      Var("webkit_trunk")[:-6] + '/branches/chromium/1650@158834',
    # ...
    ```

    This means Blink needs to be at SVN revision **158834**.

1. Fetch the new Blink branch and create a new `upstream` branch.

    This use of `git fetch` is a bit unusual, and it assumes your `origin` remote points to a read-write checkout of blink-crosswalk, such as `git@github.com:myusername/blink-crosswalk.git`.
    ```sh
    git fetch https://chromium.googlesource.com/chromium/blink.git branch-heads/chromium/1599:my-upstream-copy
    ```
    A new local branch called `my-upstream-copy` should now exist and be visible if you call `git branch`.

    As the same branch can be used for more than one release, the commit at the tip of the branch might not be the one corresponding to the release we want. Use `git log` or `git svn find-rev` to determine the SHA1 hash corresponding to the Subversion revision determined in the previous section (158213), and then reset to it:
    ```sh
    git checkout my-upstream-copy
    git reset --hard <SHA1>
    ```

1. Rebase existing fork-specific changes in `master` on top of the new `upstream` branch.

    1. In the trivial case, we have no fork-specific commits on top of the upstream ones (yay). This means both `master` (and `crosswalk-1/28.0.1500.36`) point to the same commit as `my-upstream-copy`). Updating `master` should be very simple: just make it point to the same change as the new `upstream` branch.
    ```sh
    git checkout master
    git reset --hard my-upstream-copy
    ```

    1. If we do have commits on top of the upstream ones, we need to check which of them are still relevant and re-apply those which are.

        This process involves some manual work. Use `git log` and any other tools at your disposal to study the Crosswalk-specific commits we have. In some cases, their commit messages say "this commit will not be needed once we rebase", or "this commit is only necessary until release XX.YY". Take note of them, because they will probably not be needed anymore. After that, use `git rebase -i` to rebase our commits on top of the new branch. It will try to add a lot of previous Chromium commits as well, so you need to remove a handful of lines (anything before the first Crosswalk-specific commit belongs to the previous Chromium branch and must be removed) and check which commits should actually be added.

        Note that there some manual effort is required here: there are likely going to be a lot of conflicts, so you need to check the commits, remove some and adjust some others. Also note that the automatic merge commits from GitHub will be lost.
        ```sh
        git checkout master
        git rebase -i my-upstream-copy # Choose the right commits, resolve conflicts.
        ```

1. Push your new branches to your fork.

    Your new commits will have to be tested with Crosswalk (and Chromium) later, so you need to push them to your fork first.
    ```sh
    git push my-fork crosswalk-1/28.0.1500.36
    git push -f my-fork master
    ```

## Rebasing v8-crosswalk
The rebasing process for v8-crosswalk is very similar to the one for blink-crosswalk. The differences are in some branch names upstream, and we always carry the SIMD.JS patches on top of upstream.

The parts of the process that are similar to blink-crosswalk have shorter descriptions here. Please refer to the blink-crosswalk section for more detailed explanations of each step. It's not possible to emphasize enough how important it is not to follow the steps blindly, so read up and understand what is going on first.

1. Fork v8-crosswalk.

    Once again, fork the repository if you haven't done it yet, and **DO NOT** push your changes directly to `crosswalk-project/v8-crosswalk.git` directly without testing and talking to people first!

    And, if you haven't done so, add your remote to your checkout:
    ```sh
    git remote add my-fork git@github.com:myusername/v8-crosswalk.git
    ```

1. Back up the existing `master` branch.

    Assuming we are currently tracking Chromium release 28.0.1500.36:
    ```sh
    git branch crosswalk-1/28.0.1500.36 master
    ```

1. Determine the new Chromium branch and revision that are going to be used.

    Assuming we are tracking **linux-beta** and it is now at release **34.0.1847.116**: the _v8 version_ column in OmahaProxy says the branch number is **34.0.1847.116**, so the V8 branch we are interested in is called **3.24**.

    As mentioned above, the `DEPS` and `DEPS.git` files are not updated in the Subversion branches. You need to check the correct Subversion revision for V8 in the *_release_* `DEPS` file (ie. [/releases/34.0.1847.116/DEPS](http://src.chromium.org/viewvc/chrome/releases/34.0.1847.116/DEPS?pathrev=260990)). In this file, we can see the following snippet:
    ```python
    # ...
    'src/v8':
      Var("v8") + '/branches/3.24@20378',
    # ...
    ```

    This means V8 needs to be at SVN revision **20378**.

1. Fetch the new V8 branch and create a new `upstream` branch.

    ```sh
    git fetch https://chromium.googlesource.com/external/v8.git +refs/branch-heads/3.24:my-upstream-copy
    ```

    Verify the new branch `my-upstream-copy` has been created by running `git branch`.

    As the same branch can be used for more than one release, the commit at the tip of the branch might not be the one corresponding to the release we want. Use `git log` or `git svn find-rev` to determine the SHA1 hash corresponding to the Subversion revision determined in the previous section (20378), and then reset to it:
    ```sh
    git checkout my-upstream-copy
    git reset --hard <SHA1>
    ```

1. Rebase existing fork-specific changes in `master` on top of the new `upstream` branch.

    1. In the trivial case (ie. we have no commits on top of upstream):
    ```sh
    git checkout master
    git reset --hard my-upstream-copy
    ```

    1. If we do have commits of our own, use `git log` to check if some of the commit messages say certain commits can be safely removed when moving to a newer V8 release, then rebase:
    ```sh
    git checkout master
    git rebase -i my-upstream-copy # Choose the right commits, resolve conflicts.
    ```

1. Push your new branches to your fork.

    ```sh
    git push my-fork crosswalk-1/28.0.1500.36
    git push -f my-fork master
    ```

## Rebasing chromium-crosswalk
Again, the rebasing process for chromium-crosswalk is very similar to the one for blink-crosswalk. The differences are in some branch names upstream and in the fact that it is much more likely that we have commits on top of the upstream ones than for blink-crosswalk.

The parts of the process that are similar to blink-crosswalk have shorter descriptions here. Please refer to the blink-crosswalk section for more detailed explanations of each step. It's not possible to emphasize enough how important it is not to follow the steps blindly, so read up and understand what is going on first.

1. Fork chromium-crosswalk.

    Once again, fork the repository if you haven't done it yet, and **DO NOT** push your changes directly to `crosswalk-project/chromium-crosswalk.git` directly without testing and talking to people first!

    And, if you haven't done so, add your remote to your checkout:
    ```sh
    git remote add my-fork git@github.com:myusername/chromium-crosswalk.git
    ```

1. Back up the existing `master` branch.

    Assuming we are currently tracking Chromium release 28.0.1500.36:
    ```sh
    git branch crosswalk-1/28.0.1500.36 master
    ```

1. Determine the new Chromium branch and revision that are going to be used.

    Assuming we are tracking **linux-beta** and it is now at release **30.0.1599.66**: the _true branch_ column in OmahaProxy says the branch number is **1599_59**, so the Subversion branch in Chromium's repository is `branches/1599_66`.

    Contrary to Blink, there is no need to check the `DEPS` file in the release branch; if you still want to, the `'src'` section in `releases/30.0.1599.66/DEPS` should point to the same revision as _true branch_ in OmahaProxy, **226662**:
    ```python
    # ...
    'src':
      '/branches/1650/src@226662',
    # ...
    ```

1. Fetch the new Chromium branch and create a new `upstream` branch.

    ```sh
    git fetch https://chromium.googlesource.com/chromium/src.git +refs/tags/30.0.1599.66:my-upstream-copy
    ```

    Verify the new branch `my-upstream-copy` has been created by running `git branch`.

    As the same branch can be used for more than one release, the commit at the tip of the branch might not be the one corresponding to the release we want. Use `git log` or `git svn find-rev` to determine the SHA1 hash corresponding to the Subversion revision determined in the previous section (226662), and then reset to it:
    ```sh
    git checkout my-upstream-copy
    git reset --hard <SHA1>
    ```

1. Rebase existing fork-specific changes in `master` on top of the new `upstream` branch.

    1. In the trivial case (ie. we have no commits on top of upstream):
    ```sh
    git checkout master
    git reset --hard my-upstream-copy
    ```

    1. If we do have commits of our own, use `git log` to check if some of the commit messages say certain commits can be safely removed when moving to a newer Chromium release, then rebase:
    ```sh
    git checkout master
    git rebase -i my-upstream-copy # Choose the right commits, resolve conflicts.
    ```

1. Push your new branches to your fork.

    ```sh
    git push my-fork crosswalk-1/28.0.1500.36
    git push -f my-fork master
    ```

### Ozone-Wayland and Chromium
A big difference between Chromium and the other forks is that another project also needs to be taken into account when rebasing it: [Ozone-Wayland](https://github.com/01org/ozone-wayland), which is used to build Crosswalk for Wayland.

One must always make sure that Chromium and Crosswalk build and run correctly with Ozone-Wayland. This is normally not a problem when updating versions within the same Chromium milestone (ie. from 35.0.1916.114 to 35.0.1916.120), but it usually requires some attention otherwise. Ozone-Wayland has a public [release schedule](https://github.com/01org/ozone-wayland/wiki/Releasing) which lists the branches being worked on and which Chromium milestones they correspond to.

An important thing to mention is that Ozone-Wayland has a certain number of patches in `src/ozone/patches` that may need to be applied to chromium-crosswalk itself. Always make sure the patches in chromium-crosswalk match the ones in Ozone-Wayland (since they can change when Ozone-Wayland starts tracking a different Chromium version).

The first and simplest test is just verifying if any change actually needs to be done, which amounts to building Crosswalk for Wayland instead of X11:

1. Install Wayland and Weston on your system.

1. Add `use_aura=1 chromeos=0 use_ozone=1` to your `GYP_DEFINES`.

1. Make sure `gyp_chromium` is run so that the Content Shell target is generated. Otherwise, `gclient sync` will run `xwalk_gyp` last and we are not interested in Crosswalk yet:

    ```sh
    gclient sync
    cd src
    ./build/gyp_chromium
    ninja -C out/Release content_shell
    ```

1. Check that it works:

    ```sh
    cd src
    weston &
    ./out/Release/xwalk --no-sandbox /path/to/some/page.html
    ```

If you are able to see Crosswalk running inside your Weston instance, everything is fine and your work is done.

If building or running Crosswalk fails, make sure there isn't another Ozone-Wayland branch tracking your milestone, or that there aren't additional commits in the branch you are using that fixes your issues. If that is the case, just adjust the commit has in Crosswalk's `DEPS.xwalk` and go back to the tests described above. In any of those cases, make sure the patches in `src/ozone/patches` that are relevant to Crosswalk are properly applied in chromium-crosswalk. Particularly, make sure the versions in chromium-crosswalk are in sync with the ones in Ozone-Wayland.

In case no existing commit fixes your issues, you will need to fix Ozone-Wayland for your branch and coordinate with Oz-Wl team (such as Tiago Vignatti and Kalyan Kondapally). Build problems are normally caused by changes in the Chromium code (changes in method signatures, files being moved around etc). Building Chromium and Crosswalk in C++11 mode (using either clang or g++ with `-std=gnu++11`) is very helpful and makes it easy to catch things such as method changes, especially virtual ones. Runtime crashes can be debugged by building Content Shell or Crosswalk in Debug mode and later calling GDB (`gdb --args ./out/Debug/content_shell --single-process foo.html`).

After things are working, update Crosswalk's `DEPS.xwalk` and go back to the tests described above.

## Updating Crosswalk itself
Now that the forks themselves have been updated, we need to work on the Crosswalk part of the rebase. It can be divided in two parts: first, smoke-test your fork changes by building content shell, then update Crosswalk's code since some of the Chromium (and maybe V8) features it uses have changed (this is very much likely if you are tracking a new milestone, whereas stable updated should be fairly painless in this regard).

1. Update version numbers in Crosswalk.

    Quick recap: Crosswalk follows a `MAJOR.MINOR.BUILD.PATCH` versioning scheme. See our [Release Methodology](Release-methodology) page for an explanation of each of those numbers.

    For development branch rebases, we need to bump the `MAJOR` and `MINOR` numbers: `MAJOR` needs to be increased by 1, while `MINOR` is the major number of the new Chromium release we are going to track. For example, if Crosswalk's current version is **1.28.52.3** and we are now tracking Chromium 30.0.1599.66, the new Crosswalk version number should be **2.30.0.0**.

    For new releases in the stabilization branch, only the `PATCH` number is updated, as we are always tracking the same Chromium milestone. For example, if Crosswalk's current version is **1.28.52.3** and we are updating our Chromium from 28.0.1500.36 to 28.0.1500.72, the new version will be **1.28.52.4**.

    These version numbers need to be updated in the following files:
    * `VERSION`
    * `packaging/crosswalk.spec`

1. Update `DEPS.xwalk`.

    This should not require many explanations: it is the file used to generate `.gclient-xwalk` and determines where we fetch Blink, Chromium and V8 from and at what revision.

    First of all, check if there are entries there that could be removed (for example, there could be an entry saying "Delete the dependency below once we track Chromium >M30"), and remove them.

    After that, update `chromium_version`, `chromium_crosswalk_point`, `blink_crosswalk_point` and `v8_crosswalk_point` to the new upstream Chromium version, the new chromium-crosswalk SHA1 hash, the new blink-crosswalk SHA1 hash and the new v8-crosswalk SHA1 hash, respectively.

    Last, update the blink-crosswalk, chromium-crosswalk and v8-crosswalk lines in the `deps_xwalk` dictionary to point to **your fork**, since you have not pushed your new branches and changes to `crosswalk-project`'s repositories yet. Doing so is also useful to let others fetch the changes from your fork and help updating Crosswalk's code if necessary.

1. Smoke-test the fork updates.

    The first way to verify your rebases went well and nothing is broken is to build Chromium's content shell. You should already be familiar with content shell, so let's go directly to the commands:

    ```sh
    gclient sync -v
    # gclient should now checkout a new 30.0.1599.66 directory and
    # then fetch new versions of a lot of third-party dependencies.

    cd /path/to/chromium-crosswalk
    python build/gyp_chromium
    ninja -C out/Debug content_shell
    ```

    There is nothing too special above, you just need to tell `gclient` to fetch the new dependencies, build content shell and then run it to verify everything is working. The exact way you build the `content_shell` target (with `ninja` or with `make` etc) is irrelevant. Building in debug mode is recommended in order to build assertions and other parts of the code ignored in a release build.

1. Try building Crosswalk and its tests.

    Once you are sure content shell is OK, it is time to verify Crosswalk itself. Start by trying to build xwalk and its tests, then running them.

    ```sh
    cd /path/to/chromium-crosswalk
    python xwalk/gyp_xwalk # Optional arguments etc etc.
    ninja -C out/Debug xwalk_builder
    ./out/Debug/xwalk_unittest # and others
    ```

    Again, the exact command line arguments are not described above, and can be found in other pages. The important part is that you must build Crosswalk and test it. Try doing that with as many platforms as you can, such as Android and Tizen as well.

    If you are working on a stable branch, the whole process should not have unexpected bumps.

    On the other hand, if this is a rebase on top of a new Chromium milestone for Crosswalk's development branch, it is very likely that Crosswalk will fail to build. This is the time to start adapting Crosswalk's source code to the changes in Chromium itself. You can also `git commit` your current changes, push them to a branch in your Crosswalk fork and ask for more people to chime in and help, as Chromium's code can change a lot between releases at times.

    Rinse and repeat until everything builds, all tests pass and Crosswalk seems to be working.

## Adjust the version numbers in the build bots
_This is an annoying step that we are trying to get rid of. It is required only for Crosswalk's development branch because the build/try bots do not build the stable branch at the moment._

By now it should be fairly clear that the rebases have been done correctly and Crosswalk is also working as expected, but whenever Chromium's version number changes the build bot infrastructure (ie. https://build.crosswalk-project.org and https://build.crosswalk-project.org/try) needs to be updated as well. This is necessary because the Content Shell slaves do not check out Crosswalk at all and need to know which Chromium version to check out the main `DEPS` file from. In other words, they have to get the **XX** in src.chromium.org/chrome/releases/**XX**/DEPS from somewhere.

First, you need to either be in contact with the people who have access to the build/try bots infrastructure (Raphael Kubo da Costa and Alexis Menard) or get access to the necessary infrastructure and do it yourself. After that, follow these steps:

1. Clone the private `build-infrastructure.git` repository.

1. Update `XWALK_CHROMIUM_VERSION` in `masters/master.tryserver.crosswalk/master.cfg` and `masters/master.wrt/master.cfg` there.

1. Update the master checkouts appropriately and restart the masters.

Once that is done, push your new branches:
```sh
# Assuming origin points to git@github.com:crosswalk-project/{blink,chromium,v8}-crosswalk.git
cd /path/to/chromium-crosswalk/third_party/WebKit
git push -f origin master

cd /path/to/chromium-crosswalk/v8
git push -f origin master

cd /path/to/chromium-crosswalk
git push -f origin master
```

## Push your changes
Once everything is working, you can push your blink-crosswalk, chromium-crosswalk and v8-crosswalk changes to crosswalk-project if you haven't done so yet.

```sh
# Assuming origin points to git@github.com:crosswalk-project/{blink,chromium,v8}-crosswalk.git
cd /path/to/chromium-crosswalk/third_party/WebKit
git push origin crosswalk-1/28.0.1500.36
git push -f origin next

cd /path/to/chromium-crosswalk
git push origin crosswalk-1/28.0.1500.36
git push -f origin next
```

This should not break anything for Crosswalk users, as the SHA1 hashes referenced in the Crosswalk repository are still present in the forks.

Finally, create a **single commit** in Crosswalk that updates version numbers, adjusts the code and changes `DEPS.xwalk` and send a pull request. Don't forget to **update** `DEPS.xwalk` so it tracks the correct *-crosswalk (git@github.com:crosswalk-project/{blink,chromium,v8}-crosswalk.git) back again.

After you pushed to the next branch you can call for help and patches that couldn't be rebase trivially.

When the quality of next is acceptable you can merge it back into master.

```sh
# Assuming origin points to git@github.com:crosswalk-project/{blink,chromium,v8}-crosswalk.git and you are in next branch
cd /path/to/chromium-crosswalk/third_party/WebKit
git push -f origin next

cd /path/to/chromium-crosswalk
git push -f origin next
```
The try bots will then test it and, if everything goes well, Crosswalk will be updated for everyone to enjoy.
