var assert = require('assert');
var matchingAlgo = require('../src/pages/Algorithm');
describe('Matching Algorithm', function () {
  describe('#testMatchStudents()', function () {
    it('matching algorithm should generate correct results for dummy preference data', function () {
      let people = [{studentName: "James"}, {studentName: "Detlef"}];
      let pairings = matchingAlgo.runAlgorithm(people);
      
    });
  });
});