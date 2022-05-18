# Week 6 Meeting Report

## Meeting Agenda
- Testing:
  - What do we need to test and how
- Strategies to approach merging front-end and back-end

## Previous Week's Goals

- Start designing preferences form (in code)
- Initialize Cloud Function for algorithm
- Write dummy matching algorithm (which returns a random matching)
- Finalize Gradle build system

## Progress and Issues
- Made instructor, student, and front page interfaces
- Front-page:
  - Welcome page + log-in button
- Instructor page:
  - Nav bar for courses + hamburger button
  - Dynamic preference form with ability to add and remove questions and answers
  - Send preference form to database through form submit
- Student page:
  - Custom URL with paramters
  - Upload Student answers to database
- Testing:
  - Decided to use CircleCI for CI testing:
    - Set-up periodic testing and linked to Github
  - Mocha for ReactJS testing:
    - Uploaded dependencies
- Updated the living Requirement Doc

## Next week's goals:

- Detlef + Roman + Ahmed/James:
  - Merge the front-page, instructor and student branches into the main branch
- Ahmed + James:
  - Set-up cloud function to match students
  - Display matched students on the instructor page
- Alamjit + Umair:
  - Use Mocha + CircleCI to write all the tests needed

## Contributions:

- All members:
    - Researched Testing options
    - Worked on Living Doc.
- Roman:
    - Set-up Gradle
      - Works on mac but not PC, might veto
      - Needs more testing
    - Set-up Front-page and basic instructor page lay-out
    - Set-up Mocha framework
- Alamjit:
    - Set-up CircleCI framework
- Detlef:
    - Set-up Database data structure and format
    - Student form page
      - Custom URL + pushing preference to DB
- Umair:
    - Student form page
      - Custom URL + pushing preference to DB
- James:
    - Set-up Database data structure and format
    - Dynamic Instructor preference form
    - Submitted Req. doc
- Ahmed:
    - Helped with Instructor preference form creation
    - Worked on Req. Doc.
