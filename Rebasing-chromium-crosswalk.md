## Rebase master branch
* Backup current master:
 * Create a new branch named **master_history_\<chromium version\>**, e.g. master_history_28_0_1500_36.
 * Push it to chromium-crosswalk repo.
* Decide new upstream base:
 * Choose the **latest beta channel version** from http://omahaproxy.appspot.com/.
* Prepare upstream git for chosen version:
 * Upstream only maintain trunk in its git repo.
 * Need to use git-svn to fetch the commits after upstream branches from trunk.
 * [BKM reference](BKM-for-Rebasing-chromium-crosswalk#prepare-upstream-specified-versions-git-tree)
* Do rebasing:
 * Use **rebase -i** to only pick our commits.
* Verify content shell build locally.
* Force update master.
* Update buildbot/trybot content shell slaves' config
 * Inform [@wang16](https://github.com/wang16) or [@halton](https://github.com/halton), no automatic solution currently.
* Verify Crosswalk build locally.
* Send pull request to Crosswalk master, the pull request should include:
 * The fix to make Crosswalk work with new based chromium-crosswalk.
 * Update DEPS.crosswalk for version and commit hash.

## Rebase Release branch
* Basically same as master branch's rebase. Following are the differences:
* Backup branch should be named **\<release branch name\>\_history\_\<chromium version\>**, e.g. release_v1.0_history_28_0_1500_36
* When choosing new base, choose the **latest patch update for current release**, e.g. 28_0_1500_80 for 28_0_1500_36.
* Force update release branch in chromium-crosswalk after rebase.
* Send pull request to the corresponding branch in crosswalk.

## Prepare upstream specified version's git tree
* Constructing...