## Introduction
Crosswalk uses forked versions of Chromium repositories (for example Blink and Chromium) which allows the project to land few differentiations factors from upstream. To achieve that crosswalk uses the same process as Chromium : a DEPS file will be used to point to the right branch and revision in the Crosswalk downstream repo (or forks) of Chromium (https://github.com/crosswalk-project/chromium-crosswalk or https://github.com/crosswalk-project/blink-crosswalk).

Crosswalk rebasing is owned by the releasing team (alexis.menard@intel.com and raphael.kubo.da.costa@intel.com) who are responsible of our downstream repositories (blink-crosswalk, chromium-crosswalk and others when we need). 

The releasing team is responsible for updating the branches, and is also the team that can make the final call about whether something should be merged or not into those downstream branches. In the long run, the team is the contact point for best practices when making changes to our Chromium branches, as well to upstreaming those changes when applicable.

## Developing the changes in our downstream repositories
Changes to our Chromium repositories are submitted as Pull Requests. The branch used for this PR is recommended to be kept alive by the original author. These are referred to as topic branches.

Future changes related to that original change are recommended to be made on top of the original topic branch. That will make the updating work easier.

## Rebasing the changes in our downstream repositories
When it is time to perform the next update, the releasing team of our Chromium branches will first upload the new version to a branch called “next” and ensure it is correctly compiling. At this point, it only contains Chromium commits from upstream, without any of the changes of ours that we had in master. After a fixed time to allow topic branches to get updated to this new version, there’s a round of merging of those branches again. With that tree, Crosswalk is updated to compile.

Topic branches that don’t apply cleanly (or with trivial changes) will be discarded. They can be updated later and merged again in the development cycle. The burden of updating the topic branches is to their authors. If they failed to do it in a timely manner (in the first weeks of the canary cycle) they will be discarded for the next release.

## Schedule of a canary cycle of Crosswalk

The development cycle (also called canary cycle) would change to work this way:

**Week 1:** On Monday the new branch “next” tracking the new version of Chromium is created. During this week updated versions of the existing topic branches will be merged. Smoke testing happens on the side via dedicated buildbots to test main platforms (Linux, Android, Tizen). Avoid merging new topic branches, this week is dedicated to ensure that all previous features are merged and we will face no regressions in master.

**Week 2:** The rebase lands in the master of Crosswalk, which will then start being tested by QA. This means that we may face regressions in master if the topic branches were not merged in the previous week. Existing topic branches may be applied.

**Week 3-5:** Development happens on Crosswalk master. New topic branches and existing topic branches may be applied.

**Week 6:** We avoid merging new features to Crosswalk master to stabilize for the next beta branch. Also avoid merging any topic branches.

Updating the DEPS.xwalk file in Crosswalk master is still up to the development team.

## Updates of our Chromium branches for stable and beta Crosswalk

Beta and Stable versions of Crosswalk track a given branch of Chromium upstream (which corresponds to a given Chromium version). These upstream branches are receiving updates until they are discarded (when a new Chromium stable is released). Crosswalk must keep in sync with these branches in order to get bug and security fixes. 

In the proposed workflow it will be the responsibility of the new owner to update the branches. Differently than the upstream major version update, those fix updates could be merged in the our branches instead of requiring a rebase.

To summarize the owner will make sure that the stable and beta versions of Crosswalk always track the latest and greatest from given upstream version by updating the branches in our 
chromium repositories and bumping the DEPS in the branches of Crosswalk itself.

## Questions and Answers

**What if a change is needed to get Crosswalk in a compilable state?**

We should minimize this kind of change. Crosswalk should aim to be compilable and “runnable” (even with fewer features) with unmodified Chromium/Blink repositories.

It might be the case that certain changes are unavoidable. Owner of our chromium branches will give early attention to these changes and will chase after the authors to get these changes rebased in a timely manner during the first days of the merge window. If they fail to answer and the changes to make it work are not trivial, the chromium branches update may be discarded for this given version of Crosswalk (and it’s a big failure).

**Do the branches need to be re-reviewed?**

The original authors and the owner of the chromium branches should be enough to validate a change -- if further review is necessary they can make this call. Note that we’re talking about rebased changes, not the original PR adding a new patch, this one should follow the usual review process.

**In case of changes that can’t be upstreamed, the developers have to deal with them in every update. Isn’t it too much work?**

Yes, but this is already true today, so the amount of work will not change, only the person responsible to do it -- which now will be the original developers / maintainers of the feature. The best practice here will be to make sure that change is done in a way that’s not very disruptive to the Chromium codebase. Sometimes for achieving the same functionality in two ways, one that need constant change in every Chromium update, and other that requires less changing.

Should features that come from our Chromium branches be marked as “experimental” / “tech preview”?
Not necessarily, it’s a case by case basis, if we feel confident that our implementation is good, stable then it should be considered as stable and we should commit to maintain it for our users. 

**Wouldn’t this approach increase the risk of losing a feature because it wasn’t merged in the updated version?**

This risk exists today, but is hidden in the “update Crosswalk version”. However, keeping up with recent Chromium versions is a feature of Crosswalk as well, so the new approach says that by default, we prioritize having a recent version of the web engine than any other feature (the benefits of newer Chromium is higher than a given feature).

There are two very direct ways to reduce the risk of a feature regression: ensure that the changes reach upstream; or ensuring that the feature is implemented in a way that doesn’t cause many conflicts (textual and functional) to upstream code.

**Is this new approach encouraging us NOT to make changes to Chromium/Blink?**

Quite the opposite! The practice so far has been to avoid changes to our branches by default. With the new approach there will be a structured way of accepting those changes even before they reach upstream. It also provides an incentive to later upstream (or at least improve) the changes: because the author will be responsible for the changes.

**Is this new approach encouraging us to ALWAYS implement new functionality by making changes to Chromium/Blink?**

No. The idea is to have a clear mechanism for handling changes that need to be done in Chromium/Blink. The usual tradeoffs for choosing where a functionality should be implemented are still the same, see a summary here https://lists.crosswalk-project.org/pipermail/crosswalk-dev/2013-December/000624.html.

The cost of keeping a change to our Chromium branches that we don’t expect to upstream anytime soon also remains the same, but is now in the developer’s hands: one needs to make sure the code topic branch is updated and works in every cycle. The ideal scenario of the new approach is that features can debut in our branch, but end up reaching upstream so we don’t need to always maintain them locally.

**What if the author is not working on that feature anymore?**

While we do refer to an “author” everywhere in this document, he/she does not always need to be always the same person who originally created a patch. It is fine to change the maintainer of a certain feature, and the new person is responsible for updating the topic branch. The owner will keep track of each patch/feature we have in our forks and make sure a list of authors is kept up-to-date. It’s the responsibility of the original author to inform any change.

**Is only one Owner enough?**

At least one person will be allocated full time to work on it. A backup person will be assigned in case help is needed (like vacations or sick leave). As for review work, more people can be assigned to help, the same way we have multiple owners for certain directories in Crosswalk.

**How will we handle the existing patches?**

For the very small patches, the owner will adopt them. For larger changes, the original developers will be contacted to make a new pull request on top of a fresh next branch.