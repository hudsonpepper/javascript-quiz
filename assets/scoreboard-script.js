var newGameEl = document.querySelector("#new-game");
var resetEl = document.querySelector("#reset");
var perfListEl = document.querySelector("#perfect");
var impListEl = document.querySelector("#imperfect");

newGameEl.addEventListener("click", function() {
  console.log("Click new game");
  document.location.href="./index.html"
});

resetEl.addEventListener("click", function(event) {
  let element = event.target;
  console.log("Click reset scores");
  localStorage.removeItem("Score-History");
  window.location.reload();
});

function insertScore() {
  if((!scoreHistory.perfectArray.includes(recentScore))&&(!scoreHistory.imperfectArray.includes(recentScore)))
  {
    if(recentScore.isPerfectScore){
      scoreHistory.perfectArray.push(recentScore);
    }
    else {
      scoreHistory.imperfectArray.push(recentScore);
    }
  }
  scoreHistory.perfectArray = scoreHistory.perfectArray.sort(function(a, b) {return b.finalTime - a.finalTime});
  scoreHistory.imperfectArray = scoreHistory.imperfectArray.sort(function(a, b) {return b.numCorrect - a.numCorrect})
  
  console.log(scoreHistory);
  localStorage.setItem("Score-History", JSON.stringify(scoreHistory));
}
  
function writeScoreboard() {
  scoreHistory.perfectArray.forEach( function(currentValue) {
    let node = document.createElement("li");
    node.textContent = currentValue.initials + ": " + currentValue.finalTime + " seconds remaining";
    perfListEl.appendChild(node);
  })
  scoreHistory.imperfectArray.forEach( function(currentValue) {
    let node = document.createElement("li");
    node.textContent = currentValue.initials + ": " + currentValue.numCorrect + " / " + currentValue.numQuestions;
    impListEl.appendChild(node);
  })
}
var scoreHistory = localStorage.getItem("Score-History");
if(scoreHistory === null) {
  scoreHistory = {
    perfectArray: [],
    imperfectArray: []
  }
  localStorage.setItem("Score-History", JSON.stringify(scoreHistory));
}
else {
  scoreHistory = JSON.parse(scoreHistory);
}

var recentScore = localStorage.getItem("Most-Recent");
if (!(recentScore === null)){
  recentScore = JSON.parse(recentScore);
  localStorage.removeItem("Most-Recent");
  insertScore();
}


writeScoreboard();