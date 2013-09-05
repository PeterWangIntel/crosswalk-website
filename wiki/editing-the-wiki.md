The wiki content provided on http://crosswalk-project.org/#wiki is managed by the Gollum infrastructure at http://github.com/crosswalk-project/crosswalk-website.wiki.git.

To edit content you need to have commit access to the crosswalk-website project.

The best work flow for managing content is to do so with a local install of Gollum (see the crosswalk-website page [Gollum and the Wiki](https://github.com/crosswalk-project/crosswalk-website/blob/master/README.md#gollum-and-the-wiki).)

Once you have Gollum running locally, you can point your browser to http://localhost:4567
and edit the content in the live preview editor. When you are satisfied with your content, you can push it back to the GitHub project.

The general workflow is:
```sh
git clone git@github.com:crosswalk-project/crosswalk-website.wiki.git
gollum --base-path wiki --live-preview ${PWD}/crosswalk-website.wiki >/dev/null 2>&1 &
xdg-open http://localhost:4567
# Make your changes, create pages, etc.
git push origin master
```
You can verify your content is correct by viewing the pages at http://github.com/crosswalk-project/crosswalk-website/wiki.

Content will be merged to the live website during the next release/update cycle of Crosswalk.