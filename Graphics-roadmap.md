This document explains what's going on Chromium Graphics, and what are we doing and what's our goal.

# Crosswalk roadmap
## Main areas
In collaboration with Web platform team and Visualization team
### Impl-side painting
* Dongseong and Mikhail have looked into impl-side painting.
 * We try to turn on it on Tizen, and check whether it has issues.
 * Eager to contribute to Scrolling performance issue that is the biggest blocker of impl-side painting on linux aura. : crbug.com/231915

* Chromium will turn on Impl-side painting on CrOS in M32 (Nov 4th, 2013).
 * see [crbug.com/178317](http://crbug.com/178317), [http://www.chromium.org/developers/calendar](http://www.chromium.org/developers/calendar)
 * Scrolling performance is the biggest blocker of it. I want to contribute on it. [crbug.com/231915](http://crbug.com/231915)

### Ubercompositor
* Chromium will turn on Ubercompositor on Android in M33~34 (Dec 16th, 2013 ~ Feb 17th, 2014).
 * [crbug.com/208551](http://crbug.com/208551)
 * Now we don't have any specific plan, but will try to turn on it on Linux aura and fix bugs.
* Samsung recently provided numbers on battery savings on using the Ubercompositor (one compositor for compositing UI components of the browser as well as browser content) and report around 10% savings.
 * [reference](https://groups.google.com/a/chromium.org/forum/#!topic/graphics-dev/uQRh5hvEOmo)

### Linux aura content_shell improvement
* We have several issues related to linux aura on Tizen. 
 * pinch zoom hang-up [XWALK-111](https://crosswalk-project.org/jira/browse/XWALK-111), BadDrawable bug [XWALK-12](https://crosswalk-project.org/jira/browse/XWALK-12).
* Upstream aura content_shell is not well maintained. aura content_shell is important to Crosswalk Tizen. We will improve it.

### Zero-copy texture
* Chromium Android works in progress. See map-image switcher
* [relevant discussion](https://groups.google.com/a/chromium.org/forum/?fromgroups#!topic/graphics-dev/LFqMLipr2ok)

# References
## more roadmap in Intel
* [Chromium Graphics Infrastructure by Intel](https://docs.google.com/a/intel.com/document/d/1yVCLQO7CaH5qW14fjPADhwFUMONMw1Y3yPIN9h-Xb64/edit#heading=h.r7tvqxgsb10w)
* [Chromium Graphics Road Map by Visualization team](https://opensource.intel.com/linux-wiki/chromium-graphics)

## more roadmap in Chromium
* [GPU architecture roadmap by Chromium-dev](http://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome/gpu-architecture-roadmap)

## Work in progress
* [The Future Design of Blink Compositing Updates](https://docs.google.com/a/intel.com/document/d/16beTnE-ovImtDgNZElo7PR0VzNyz3zGuJFiGf1TMTiE/edit)
* [Ubercompositor](https://docs.google.com/a/intel.com/document/d/1ziMZtS5Hf8azogi2VjSE6XPaMwivZSyXAIIp0GgInNA/edit#)
* [OutputSurface for ModeSwitching in CC](https://docs.google.com/a/intel.com/document/d/1YcEU09zkVvg86C05MbLjeKFLIG1p693Fl1gwol4wT5c/edit#)
* [Surfaces](https://docs.google.com/a/intel.com/document/d/1RxbffpK_GxPtZscXgIEN0N9ZT7IC8BObnbx9ynw92qg/edit)
* [Brainstorming Compositor CPU Cost Reduction](https://docs.google.com/a/intel.com/document/d/1WqxdSB1jnwZZv8crH-TfNLEwl_yYHNI91B2fkBAXMgo/edit#heading=h.55grm19hlikl)
* Scheduler Overhaul
 * [Phase 1](https://docs.google.com/a/intel.com/document/d/1LUFA8MDpJcDHE0_L2EHvrcwqOMJhzl5dqb0AlBSqHOY/edit#)
 * [Phase 2](https://docs.google.com/document/d/1VJf2busac85FRQYXhn8hdc-x4yp77JUroTrY-_sj5Ck/edit)
* [ZilCh (Zero Input Latency Chrome)](https://docs.google.com/a/intel.com/document/d/1HmS0YQtWg2ToY67fE8A33PJUyPSwGUwUCLMk_zjK7ik/edit)
* [Improved vsync scheduling for Chrome on Android](https://docs.google.com/document/d/16822du6DLKDZ1vQVNWI3gDVYoSqCSezgEmWZ0arvkP8/edit?pli=1)

## Done
* [GPU Accelerated Compositing in Chrome](http://dev.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome)
* [Compositor Thread Architecture](http://dev.chromium.org/developers/design-documents/compositor-thread-architecture)
* [Multithreaded Rasterization](http://www.chromium.org/developers/design-documents/impl-side-painting)
* [Chromium Graphics](http://www.chromium.org/developers/design-documents/chromium-graphics)

# People
## PM

## Developer
### WRT team
* Mikhail [@pozdnyakov](https://github.com/pozdnyakov)
* DS [@ds-hwang](https://github.com/ds-hwang)
 * [DS's informal wiki about chromium graphics](https://github.com/ds-hwang/wiki/wiki)

### Visualization team
* Kalyan [@kalyankondapally](https://github.com/kalyankondapally)
