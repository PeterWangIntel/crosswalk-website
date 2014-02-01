Crosswalk uses forked versions of Chromium repositories (for example Blink and Chromium) to allow the project to land some differentiating factors from upstream. To achieve that Crosswalk uses the same process as Chromium: a `DEPS` (in Crosswalk's case, `DEPS.xwalk`) file is used to point to the right branch and revision in the Crosswalk downstream repositories (or forks) of Chromium and Blink (https://github.com/crosswalk-project/chromium-crosswalk and https://github.com/crosswalk-project/blink-crosswalk).

Crosswalk rebasing is owned by the release team (Alexis Menard and Raphael Kubo da Costa), who is responsible for maintaining the downstream repositories (blink-crosswalk, chromium-crosswalk and others when we need). The release team is responsible for updating the forks' branches, and also makes the final call about whether something should be merged or not into those downstream branches. In the long run, the team is the contact point for best practices when making changes to our Chromium branches, as well to upstreaming those changes when applicable.

## Developing the changes in our downstream repositories
Changes to our Chromium repositories are submitted as Pull Requests. The branch used for this PR is recommended to be kept alive by the original author. These are referred to as _topic branches_.

Future changes related to that original change are recommended to be made on top of the original topic branch. This will make the updating work easier.

## Rebasing the changes in our downstream repositories
When it is time to perform the next update, the release team of our Chromium branches will first upload the new version to a branch called “next” and ensure it is correctly compiling. At this point, it only contains Chromium commits from upstream, without any of the changes of ours that we had in master. After a fixed time to allow topic branches to get updated to this new version, there’s a round of merging of those branches again. With that tree, Crosswalk is updated to compile.

Topic branches that don’t apply cleanly (or with trivial changes) will be discarded. They can be updated later and merged again in the development cycle. The burden of updating the topic branches is to their authors. If they failed to do it in a timely manner (in the first weeks of the canary cycle) they will be discarded for the next release.

## Working on the next branch
Before "next" is going to be merged into master we need to integrate the patches that didn't apply cleanly and we need to fix the potential problems due to the rebase. All the authors will be invited to submit new patches on top of "next" if they didn't apply cleanly or trivially.

Working on the "next" branch is easy :

- Make sure your `.gclient` has the Managed entry set to false.
- Navigate to src/ and checkout the "next" branch : `git checkout -b next origin/next`
- Navigate to src/third_party/WebKit and checkout the "next" branch : `git checkout -b next origin/next`
- Return to the root of the repository and run `gclient sync` to fetch the new version (You may have some issues of gclient trying to rebase the chromium-crosswalk and blink-crosswalk which will fail, see [XWALK-921](https://crosswalk-project.org/jira/browse/XWALK-921). If this happens you can navigate to the directory  above and `git rebase --abort` as well as forcing a checkout `git reset --hard` origin/master)
- Rebase your patch on top of next
- Submit a PR targeting the "next" branch

## Schedule of a canary cycle of Crosswalk

The development cycle (also called canary cycle) works like this:

**Week 1:** On Monday the new branch “next” tracking the new version of Chromium is created. During this week updated versions of the existing topic branches will be merged. Smoke testing happens on the side via dedicated buildbots to test main platforms (Linux, Android, Tizen). Avoid merging new topic branches, this week is dedicated to ensure that all previous features are merged and we will face no regressions in master.

**Week 2:** The rebase lands in the master of Crosswalk, which will then start being tested by QA. This means that we may face regressions in master if the topic branches were not merged in the previous week. Existing topic branches may be applied.

**Week 3-5:** Development happens on Crosswalk master. New topic branches and existing topic branches may be applied.

**Week 6:** We avoid merging new features to Crosswalk master to stabilize for the next beta branch. Also avoid merging any topic branches.

Updating the `DEPS.xwalk` file in Crosswalk master is still up to the development team.

## Updates of our Chromium branches for stable and beta Crosswalk

Beta and Stable versions of Crosswalk track a given branch of Chromium upstream (which corresponds to a given Chromium version). These upstream branches are receiving updates until a new Chromium stable is released. In this workflow, it is the responsibility of the release team to update the branches. Differently than the upstream major version updates, these version updates within the same milestone are merged in the our branches instead of requiring a rebase.

To summarize, the owner will make sure that the stable and beta versions of Crosswalk always track the latest and greatest from given upstream version by updating the branches in our Chromium repositories and bumping `DEPS` in Crosswalk's branches himself.

## Questions and Answers

**What if a change is needed to get Crosswalk to a compilable state?**

We should minimize this kind of change. Crosswalk should aim to be compilable and “runnable” (even with fewer features) with unmodified Chromium/Blink repositories.

It might be the case that certain changes are unavoidable. The release team will give early attention to these changes and will chase after the authors to get these changes rebased in a timely manner during the first days of the merge window. If they fail to answer and the changes to make it work are not trivial, the chromium branches update may be discarded for this given version of Crosswalk (and it’s a big failure).

**Do existing branches need to be re-reviewed?**

The original authors and the release team should be enough to validate a change -- if further review is necessary they can make this call. Note that we’re talking about rebased changes, not the original pull request adding a new patch, this one should follow the usual review process.

**In case of changes that can’t be upstreamed, the developers have to deal with them in every update. Isn’t it too much work?**

Yes, only the person responsible to do it -- which now will be the original developers / maintainers of the feature. The best practice here will be to make sure that change is done in a way that’s not very disruptive to the Chromium codebase. Sometimes for achieving the same functionality in two ways, one that need constant change in every Chromium update, and other that requires less changing.

**Should features that come from our Chromium branches be marked as “experimental” / “tech preview”?**

Not necessarily, it’s a case by case basis, if we feel confident that our implementation is good, stable then it should be considered as stable and we should commit to maintain it for our users. 

**Wouldn’t this approach increase the risk of losing a feature because it wasn’t merged in the updated version?**

Keeping up with recent Chromium versions is a feature of Crosswalk as well, so the new approach says that by default, we prioritize having a recent version of the web engine than any other feature (the benefits of newer Chromium is higher than a given feature).

There are two very direct ways to reduce the risk of a feature regression: ensure that the changes reach upstream; or ensuring that the feature is implemented in a way that doesn’t cause many conflicts (textual and functional) to upstream code.

**Is this approach encouraging us NOT to make changes to Chromium/Blink?**

Quite the opposite. The approach here is a structured way of accepting those changes even before they reach upstream. It also provides an incentive to later upstream (or at least improve) the changes: because the author will be responsible for the changes.

**Is this new approach encouraging us to ALWAYS implement new functionality by making changes to Chromium/Blink?**

No. The idea is to have a clear mechanism for handling changes that need to be done in Chromium/Blink. The usual tradeoffs for choosing where a functionality should be implemented are still the same, see a summary here https://lists.crosswalk-project.org/pipermail/crosswalk-dev/2013-December/000624.html.

The cost of keeping a change to our Chromium branches that we don’t expect to upstream anytime soon also remains the same, but is now in the developer’s hands: one needs to make sure the code topic branch is updated and works in every cycle. The ideal scenario of the new approach is that features can debut in our branch, but end up reaching upstream so we don’t need to always maintain them locally.

**What if the author is not working on that feature anymore?**

While we do refer to an “author” everywhere in this document, he/she does not always need to be always the same person who originally created a patch. It is fine to change the maintainer of a certain feature, and the new person is responsible for updating the topic branch. The release team will keep track of each patch/feature we have in our forks and make sure a list of authors is kept up-to-date. It’s the responsibility of the original author to inform any change.

**Isn't the release team too small?**

At least two person are allocated to work on it. As for review work, more people can be assigned to help, the same way we have multiple owners for certain directories in Crosswalk.

**How will we handle the existing patches?**

For very small patches, the release team will adopt them. For larger changes, the original developers will be contacted to make a new pull request on top of a fresh next branch.

## An illustrated example

The example below represents one of our Chromium branches. This first picture shows what the tree would look like during the regular “Canary cycle” for our version. During that time the focus of work is the master branch, which is based on the upstream-30 version.  There are three features on top of that, indicated by the topic branches feature-x, feature-y and feature-z, all merged into our master branch.

![Initial State](https://raw.github.com/crosswalk-project/crosswalk/master/wiki/images/rebase-initial-state.png)

All the feature branches are encouraged to be on top of the commit we choose to use as base for this version. This is chosen by the person responsible for updating the chromium tree, and it was the next branch of the previous (not shown) iteration. Here we show the branches in isolation:

![feature-x-30](https://raw.github.com/crosswalk-project/crosswalk/master/wiki/images/rebase-feature-x-30.png)

![feature-y-30](https://raw.github.com/crosswalk-project/crosswalk/master/wiki/images/rebase-feature-y-30.png)

![feature-z-30](https://raw.github.com/crosswalk-project/crosswalk/master/wiki/images/rebase-feature-z-30.png)

Note that one of the patches of Feature Y is a candidate for upstreaming. We’ll see how that affects the topic branch later.

Also note that a fix was needed for feature Z after it was merged. Looking back at the picture containing the master branch, we see that this branch was merged twice, which is OK. The goal here is to keep the topic branch containing all the changes it needs.

When it’s time for a new update of our branches, a point is chosen from the upstream repositories and a next branch is created. In this example the point is the upstream-31 branch, that contains, among other changes, the Feature X (that was upstreamed) and a change that we had in the Feature Y branch.

![Upstream 31](https://raw.github.com/crosswalk-project/crosswalk/master/wiki/images/rebase-upstream-31.png)

Since Feature X is already part of upstream, we don’t need to maintain a topic branch for it anymore.

Also, the updated version of feature-y topic branch, called here feature-y-31 branch doesn’t need to contain the change that was upstreamed anymore. This is common, sometimes not an entire feature can be upstreamed, but parts of it can. For example, adding certain generic hooks into Chromium so we can implement a certain functionality. The hooks themselves may make sense for upstream.

![feature-y-31](https://raw.github.com/crosswalk-project/crosswalk/master/wiki/images/rebase-feature-y-31.png)

Developers can take the opportunity to clean up the topic branches. The feature-z contained the original commit and a fix that was added after the merge. For the new merge, the developer can squash the two changes together, since it is just a fix to the original code, not a different logical change.

![feature-z-31](https://raw.github.com/crosswalk-project/crosswalk/master/wiki/images/rebase-feature-z-31.png)

So the next branch will look like the following:

![rebase-next](https://raw.github.com/crosswalk-project/crosswalk/master/wiki/images/rebase-next.png)

Once tested, this will become the new master and used for development during the Canary cycle. The Crosswalk master itself will have its DEPS file updated accordingly.