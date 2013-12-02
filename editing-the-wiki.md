# Editing the Wiki
To edit content you need to have commit access to the crosswalk-website project.

The Crosswalk Wiki is intended to be viewed through 
http://crosswalk-project.org/#wiki. 

Please view your content on the live website after editing to ensure that the content is styled correctly.

# Linking to crosswalk-project.org content
If you would like to direct link from wiki content to pages on crosswalk-project.org, use the following syntax for the URL:

```
https://crosswalk-project.org/#{documentation,contribute,wiki}[/page([/sub-page[/anchor]]|/anchor])
```

For example, to link to the "Workflow" section on this page, you would use the following

```
[Editing Workflow](https://crosswalk-project.org/#wiki/editing-the-wiki/workflow)
```
which would look like this: [Editing Workflow](https://crosswalk-project.org/#wiki/editing-the-wiki/workflow)

# Additional link syntax
See [[wiki-link-samples]].

# Workflow
1. create, edit, or delete a page on GitHub.
2. Note the URL for the page on GitHub, for example this page is:

   https://github.com/crosswalk-project/crosswalk-website/wiki/editing-the-wiki
3. Replace 'https://github.com/crosswalk-project/crosswalk-website/wiki' with 'https://crosswalk-project.org/#wiki'
4. Visit that page in your browser to ensure that your edits look correct when formatted for the live site.

# Editing content from Documentation and Contribute
The content under '[documentation](https://crosswalk-project.org/#documentation)' and '[contribute](https://crosswalk-project.org/#contribute)' goes through more validation and styling enforcement than the [wiki](https://crosswalk-project.org/#wiki) content. As such, that content is managed in the crosswalk-website.git project itself. 

Edits to that portion of the website go through a review process prior to landing on the live site.