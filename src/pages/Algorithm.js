// Matching Algorithm

// Takes an array of JSON data objects representing student preference form responses (one for each student) 
// and returns an array of strings representing the generated student pairs.

export function runAlgorithm(prefs) {
  // Sorts the preferences by studentName
  prefs.sort((p1, p2) => {
      return p1['studentName'] < p2['studentName'] ? -1 : 1;
  });
  // Adds pairs of students to the result
  let pairings = []
  for (let i = 0; i < prefs.length - 1; i += 2) {
    pairings.push(prefs[i]['studentName'] + ' and ' + prefs[i + 1]['studentName'])
  }
  // Adds the extra student to their own group if needed.
  if (prefs.length % 2 !== 0) {
    pairings.push("On their own: " + prefs[prefs.length - 1]['studentName']);
  }
  return pairings;
}