# PartnerUp! User Documentation

## High Level Description:

The system allows instructors/administrators to create pairings of students via a preference form that they create. After the instructor/administrator creates their custom preference form, they send out a URL to their students that allow them to fill out the form. Once students have filled out the form the teacher can generate a list of pairings of similar students based on the preferences the users have input.

## How to Install Software:

No installation needed. The service is a website.

## How to run the Software?

Simply go to https://partnerup-8fb5c.web.app/

## How to use the Software?

- ### Instructor Side:
  - On a browser, go to the website link: WORK IN PROGRESS
  - Log in with SSO
  - Create a class
  - Add desired questions and answers for the preference form
  - Click “Submit” when you’re done creating the preference form
  - You will be taken back to the class page with a link generated
  - You can manually copy this link and send it to the students in your class via email
  - Once the students have filled out the preference form, click “Run Algorithm”
  - After the Algorithm has done executing, you should see the results of pairing students together in groups of two directly on the page
- ### Student Side:
  - The instructor should send you a link to the preference form
  - Once you land on the preference form, fill out your name and choose your preferences
  - Click “Submit” when you’re done

## How to report a bug:

- Please report bugs by going to this link: https://github.com/AhmedRMunir/PartnerUp/issues/new and opening a new issue
- Please follow guidelines from this link when writing a bug report and include as much information as possible: https://developer.mozilla.org/en-US/docs/Mozilla/QA/Bug_writing_guidelines 

## Known bugs:
- Log in with SSO does not actually work and there is currently no way to have separate “instructor accounts”. There is only one global instructor which anyone who visits the website is signed in as.
