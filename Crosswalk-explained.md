## Introduction

Crosswalk provides an application run-time environment for executing Packaged and Hosted Web Applications. The W3C defines these as traditional web applications combined with a manifest file indicating that a web application can be installed on the end-user’s device. The distinction between Packaged and Hosted is that the former provides all of the files necessary to run the web application within a single signed binary. Hosted applications need only provide a manifest file and connect to their origin-server to obtain additional resources (including, but not limited to, JavaScript, CSS, and HTML content.)

## Use Cases of Crosswalk
Application vendors looking to create OS and CPU independent applications leveraging HTML5 technologies will typically use the Crosswalk deployment model. If the application vendor wishes to take advantage of Crosswalk specific capabilities, they may do so--however that application will then only run in either the Crosswalk run-time, or a run-time that includes the Crosswalk APIs (via JavaScript poly-fill or other means.)

To use the crosswalk deployment model the application vendor creates a packaged or hosted web application, following Crosswalk's manifest and packaging specification. They then host their application on a website or in an application store. Upon downloading the application, the end-user (depending on OS integration) will either be automatically prompted to install the application into the Crosswalk environment, or the user will need to select the Crosswalk environment to open the downloaded file.

## Application Security
The crosswalk deployment model provides the highest level of end-user security. End users do not need to trust the application vendor to be honest--Crosswalk restricts the application to only access capabilities the user or run-time have determined to be appropriate for the particular application.

Access to privileged APIs requires Crosswalk to trust the application sufficiently to grant access to those APIs. Trust may be established through end-user prompting, chain of trust, or other means. An application is only granted access to privileged APIs which are explicitly requested in the application’s manifest file and granted to it by Crosswalk.

Attempts to access APIs not explicitly granted to the application are blocked by Crosswalk. Exploits in Crosswalk are further mitigated through sandboxing techniques in Crosswalk itself.

## Native Access
Applications running in Crosswalk environment execute in the confines of the HTML5 sandbox. As such, there is no mechanism for those applications to access additional native OS capabilities.

## Update model

The Crosswalk run-time is updated as part of a process outside the control of the web application. 

While Crosswalk strives to provide backward compatibility, we acknowledge that bugs will occur[[1](https://support.mozilla.org/en-US/questions/946291)]. This is especially relevant in office productivity applications. On the other hand it is important that web applications run in an up-to-date runtime for reasons such as security, features, and bug fixes. We'll strive to update the runtime often and expect web application developers will test their application with the latest version to ensure it works correctly.