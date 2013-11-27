## Logistics
To edit content you need to have commit access to the crosswalk-website project.

The Crosswalk Wiki is inteneded to be viewed through 
http://crosswalk-project.org/#wiki. Please view your content on the live website after editing to ensure that the content is styled correctly.

## Using links
See [[wiki-links-samples]].

### Wiki and Website references in content

Direct links to the Crosswalk website pages should be entered as follows: #SECTION/PAGE/ANCHOR

#### SECTION
The section is either [#wiki](#wiki), [#documentation](#documentation), or [#contribute](#contribute).

#### PAGE
The page is the wiki page itself, for example "editing-the-wiki" (for this page). The syntax to reference this page, 
since it is presented in the wiki portion of the website, is: [#wiki/editing-the-wiki](#wiki/editing-the-wiki).

#### ANCHOR
If you want to link to a particular section of a page, you can provide one final path element--the anchor name. To 
link straight to this section the syntax is: [#wiki/editing-the-wiki/ANCHOR](#wiki/editing-the-wiki/ANCHOR).

NOTE: The ANCHOR syntax is not recognized by Gollum or the GitHub wiki system itself--it is coded into the 
http://crosswalk-project.org website itself.

## Workflow
The most efficient workflow for editing content is to do so with a local install of Gollum running in a local instance of the website.

1. Edit the content locally using the live preview editor provided by Gollum's web interface.
1. Saving changes locally via Gollum. 
1. Verify your content looks correct when rendered in the local instance of the website. 
1. Push your changes to crosswalk-website.wiki.git
1. The next content update cycle on the Crosswalk website will automatically pull in your content. 

## Editing on GitHub
If you just need to get in and make a quick edit, feel free to do so using the [GitHub Crosswalk wiki 
interface](http://github.com/crosswalk-project/crosswalk-website/wiki). Be warned that GitHub flattens the directory 
structure, so editing of sub-pages (documentation and contribute sections) can be tricky and isn't recommended. Pages 
in the root structure of the site (wiki/*) are fine to edit.

Your content won't show up on the live website until the next content update is pulled to the live pages. The 
publishing schedule for this is still TBD based on the frequency of content updates and quality of those edits.

## Local Wiki in your own editor
If you want to edit the Wiki content locally using your own editor, the steps are pretty quick:
```sh
git clone git@github.com:crosswalk-project/crosswalk-website.wiki.git
cd crosswalk-website.wiki
# Edit your content
git commit -s -a
git push
```
You can then go to http://github.com/crosswalk-project/crosswalk-website/wiki to see your changes.

## Local Wiki in a Local Website
The detailed steps for installing the Crosswalk website and Gollum are documented in the [Crosswalk website README.md](https://github.com/crosswalk-project/crosswalk-website/blob/master/README.md). 

For those that just want to copy commands to their console, the quick steps on an Ubuntu system are as follows:
```sh
# Install Ruby >=1.9.1
sudo apt-get install ruby1.9.3 rubygems1.9

# Select gem1.9.1
sudo update-alternatives --config gem

# Select ruby1.9.1
sudo update-alternatives --config ruby

# Install Gollum and the various markup parsers
sudo gem install gollum redcarpet org-ruby wikicloth

# Install the SASS compiler (with source map support)
sudo gem install sass -v ">=3.3.0alpha" --pre

# Change to the root path of your web server installation path
cd /var/www

# Clone the Crosswalk site
git clone git@github.com:crosswalk-project/crosswalk-website

# Clone the Crosswalk website wiki
cd crosswalk-website/wiki
git clone git@github.com:crosswalk-project/crosswalk-website.wiki.git --bare .git
sed -i -e 's/bare = true/bare = false/' .git/config
git checkout
cd ..

# Change the permissions of all the files checked out so the web-server software can edit it
sudo chown :www-data /var/www/crosswalk-website -R
sudo chmod g+rwX /var/www/crosswalk-website -R

# Launch Gollum pointing to where you just cloned the wiki
gollum --base-path wiki --live-preview /var/www/crosswalk-website/wiki &

# Launch a browser pointing to the website
xdg-open http://localhost/crosswalk-website/#wiki

# Launch a browser pointing to the Wiki content
xdg-open http://localhost:4567
```
And you're good to go. You can edit your content in the tab pointing to the Gollum server (port 4567) and after you click the Save icon for any content, you can change over to your localhost/crosswalk-website tab and hit refresh to see the new content.


For the above to all work, you also need to have Apache2 installed, with PHP enabled. In your Apache2 installation you 
must disable MultiViews and enable FollowSymLinks in your site configuration (typically /etc/apache2/sites-enabled/000-default).


Once you're done editing content, you can push your Wiki changes back to GitHub:

```sh
cd /var/www/crosswalk-website/wiki
git push origin master
```
You can verify your content is correct by viewing the pages at http://github.com/crosswalk-project/crosswalk-website/wiki.


Content will be merged to the live website during the next release/update cycle of Crosswalk. If you have ssh access to push changes 
to the staging servers, you can use the update-wiki.sh script:
```sh
./update-wiki.sh
```

