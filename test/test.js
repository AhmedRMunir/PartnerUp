var assert = require('assert');
const exp = require('constants');
var utils = require('../src/pages/Utils');
var React = require('react');
var StudentFormQuestion = require('../src/components/StudentFormQuestion');
describe('Matching Algorithm', function () {
  describe('#testMatchStudents()', function () {
    it('matching algorithm should generate correct results for dummy preference data', function () {
      let people = [{studentName: "James", answers: "java"}, {studentName: "Detlef", answers: "java"}, {studentName: "Ahmed", answers: "python"}];
      let pairings = utils.runAlgorithm(people);
      
      let expected = ['James and Detlef', 'On their own: Ahmed'];
      assert(pairings.length == expected.length);
      for (let i = 0; i < pairings.length; i++) {
        assert.equal(pairings[i], expected[i]);
      }

      let people2 = [{studentName: "James", answers: "java"}, {studentName: "Detlef", answers: "java"}, {studentName: "Ahmed", answers: "python"}, {studentName: "Alam", answers: "python"}];

      let pairings2 = utils.runAlgorithm(people2);
      let expected2 = ['James and Detlef', 'Ahmed and Alam'];
      assert(pairings2.length == expected2.length);
      for (let i = 0; i < pairings.length; i++) {
        assert.equal(pairings2[i], expected2[i]);
      }


      let people3 = [{studentName: "James", answers: ["java", "red"]}, {studentName: "Detlef", answers: ["java", "blue"]}, {studentName: "Ahmed", answers: ["python", "green"]}, {studentName: "Alam", answers: ["python", "green"]}];
      let pairings3 = utils.runAlgorithm(people3);
      let expected3 = ['James and Detlef', 'Ahmed and Alam'];
      assert(pairings3.length == expected3.length);
      for (let i = 0; i < pairings.length; i++) {
        assert.equal(pairings3[i], expected3[i]);
      }

    });
  });
});

describe('Student Form Link Generation', function () {
  describe('#generateFormURL', function () {
    it('should return a valid URL', function () {

      
      let baseURL = "localhost:3000";
      let classID = "1000";
      let expectedURL = "localhost:3000/student-form?classID=1000"

      assert.equal(expectedURL, utils.generateFormURL(baseURL, classID));
    });
  });
});

describe('Question HTML Generation', function () {
  describe('#generateQuestionHTML', function () {
    it('should return a valid Question HTML', function () {

      let questions = [{id: 1000}, {id: 2000}];
      let questionHTML = utils.generateQuestionHTML(questions, () => {return 1});

      console.log(questionHTML);
      let expectedQuestion0 = <StudentFormQuestion key={questions[0].id} question={questions[0]} onOptionChange={optionNum => handleOptionChange(0, optionNum)} />;
      let expectedQuestion1 = <StudentFormQuestion key={questions[1].id} question={questions[1]} onOptionChange={optionNum => handleOptionChange(1, optionNum)} />;
      
      assert.equal(questionHTML[0] + "", expectedQuestion0 + "");
      assert.equal(questionHTML[1] + "", expectedQuestion1 + "");

    });
  });
});