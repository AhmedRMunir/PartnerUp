import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

var assert = require('assert');
var matchingAlgo = require('../src/pages/Algorithm');
describe('Matching Algorithm', function () {
  describe('#testMatchStudents()', function () {
    it('matching algorithm should generate correct results for dummy preference data', function () {
      let people = [{studentName: "James"}, {studentName: "Detlef"}];
      let pairings = matchingAlgo.runAlgorithm(people);
      let expected = ['Detlef and James'];
      assert(pairings.length == expected.length);
      for (let i = 0; i < pairings.length; i++) {
        assert.equal(pairings[i], expected[i]);
      }
    });
  });
});