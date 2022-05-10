export function runAlgorithm(prefs) {
    prefs.sort((p1, p2) => {
        return p1['studentName'] < p2['studentName'] ? -1 : 1;
    });
    let pairings = []
    for (let i = 0; i < prefs.length - 1; i += 2) {
      pairings.push(prefs[i]['studentName'] + ' and ' + prefs[i + 1]['studentName'])
    }
    if (prefs.length % 2 !== 0) {
      pairings.push("On their own: " + prefs[prefs.length - 1]['studentName']);
    }
    return pairings;
}