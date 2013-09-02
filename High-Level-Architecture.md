## Architecture Diagram

The below diagram shows the high-level architecture of Crosswalk and its developer offerings.


![Diagram](https://raw.github.com/crosswalk-project/crosswalk/master/wiki/images/architecture_crosswalk.png?login=darktears&token=ee4699fc47b4a52a0e0de023ee830c59)

## Developer Offering

**Application Runtime** : Provides the runtime for executing a packaged or hosted Web Applications. These are traditional web applications combined with a manifest file which indicates that a web application can be installed on the end-user’s device. Some traditional web facing API will be disabled in this mode, just like with Chrome.

## Building Blocks

**Web API Extensions** : All additional Web APIs that we're exposing to the user. They don't have a place in Chromium (non standard) and need to be separated from others. For example Tizen APIs will be outside Chromium and supported for compatibility reasons.

**Chromium Content Module** : This is the content module of Chromium which will be used as a basis for building our deployment models.

**Chromium Browser Components** : We expect to use some modules of Chromium in addition to the content module. While we do not want to embed the entire Chrome Browser we want to reuse the pieces that makes sense. For example when something is missing in Content but already implemented in the browser and not modularised we should modularised this piece to avoid code duplication.

**Chromium App Components** : This is the components useful for Crosswalk but not part of the Content Module, they sit in a separate directory in Chromium and are self contained features.

For Chromium Browser Components and Chromium App Components, as today not all the features we need are self contained so we will need to contribute in Chromium upstream to make sure we help modularising what is needed.