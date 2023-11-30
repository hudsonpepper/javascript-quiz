// Nav Bar ID Tags
var newGameEl = document.querySelector("#new-game");
var resetEl = document.querySelector("#reset");

// Ordered List ID Tags
var perfListEl = document.querySelector("#perfect");
var impListEl = document.querySelector("#imperfect");

// New Game Event Listener: Takes you to index.html
newGameEl.addEventListener("click", function() {
  document.location.href="./index.html"
});

// Reset Scores Event Listener: Resets Scores and Reloads Page
resetEl.addEventListener("click", function(event) {
  localStorage.removeItem("Score-History");
  window.location.reload();
});

// Function to Insert the Most Recent Score into relevant score array
function insertScore() {
  // IF: Check to Make sure Score History doesn't already have it loaded in
  if((!scoreHistory.perfectArray.includes(recentScore))&&(!scoreHistory.imperfectArray.includes(recentScore)))
  {
    // Checks Which array to push the new Score to:
    if(recentScore.isPerfectScore){
      scoreHistory.perfectArray.push(recentScore);
    }
    else {
      scoreHistory.imperfectArray.push(recentScore);
    }
  }
  // Sorts the Arrays by relevant stats to ensure proper order once written onto scoreboard
  scoreHistory.perfectArray = scoreHistory.perfectArray.sort(function(a, b) {return b.finalTime - a.finalTime});
  scoreHistory.imperfectArray = scoreHistory.imperfectArray.sort(function(a, b) {return b.numCorrect - a.numCorrect})
  // Reinitializing localStorage Score-History so it contains new score
  localStorage.setItem("Score-History", JSON.stringify(scoreHistory));
}
  
// Function to Generate proper scoreboard
function writeScoreboard() {
  // Writes Message for each element inside perfectArray
  scoreHistory.perfectArray.forEach( function(currentValue) {
    // Makes li element for each score, and appends it to ol
    let node = document.createElement("li");
    node.textContent = currentValue.initials + ": " + currentValue.finalTime + " seconds remaining";
    if(currentValue == recentScore) {
      // Highlights Last Score in Red to make it easily visible. 
      node.style.color = "#d9534f";
    }
    perfListEl.appendChild(node);
  })

  // Writes Message for each element inside imperfectArray
  scoreHistory.imperfectArray.forEach( function(currentValue) {
    // Makes li element for each score, and appends it to ol
    let node = document.createElement("li");
    node.textContent = currentValue.initials + ": " + currentValue.numCorrect + " / " + currentValue.numQuestions;
    if(currentValue == recentScore) {
      // Highlights Last Score in Red to make it easily visible. 
      node.style.color = "#d9534f";
    }
    impListEl.appendChild(node);
  })
}

// Gets scoreHistory from Local Memory
var scoreHistory = localStorage.getItem("Score-History");
// If it doesn't exist: make proper scoreHistory object
if(scoreHistory === null) {
  scoreHistory = {
    perfectArray: [],
    imperfectArray: []
  }
  // Initialize scoreHistory in local memory
  localStorage.setItem("Score-History", JSON.stringify(scoreHistory));
}
// Format scoreHistory from local memory to proper object form
else {
  scoreHistory = JSON.parse(scoreHistory);
}

// Gets recent Score if it exists
var recentScore = localStorage.getItem("Most-Recent");
if (!(recentScore === null)){
  // If it does exist: stores it as a variable, deletes localStorage, and inserts it into scoreHistory
  recentScore = JSON.parse(recentScore);
  localStorage.removeItem("Most-Recent");
  insertScore();
}

// Calls writeScoreboard function to populate ordered list.
writeScoreboard();