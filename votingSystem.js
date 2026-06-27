// 1. Initialize poll as a Map
const poll = new Map();

// 2. addOption function
function addOption(option) {
  if (!option || option.trim() === "") {
    return "Option cannot be empty.";
  }
  if (poll.has(option)) {
    return `Option "${option}" already exists.`;
  }
  // 7. Map option to a Set
  poll.set(option, new Set());
  return `Option "${option}" added to the poll.`;
}

// 3. vote function
function vote(option, voterId) {
  if (!poll.has(option)) {
    return `Option "${option}" does not exist.`;
  }
  
  const voters = poll.get(option);
  
  if (voters.has(voterId)) {
    return `Voter ${voterId} has already voted for "${option}".`;
  }
  
  // 12. Add voterId to the Set
  voters.add(voterId);
  return `Voter ${voterId} voted for "${option}".`;
}

// 4. displayResults function
function displayResults() {
  let resultString = "Poll Results:";
  
  for (let [option, voters] of poll) {
    resultString += `\n${option}: ${voters.size} votes`;
  }
  
  return resultString;
}

// Setup requirements: 5. At least three options, 6. At least three votes
addOption("Turkey");
addOption("Morocco");
addOption("Spain");

vote("Turkey", "voter1");
vote("Turkey", "voter2");
vote("Morocco", "voter3");
