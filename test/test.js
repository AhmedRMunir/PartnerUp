var assert = require('assert');
var matchingAlgo = require('../src/pages/Algorithm');
describe('Matching Algorithm', function () {
  describe('#testMatchStudents()', function () {
    it('matching algorithm should generate correct results for dummy preference data', function () {
      let people = [{studentName: "James", answers: "java"}, {studentName: "Detlef", answers: "java"}, {studentName: "Ahmed", answers: "python"}];
      let pairings = matchingAlgo.runAlgorithm(people);
      
      let expected = ['James and Detlef', 'On their own: Ahmed'];
      assert(pairings.length == expected.length);
      for (let i = 0; i < pairings.length; i++) {
        assert.equal(pairings[i], expected[i]);
      }

      let people2 = [{studentName: "James", answers: "java"}, {studentName: "Detlef", answers: "java"}, {studentName: "Ahmed", answers: "python"}, {studentName: "Alam", answers: "python"}];

      let pairings2 = matchingAlgo.runAlgorithm(people2);
      let expected2 = ['James and Detlef', 'Ahmed and Alam'];
      assert(pairings2.length == expected2.length);
      for (let i = 0; i < pairings.length; i++) {
        assert.equal(pairings2[i], expected2[i]);
      }


      let people3 = [{studentName: "James", answers: ["java", "red"]}, {studentName: "Detlef", answers: ["java", "blue"]}, {studentName: "Ahmed", answers: ["python", "green"]}, {studentName: "Alam", answers: ["python", "green"]}];
      let pairings3 = matchingAlgo.runAlgorithm(people3);
      let expected3 = ['James and Detlef', 'Ahmed and Alam'];
      assert(pairings3.length == expected3.length);
      for (let i = 0; i < pairings.length; i++) {
        assert.equal(pairings3[i], expected3[i]);
      }

    });
  });
});