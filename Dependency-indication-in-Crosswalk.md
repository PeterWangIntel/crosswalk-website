# About
Since we will maintain downstream chromium/blink for Crosswalk, may be more other repos in future. It’s necessary to provide a mechanism to indicate the dependency in crosswalk’s main project repo.

# Objective
* The dependency should be accurate as the downstream repo evolving. A bad example of this is to say that Crosswalk dev branch is depends on chromium-crosswalk lkgr branch. The lkgr branch will be changing overtime, and it will be hard to get the specified source tree back to some history point.
* The indication should come with a solution to check out the whole source tree easily. It will be very helpful for both developer and build infrastructure.
* Crosswalk should only maintain its real dependency (the downstream repos we forked) instead of copy the whole dependency from chromium.

# Solution in chromium
* Chromium has _DEPS_ file in its major project which contains all dependencies of third party repos.
* The dependency is expressed by svn revision or git commit hash id.
* Chromium uses gclient tool to fetch and sync code.
* For versioned checkout, chromium provides the _DEPS_ for specified version individually at http://src.chromium.org/svn/releases/ . It’s a snapshot of all the repos’s (including chromium itself) svn revision.

# For Crosswalk
## Solution:
Add two deps file into Crosswalk repo, _DEPS_ and _DEPS.crosswalk_. <br>
_DEPS_ is like:
```
vars = {
}

deps = {
}

hooks = [
  {
    # Fetch Crosswalk dependencies.
    "pattern": ".",
    "action": ["python", "src/crosswalk/tools/fetch_deps.py", "-v"],
  },
  {
    # A change to a .gyp, .gypi, or to GYP itself should run the generator.
    "pattern": ".",
    "action": ["python", "src/crosswalk/gyp_crosswalk"],
  }
]
```
_DEPS.crosswalk_ is like:
```
chromium_version = 'Trunk'
chromium_crosswalk_point = '45a733d6ac45650d9ddc019ade3c7dbd3b91a816'
deps_crosswalk = {
  'src': 'ssh://github.com/crosswalk-project/chromium-crosswalk.git@%s' % chromium_crosswalk_point,
  'src/third_party/WebKit/Tools/DumpRenderTree': None
}
```
_DEPS.crosswalk_ is the one that keeps all Crosswalk’s dependency information. There will be a python script in Crosswalk which will take this _DEPS.crosswalk_ as input and generate a new _.gclient-crosswalk_ file for chromium. Then the python script will invoke gclient sync upon it. The _.gclient-crosswalk_ file will be like:
```
solutions = [{
  'url': 'ssh://github.com/crosswalk-project/chromium-crosswalk.git@45a733d6ac45650d9ddc019ade3c7dbd3b91a816',
  'name': 'src',
  'deps_file': '.DEPS.git',
  'custom_deps': {
    'src/third_party/WebKit/Tools/DumpRenderTree': None
  }
}]
```

And we put the execution of the _fetch_deps.py_ as a hook in Crosswalk's DEPS file. Which means if we run gclient sync on the Crosswalk project, it will do: <br>
* Checkout Crosswalk
* Run Crosswalk gclient hooks
    * Invoke _fetch_deps.py_
        * Setup git repo in _src/_.
            * _git init_ in src/
            * _git remote add_ in src/
            * _git fetch_ in src/
            * _git checkout_ in src/
        * Generate _.gclient-crosswalk_.
        * Invoke _gclient sync –gclient-file=.gclient-crosswalk_
            * Checkout chromium and its dependencies, which some of them are overwritten if it’s also defined in DEPS.crosswalk
            * Run chromium gclient hooks
    * Do gyp crosswalk

For versioned checkout, Crosswalk can do the same thing as chromium. Provide a snapshot that combines the _DEPS_ in chromium and the _DEPS.crosswalk_ in Crosswalk.

## Based on the solution:
* The dependencies is indicated clearly to support bisect.
* Easy to checkout source tree.
    * Gclient config + gclient sync for trunk/version/any history point checkout.
* Integration with our downstream rebase work.
    * Do rebase first. After conflict resolve/build/test/etc, prepare the branch in downstream chromium.
    * Send a pull request to Crosswalk to update _DEPS.crosswalk_, maybe some code together to adapt upstream change.
* Integration with cross project development.
    * Developer will first send pull request for chromium/blink part of code.
    * After chromium part got merged, send a pull request to Crosswalk to update _DEPS.crosswalk_ as well as the Crosswalk part of code.

## Compare with CEF3
* The idea is very similar
    * CEF3 uses a text file to indicate the chromium revision it depends on
* The implementation are different:
    * CEF3 use automate.py instead of gclient system for itself, but it do invoke gclient sync for chromium anyway.
    * CEF3 chooses to maintain patches instead of downstream fork, so no custom deps at all.
