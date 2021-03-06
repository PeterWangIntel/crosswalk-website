## Introduction

This is the home page for Crosswalk testing. You should find everything related to test scope, test execution plan and running tests here. Moreover, the Crosswalk test dashboard and bug scrub info are also linked here. Please feel free to send an email to crosswalk-dev@lists.crosswalk-project.org if you have any questions.

## Test Scope

The purpose of Crosswalk tests is to validate the functionality of Web runtime and HTML5 features by performing planned testing on branch releases across multiple operating system (OS).

QA define the test approaches separately according to requirements from Crosswalk Roadmap.

## Test Set

QA team conducts testing with different frequencies and test scope on Crosswalk branches.

### Basic Acceptance Test (BAT)

* Acceptance test set is fully automated. The purpose is to check every released binary quickly after it's generated by release engineer.
* Acceptance test usually covers image installation, boot up, basic feature and Web API existence check points, which helps the release engineer to make a quick decision on if the current image is qualified for further integration and QA activities. 

### Nightly Automation Test

* Fully automated tests that include all the auto test cases from Functionality Test. 

### Functionality Test

* Functionality test is designed to test product requirements or features. It includes both functional and non-functional tests, as well as negative tests.
* Functionality test covers Feature Test, Web API Test, Behavior Test and Sample Web Application Test.
 * Feature: Feature test for web runtime features defined in Crosswalk Runtime Model Specification. Furthermore, the feature test covers common features which implemented but not in roadmap requirements.
 * Web API Test: W3C Web API, Supplementary API and Extension API, which are strictly based on open specifications or Crosswalk specific specification. Spec-based tests have full coverage for interface and statement described in specification. Most W3C Web API tests are leveraged from [Tizen Compliance Tests](https://source.tizen.org/compliance/compliance-tests)
 * Behavior: A Web application that includes the combined behavior tests, composing by a set of scenarios tests which could be performed by end user directly in one Web application.
 * Sample Web Application: Validate web runtime model by sample web applications. The test involves full-function web applications to test Web runtime features from W3C part and Crosswalk specific part cross different OS and platforms.

## Test Suite

Please refer to [Crosswalk test suite](Crosswalk-test-suite) page for more details.

## Test Execution Plan

Test execution plan and test cadence for Crosswalk branching (Canary, Beta, Stable) release. 

<img src='assets/testcadence.png' alt='Test Cadence'>

## Test Contribution

QA team is committed to evaluate the quality of Crosswalk features reliable and interoperable on web platforms. With this intention, we prioritize Crosswalk testing as a way to perform the latest standard W3C Web API tests always.

In past two years, we submitted comprehensive spec test suites, such as HTML5 Web audio and video, file API, CSS3 to the W3C. We’ll continue to create conformance tests to W3C web spec test suites, so that implementations for new features are interoperable from the beginning. And we are also working with [web-platform-tests](https://github.com/w3c/web-platform-tests) team with boarder contributors to share and improve spec test methodology, test maintenance and test automation infrastructure in community.

We've always played a key participant role and major organizer in [Test the Web Forward](http://testthewebforward.org/sydney-2013.html) events. Besides over thousands tests has been submitted and passed review during the past events, we are the key presenters of delivering the training sessions in Beijing, Shanghai and Shenzhen, PRC events.

## Quality Indicators

Crosswalk dashboard
 * [Crosswalk Dashboard](https://crosswalk-project.org/jira/secure/Dashboard.jspa?selectPageId=10303)

Crosswalk test reports
 * [Canary Test Report](https://lists.crosswalk-project.org/pipermail/crosswalk-dev/)
 * [Canary Nightly Automation Test Report](https://lists.crosswalk-project.org/pipermail/crosswalk-autotest/)
 * [Beta Test Report](https://lists.crosswalk-project.org/pipermail/crosswalk-dev/)

Crosswalk test result indicators<br/>
 * For latest test results about the release channels, see [Crosswalk test result indicators](Crosswalk-test-result-indicators).

Crosswalk feature list
 * [Crosswalk Features](https://crosswalk-project.org/jira/issues/?filter=10004)

Crosswalk open bugs
 * [Bugs on Canary](https://crosswalk-project.org/jira/issues/?filter=10001)
 * [Bugs on Beta](https://crosswalk-project.org/jira/issues/?filter=10002)
 * [Bugs on Stable](https://crosswalk-project.org/jira/issues/?filter=10003)

## Bug Report & Bug Scrub

* Bug Report
 * Issue tracking for Crosswalk using [JIRA](https://crosswalk-project.org/jira/). 
* Bug Triage
 * [Bug and feature tracking and triaging process](Crosswalk-bug-and-feature-tracking-and-triaging)
* Bug Scrub
 * Purpose:
    * Review new bugs field correctness, such as severity, component, assignee, and set bug priority.
    * Make a decision for branch release blocker 
 * IRC: irc://irc.freenode.net, #crosswalk
 * Thursday, Time: 15:30 ~ 16:00 GMT+8 (Beijing Time), 9:30 ~ 10:00 GMT+2 (Helsinki Time), 7:30 ~ 8:00 GMT+0.
 * History log: [Email Archives](https://lists.crosswalk-project.org/pipermail/crosswalk-dev/) 

## Related Links

* Tizen Compliance Test: https://source.tizen.org/compliance/compliance-tests
* Crosswalk binary downloads: https://crosswalk-project.org/#documentation/downloads 