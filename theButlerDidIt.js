const numTrials = 1000000; // number of trials to run
const items = 10 // number of items that can be in different places
const numArr = [...Array(items).keys()].map(x => x + 1);

// generates random permutation of array
// * Durstefeld implemntation of Fisher-Yates Shuffle
function permuteArray(a_) {
  const a = a_.slice(0);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// run 1 trial
// return object with result and data of trial
function trial() {
  const trialData = permuteArray(numArr);
  let result = true;
  for(let i = 0; i < trialData.length; i++) {
    if(trialData[i] === numArr[i]) {result = false;}
  }
  return {'result': result, 'data': trialData};
}

// runs trials
const trials = [];
for(let i = 0; i < numTrials; i++) {
  trials.push(trial());
}

// * convert trial data to strings to print properly
if(numTrials <= 1000) {
  console.table(trials.map(x => x = {'result': x.result, 'data': x.data.toString()}));
}
console.log(`Success rate based on simulation: ${(trials.reduce((a,b) => b.result + a, 0) / trials.length * 100).toFixed(4)}%`);