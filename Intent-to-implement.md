In an attempt to improve the efficiency of the PR reviews, we are taking a page from the Blink project and adopting the practice of “Intent to Implements”. The idea is to let owners and other developers know about what a developer or development team plans to implement and how, to give a chance to comment on early design choices and avoid the cost of doing that when the implementation is already too far ahead.

Before starting a new implementation a developer should send a mail to this mailing list with the following information:

<pre>
Email subject: Intent to Implement <em>(summary)</em>

Email body:  

Summary: what this implementation is about, what it does, why it's needed  
Affected component:  
Related feature: <em>(Jira ID)</em>
Target Release: <em>(Crosswalk N)</em>
Implementation details: depending on the complexity, this can be a short walkthrough in the email body, one-liner for simple implementations, link to Google Docs design if present (but not required - we prefer that the discussion is started before extensive design is done)
</pre>

The plan should be approved (LGTM) by the relevant owner(s).