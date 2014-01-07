# Editing the Wiki
To edit content need commit access to the crosswalk-website project. If you are interested in contributing or editing content in the Wiki, please file an issue in Crosswalk's [Jira](https://crosswalk-project.org/jira) providing your GitHub user name and contact information. Due to how
GitHub manages wiki content, we may not be able to grant edit access to all requests.

Please view your content on the [live website](https://crosswalk-project.org/#wiki/history) after editing to ensure that the content is styled correctly.

## Linking to site content
If you would like to direct link from wiki content to pages on crosswalk-project.org, use the following syntax for the URL:

```pre
https://crosswalk-project.org/#{documentation,contribute,wiki}[/page([/sub-page[/anchor]]|/anchor])
```

For example, to link to the "Workflow" section on this page, you would use the following

```pre
[Editing Workflow](https://crosswalk-project.org/#wiki/editing-the-wiki/workflow)
```
which would look like this: [Editing Workflow](https://crosswalk-project.org/#wiki/editing-the-wiki/workflow)

## Adding an image
To add a image hosted the wiki, you first need to add the file into the wiki. You need to do that via the command line:

```bash
git clone ssh://git@github.com/crosswalk-project/crosswalk-website.wiki.git wiki
cd wiki
ls assets
```
You will see several files in the assets/ directory. This is where you copy your file. Let's say it is called "android-webgl.png". Add that file to git, commit that change, then push back to GitHub:
```bash
git add assets/android-webgl.png
git commit -s -a -m 'Added android-webgl.png for "developing-on-windows" page'
git push origin master
```
To reference the image from your page:
```html
<img src='assets/android-webgl.png' alt='WebGL Sample Application on Android'>
```
Which, when viewed from the wiki should look like this:

<img src='assets/android-webgl.png' alt='WebGL Sample Application on Android'>

## Additional link syntax
For information on the various type of links you can use in your pages, see [[wiki-link-samples]].

## Workflow
1. create, edit, or delete a page on GitHub. Recommendation is to use the 'Markdown' mode for new content.
2. Note the URL for the page on GitHub, for example this page is:

   https://github.com/crosswalk-project/crosswalk-website/wiki/editing-the-wiki
3. Replace 'https://github.com/crosswalk-project/crosswalk-website/wiki' with 'https://crosswalk-project.org/#wiki'
4. Visit that page in your browser to ensure that your edits look correct when formatted for the live site.

## Editing other content
The content under '[documentation](https://crosswalk-project.org/#documentation)' and '[contribute](https://crosswalk-project.org/#contribute)' goes through more validation and styling enforcement than the [wiki](https://crosswalk-project.org/#wiki) content. As such, that content is managed in the crosswalk-website.git project itself. 

Edits to that portion of the website go through a review process prior to landing on the live site.