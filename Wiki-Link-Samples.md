The wiki system supports a myriad of ways to specify URLs. You can probably come up with some additional forms, however these are the ones we've tested. Edit the page to see the markdown syntax.

## Supported Link types
The following work on GitHub and https://crosswalk-project.org/#wiki:

* Fully Qualified: [website](https://crosswalk-project.org/)
* Page anchor: [anchor on another page](Home#for-developers)
* Local anchor (provide local page name): [anchor on this page](wiki-link-samples#deprecated-link-types)
* Local anchor (provide anchor tag): <a href='#deprecated-link-types'>anchor on this page</a>
* crosswalk-project documentation: [documentation](https://crosswalk-project/#documentation)
* crosswalk-project wiki: [wiki](https://crosswalk-project/#wiki/wiki-link-samples)
* crosswalk-project contribute: [contribute](https://crosswalk-project/#contribute)
* wiki entry, no path: [reference to this page](wiki-link-samples)
* wiki entry, no path or name: [[wiki-link-samples]]

## Deprecated Link types
These types used to work when viewed from the website, however they did not work when viewed from GitHub.
These forms should be avoided as of December 1, 2013:

* crosswalk-project documentation: [documentation](#documentation)
* crosswalk-project wiki: [wiki](#wiki/wiki-link-samples)
* crosswalk-project contribute: [contribute](#contribute)
* wiki entry, incorrect path: [incorrect path pointing to this page](wiki/wiki-link-samples)
* Local anchor, no page: [anchor on this page](#deprecated-link-types)

