As described in our [Release Methodology](Release-methodology) page, Crosswalk follows a release process similar to Chromium's. Part of our [Rebasing Strategy](Rebasing-Strategy) involves rebasing our forks of the Blink and Chromium repositories on top of a certain upstream release.

This article shows how perform these rebases and what pitfalls to look out for, as well as how to update Crosswalk itself once the forks have been rebased.

## Before you begin
Some skills are essential in order to rebase the code without losing half of your hair or running away in despair.

First of all, you *must* be familiar with Chromium's release process (which is what we have based our own relase methodology on). Particularly important things to know include:
* [ViewVC](https://src.chromium.org/viewvc/chrome/) and how to use it.
* Chromium's SVN repository organization: development happens in trunk (`/trunk/src`), trunk gets branched and branches have numbers (`/branches/<NUMBER>/src`), certain branches are chosen for releases (`/releases/<RELEASE NUMBER>`).
* `DEPS` and `DEPS.git` are *not* updated in a branch after it is created from trunk.
* `DEPS` in a release _is_ updated. However, releases do not have a `DEPS.git`.
* Analogously, [Blink's](https://src.chromium.org/viewvc/blink/) development happens in trunk (`/trunk`) and a branch is created with the same number as the Chromium one when the latter is branched (`/branches/chromium/<NUMBER>`), except that Chromium branches such as *1234_55* do not have a corresponding branch in Blink; all commits to *1234*, *1234_56*, *1234_678* etc in Chromium go to the same branch *1234* in Blink.

You also need to be familiar with [OmahaProxy](https://omahaproxy.appspot.com/). Understand which row you are supposed to choose and what the columns mean. If you are rebasing Crosswalk's dependencies for a new cycle (ie. you are working on what Crosswalk's `master` branch is going to be based on), you should check the **linux-beta** row in OmahaProxy. Likewise, if you are simply maintaining Crosswalk's stable branch and are thus updating from one Chromium release to another in the _same_ milestone, use the **linux-stable** row.

As for columns, we are particularly interested in _true branch_ and _branch revision_.
* _true branch_ is the branch number from which a certain release (row in the table) was cut.
* _branch revision_ is the actual SVN commit number in the _true branch_ corresponding to a certain release (more than one release can come from the same branch, they just use different _branch revisions_).

Finally, spend some time getting to know git better. Do not follow the instructions below blindly. Specifically, make sure you know how [references](http://git-scm.com/book/en/Git-Internals-Git-References) and [refspecs](http://git-scm.com/book/en/Git-Internals-The-Refspec) work.

## Branch names in blink-crosswalk and chromium-crosswalk
When creating new branches or updating existing ones, it is important to pay attention to Crosswalk's branch naming conventions for the forks. They apply to both blink-crosswalk and chromium-crosswalk.

The most basic distinction is between the `master_*` and `upstream_*` branches:
* `master`, as usual in a git-based workflow, is the current development branch and the one everyone works on at the moment.
* When rebasing to track a different release, the previous `master` branch should be backed up and preserved as `master_history_<release_number>`. For example, `master_history_28_0_1500_36` corresponds to all the commits we made to chromium-crosswalk (or blink-crosswalk) while we were tracking Chromium's 28.0.1500.36 release.
* An `upstream_<release_number>` branch contains a pristine copy of an upstream Chromium (or Blink) branch; for example, `upstream_28_0_1500_36` contains all upstream Chromium commits that were made up to the 28.0.1500.36 release. It is equivalent to a Chromium branch in chromium.org.

In other words, `master_history_<release_number>` simply contains a certain number of commits made by Crosswalk contributors on top of an `upstream_<release_number>` branch.

At least for now, we do not keep `lkgr` branches.

## Rebasing blink-crosswalk
Let's start with the dependency deepest down the stack we have: Blink. Most of the time, rebasing Blink should be trivial: not only are fork-specific commits discouraged in general, but Blink normally serves Crosswalk's purposes just fine without requiring any changes from our part.

1. Fork blink-crosswalk.

    In case this was not obvious, make sure you have your own fork of the blink-crosswalk both for experimenting and also for submitting pull requests and exercising the bots. Do **NOT** push your changes directly to `crosswalk-project/blink-crosswalk.git` directly without testing and talking to people first!

    Also, do not forget to add your remote to your checkout if you have not done so yet:
    ```shell
    git remote add my-fork git@github.com:myusername/blink-crosswalk.git
    ```

1. Back up the existing `master` branch.

    As mentioned above, since the `master` branch is going to have its history changed, it must be backed up into a history branch first. For example, if we are currently tracking Chromium release 28.0.1500.36, a branch called `master_history_28_0_1500_36` must be created.
    ```shell
    git branch master_history_28_0_1500_36 master
    ```

1. Determine the new Blink branch that is going to be used.

    Let us assume we are working on Crosswalk's development branch (`master`). We look at the proper row (linux-beta) in OmahaProxy, and determine its version number is **30.0.1599.66**. Moving right, we see that the _true branch_ column shows the branch number is **1599_59**. This means the Subversion branch in Blink's repository is `branches/chromium/1599` (not 1599_55, as explained above), which can also be accessed with [ViewVC](http://src.chromium.org/viewvc/blink/branches/chromium/1599/).

1. Fetch the new Blink branch and create a new `upstream` branch.

    This use of `git fetch` is a bit unusual, and it assumes your `origin` remote points to a read-write checkout of blink-crosswalk, such as `git@github.com:myusername/blink-crosswalk.git`.
    ```shell
    git fetch https://chromium.googlesource.com/chromium/blink.git branch-heads/chromium/1599:refs/heads/upstream_30_0_1599_66
    ```
    A new local branch called `upstream_30_0_1599_66` should now exist and be visible if you call `git branch`.

1. Rebase existing fork-specific changes in `master` on top of the new `upstream` branch.

    1. In the trivial case, we have no fork-specific commits on top of the upstream ones (yay). This means both `master` (and `master_history_28_0_1500_36`) point to the same commit as `upstream_28_0_1500_36`). Updating `master` should be very simple: just make it point to the same change as the new `upstream` branch.
    ```shell
    git checkout master
    git reset --hard upstream_30_0_1599_66
    ```

    1. If we do have commits on top of the upstream ones, we need to check which of them are still relevant and re-apply those which are.

        This process involves some manual work. Use `git log` and any other tools at your disposal to study the Crosswalk-specific commits we have. In some cases, their commit messages say "this commit will not be needed once we rebase", or "this commit is only necessary until release XX.YY". Take note of them, because they will probably not be needed anymore. After that, use `git rebase -i` to rebase our commits on top of the new branch. It will try to add a lot of previous Chromium commits as well, so you need to remove a handful of lines (anything before the first Crosswalk-specific commit belongs to the previous Chromium branch and must be removed) and check which commits should actually be added.

        Note that there some manual effort is required here: there are likely going to be a lot of conflicts, so you need to check the commits, remove some and adjust some others. Also note that the automatic merge commits from GitHub will be lost.
        ```shell
        git checkout master
        git rebase -i upstream_30_0_1599_66 # Choose the right commits, resolve conflicts.
        ```

1. Push your new branches to your fork.

    Your new commits will have to be tested with Crosswalk (and Chromium) later, so you need to push them to your fork first.
    ```shell
    git push my-fork upstream_30_0_1599_66
    git push -f my-fork master
    ```

## Rebasing chromium-crosswalk
The rebasing process for chromium-crosswalk is very similar to the one for blink-crosswalk. The differences are in some branch names upstream and in the fact that it is much more likely that we have commits on top of the upstream ones than for blink-crosswalk.

The parts of the process that are similar to blink-crosswalk have shorter descriptions here. Please refer to the blink-crosswalk section for more detailed explanations of each step. It's not possible to emphasize enough how important it is not to follow the steps blindly, so read up and understand what is going on first.

1. Fork chromium-crosswalk.

    Once again, fork the repository if you haven't done it yet, and **DO NOT** push your changes directly to `crosswalk-project/chromium-crosswalk.git` directly without testing and talking to people first!

    And, if you haven't done so, add your remote to your checkout:
    ```shell
    git remote add my-fork git@github.com:myusername/chromium-crosswalk.git
    ```

1. Back up the existing `master` branch.

    Assuming we are currently tracking Chromium release 28.0.1500.36:
    ```shell
    git branch master_history_28_0_1500_36 master
    ```

1. Determine the new Chromium branch that is going to be used.

    Assuming we are tracking **linux-beta** and it is now at release **30.0.1599.66**: the _true branch_ column in OmahaProxy says the branch number is **1599_59**, so the Subversion branch in Chromium's repository is `branches/1599_66`.

1. Fetch the new Chromium branch and create a new `upstream` branch.

    ```shell
    git fetch https://chromium.googlesource.com/chromium/src.git branch-heads/1599_66:refs/heads/upstream_30_0_1599_66
    ```

    Verify the new branch `upstream_30_0_1599_66` has been created by running `git branch`.

1. Rebase existing fork-specific changes in `master` on top of the new `upstream` branch.

    1. In the trivial case (ie. we have no commits on top of upstream):
    ```shell
    git checkout master
    git reset --hard upstream_30_0_1599_66
    ```

    1. If we do have commits of our own, use `git log` to check if some of the commit messages say certain commits can be safely removed when moving to a newer Chromium release, then rebase:
    ```shell
    git checkout master
    git rebase -i upstream_30_0_1599_66 # Choose the right commits, resolve conflicts.
    ```

1. Push your new branches to your fork.

    ```shell
    git push my-fork upstream_30_0_1599_66
    git push -f my-fork master
    ```

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

    This should not require many explanations: it is the file used to generate `.gclient-xwalk` and determines where we fetch Blink and Chromium from and at what revision.

    First of all, check if there are entries there that could be removed (for example, there could be an entry saying "Delete the dependency below once we track Chromium >M30"), and remove them.

    After that, update `chromium_version`, `chromium_crosswalk_point` and `blink_crosswalk_pint` to the new upstream Chromium version, the new chromium-crosswalk SHA1 hash and the new blink-crosswalk SHA1 hash, respectively.

    Last, update the blink-crosswalk and chromium-crosswalk lines in the `deps_xwalk` dictionary to point to **your fork**, since you have not pushed your new branches and changes to `crosswalk-project`'s repositories yet. Doing so is also useful to let others fetch the changes from your fork and help updating Crosswalk's code if necessary.

1. Smoke-test the fork updates.

    The first way to verify your rebases went well and nothing is broken is to build Chromium's content shell. You should already be familiar with content shell, so let's go directly to the commands:

    ```shell
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

    ```shell
    cd /path/to/chromium-crosswalk
    python xwalk/gyp_xwalk # Optional arguments etc etc.
    ninja -C out/Debug xwalk
    ninja -C out/Debug xwalk_unittest
    ninja -C out/Debug xwalk_browsertest
    ./out/Debug/xwalk_unittest
    ./out/Debug/xwalk_browsertest
    ```

    Again, the exact command line arguments are not described above, and can be found in other pages. The important part is that you must build Crosswalk and test it. Try doing that with as many platforms as you can, such as Android and Tizen as well.

    If you are working on a stable branch, the whole process should not have unexpected bumps.

    On the other hand, if this is a rebase on top of a new Chromium milestone for Crosswalk's development branch, it is very likely that Crosswalk will fail to build. This is the time to start adapting Crosswalk's source code to the changes in Chromium itself. You can also `git commit` your current changes, push them to a branch in your Crosswalk fork and ask for more people to chime in and help, as Chromium's code can change a lot between releases at times.

    Rinse and repeat until everything builds, all tests pass and Crosswalk seems to be working.

## For development rebases: update the QA infrastructure
_This is an annoying step that we are trying to get rid of. It is required only for Crosswalk's development branch because the build/try bots do not build the stable branch at the moment._

By now it should be fairly clear that the rebases have been done correctly and Crosswalk is also working as expected, but if you are rebasing to track a different Chromium milestone (ie. you are working on Crosswalk's development branch) the QA infrastructure needs to be updated as well.

First, talk to people who have access to the build/try bots infrastructure (such as Shiliu Wang, Halton Huo, Raphael Kubo da Costa and Alexis Menard), and either ask for access yourself or ask them to shut down the build and try bot masters before you push your blink-crosswalk and chromium-crosswalk changes to the repositories belonging to crosswalk-project.

Once that is done, push your new branches:
```shell
# Assuming origin points to git@github.com:crosswalk-project/{blink,chromium}-crosswalk.git
cd /path/to/chromium-crosswalk/third_party/WebKit
git push origin upstream_30_0_1599_66
git push -f origin master

cd /path/to/chromium-crosswalk
git push origin upstream_30_0_1599_66
git push -f origin master
```

Next, clone the private `build-infrastructure.git` repository or ask someone to update `XWALK_CHROMIUM_VERSION` in `masters/master.tryserver.wrt/master.cfg` and `masters/master.wrt/master.cfg` there.

After that, restart the build and try bot masters. If the new commits to blink-crosswalk and chromium-crosswalk are not picked up automatically by the build bots, force-build the content bots.

## Push your changes
Once everything is working, you can push your blink-crosswalk and chromium-crosswalk changes to crosswalk-project if you haven't done so yet.

```shell
# Assuming origin points to git@github.com:crosswalk-project/{blink,chromium}-crosswalk.git
cd /path/to/chromium-crosswalk/third_party/WebKit
git push origin master_history_28_0_1500_36
git push origin upstream_30_0_1599_66
git push -f origin master

cd /path/to/chromium-crosswalk
git push origin master_history_28_0_1500_36
git push origin upstream_30_0_1599_66
git push -f origin master
```

This should not break anything for Crosswalk users, as the SHA1 hashes referenced in the Crosswalk repository are still present in the forks.

Finally, create a **single commit** in Crosswalk that updates version numbers, adjusts the code and changes `DEPS.xwalk` and send a pull request. The try bots will then test it and, if everything goes well, Crosswalk will be updated for everyone to enjoy.
