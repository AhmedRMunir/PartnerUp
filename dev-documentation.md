# PartnerUp! Developer Documentation

## How to obtain the source code:
- Download the code from the repository
- Run `./gradlew` to initialize project
  - It will install the required dependencies such as:
    - NPM
    - Jest
    - Firebase
    - React, DOM, Fonts, etc.

## The layout of your directory structure. What do the various directories (folders) contain, and where to find source files, tests, documentation, data files, etc.
- build folder:
  - where the build files exist
- functions:
  - Houses the Cloud Functions
- gradle:
  - Houses the gradle files
- node_modules:
  - Houses the npm and project dependencies
- public:
  - static resources
- reports:
  - weekly updates on project progress
- src:
  - contains the source code
- src/components:
  - Code for page components such as the Navigation bar, Question Template and Student Form
- src/pages:
  - Code for the different pages in the website + the Algorithm
- test:
  - Contains testing files
- ReadME:
  - contains functions to run the service

## How to build the software:
- > `./gradlew`
- > `npm start`

## How to test the software:
- > `./gradlew`
- > `npm test`

## How to add new tests:
- Make a javascript file with desired name in the test folder
- Use `require` statements to import modules
  - Example: 
  - > `var assert = require('assert');`
  - > `var matchingAlgo = require('../src/pages/Algorithm');`
- Use the `describe`...`it` format as shown in `test.js`
- Use assertions to check the validity of inputs and outputs

## How to build a release of the software:
- Refer to the above steps to build the software and test the software
- Run the service and manually test out the Use Cases detailed in the Living Requirements Document
- If no issues are encountered, commit and push the code with the changes