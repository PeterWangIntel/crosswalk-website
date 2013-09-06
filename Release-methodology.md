# Release Methodology
The Crosswalk release cycle is modeled on the [Chromium release cycle](http://techcrunch.com/2011/01/11/google-chrome-release-cycle-slideshow/). Those familiar with the cadence and evolving stability in the various Chromium channels will be familiar with the Crosswalk release cycle.

In general, Crosswalk releases are based on timing, not on functionality--a release is made available based on a scheduled calendar release target instead of a set level of features.

The release schedule follows a six week cascading release methodology as follows: 

* Development of new features occurs on the master tip of the Crosswalk GIT tree. 
* Every six weeks a branch is made on the tip which is then used to stabilize for a Crosswalk release. That branch point starts the beginning of the Beta phase for a given release. 
* After six weeks of stabilization and bug fixes, and if the Beta branch passes QA metrics, it is promoted to being the Stable release. 

A new feature landing on the master tip of Crosswalk will take between six and twelve weeks before it can possibly land in a Stable release.

## Beta Branch
Once a branch is created for the stabilization process no new features are added to its tree. If a feature has not landed in tip by the beginning of the Beta phase, it will wait until the following Beta release cycle (six weeks) to enter in a stabilization branch. New features may be removed from the Beta branch if they are unstable and can not be fixed in order to meet the Stable release metrics.

This allows a greater stability in the releases, faster accommodation of industry shifts, and a forecastable load on the engineering resources, reducing contributor burn-out.

## Stable Branch
The stable branch only sees security and critical bug fixes. Critical bugs include crashes, major resource leaks, and similar broad impacting bugs.

The result of this process is that a “stable” release of Crosswalk does not mean it is functionally complete for a given usage--only that the features and functionality contained in that release are stable, as defined by the Crosswalk validation and quality assurance teams. The quantitative metrics for defining stable are TBD.

## Crosswalk Binaries
As mentioned previously, Crosswalk development occurs in three areas: master (trunk), beta-branch, and stable-branch. The Crosswalk project provides three classes of binaries: Canary, Beta, and Stable.

The **Canary build** is generated on a frequent basis (sometimes daily) based on a recent tip of master that passes a full build and automatic basic acceptance test. The Canary build lets developers that are interested in the absolute latest features, and which don’t want to build Crosswalk themselves, an easy option for working with the latest Crosswalk releases.

The **Beta build** is intended primarily for application developers looking to test their application against any new changes to Crosswalk, or to use new features intended to land in the next Stable cycle. Beta builds are published based on automated basic acceptance tests (ABAT), manual testing results, and functionality changes. There is an expected level of stability with Beta releases, however it is still Beta and may contain significant bugs.

The **Stable releases** are end-user targeting releases. Once a Crosswalk release is promoted to the Stable channel, that release will only see new binaries for critical bugs and security issues.

## Version Numbers
The Crosswalk version numbers is a four part decimal number, in the form of A.B.C.D for example: 1.28.52.3

The first number (1 in the above example) represents the Crosswalk major release version. It is updated every six weeks immediately after the master tree is branched for the stabilization cycle.

The second number (28 in the above example) represents the upstream Chromium beta release version that the source is based on.

The third number (52 in the above example) is the build number. It is use a monotonically increasing value updated any time a new release candidate build is generated (every time there is a Canary release)

The fourth number (3) is the patch number applied to the tree each time a release is made on a stabilization branch.