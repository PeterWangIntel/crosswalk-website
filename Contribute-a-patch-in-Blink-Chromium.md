* Create a local branch with your change : `git checkout -b "FooBar"`.
* Commit your change making sure you're following the commit template
* Use `git cl upload` to create a new review issue and upload the diff, this means that the current git branch will be used to track the issue you've just created.

**WARNING : At this time the patch is not published which means that it's not up to review. No reviewers are CC and it's not published on the blink-reviews mailing list**
* Throw to the EWS with `git cl try`. This works only for the committers at the moment.
* Make sure it's green, then in the UI of codereview you can click on "Publish and mail comments" which will publish your patch for review. You can add reviewers and leave an empty comment.
* Wait the lgtm to either land if you are committer or tick the cq.

## Tips and tricks :
*  Do not publish right away unless it's trivial, always wait the EWS to be green. You can upload as many patchsets as you want without publishing so you can get EWS green and you will not spam the reviewers in the meantime. This is a great improvement over WebKit.

Note: Currently the EWS are using a Last Known Good Revision and might be outdated... thus they are not 100% trustworthy. 

* Do not work your changes on master otherwise the master branch will be tracked with the issue you will create as soon as you upload. You can "untrack" the master (or any branch) by editing .git/config and remove the rietvield association for the given branch.

* If you apply a patch manually (other than git cl patch) in a custom local branch and you want to tell git cl to associate this branch with a given rietveld (codereview) issue you can type : `git cl issue XXXXXX`, or `git cl issue 0` to reset the counter (it will asign one automatically when uploading)
