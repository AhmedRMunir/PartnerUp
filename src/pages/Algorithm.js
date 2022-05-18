export function runAlgorithm(prefs) {

    let pairings = []
    const pairIndices = new Set();
    // outer loop to go through preferences
    for (let i = 0; i < prefs.length; i++) {
      if(pairIndices.has(i)){
        continue;
      }
      let max = -1;
      let count = 0;
      let pair = "";
      let indexToKeep = -1;
      // inner loop to compare preference to one currently in outer loop
      for(let j = 0; j < prefs.length; j++) {
        // if overlapping from outer loop, or already in a pair, skip
        if(i === j || pairIndices.has(j)){
          continue;
        } else {
          // compare how many answers match for this student
          // and the rest of the students
          for(let k = 0; k < prefs.at(i)['answers'].length; k++){
            if(count > max){
              pair = prefs.at(j)['studentName'];
              indexToKeep = j;
              if(prefs.at(i)['answers'].at(k) === prefs.at(j)['answers'].at(k)) {
                count++;
                max = count;
              }
            }
          }
        }
        // reset count
        count = 0;
      }
      // for the case that there's an odd number of students
      if(pair === ""){
        pairings.push('On their own: ' + prefs.at(i)['studentName']);
        pairIndices.add(i);
        continue;
      }
      // add current student and their pair to set, to avoid considering them again
      pairIndices.add(i);
      pairIndices.add(indexToKeep);
      pairings.push(prefs.at(i)['studentName'] + ' and ' + pair);
      // reset the pairing for the next student
      pair = '';
    }

    return pairings;
}