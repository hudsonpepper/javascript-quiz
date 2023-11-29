console.log(window);
var newGameEl = document.querySelector("#new-game");
var resetEl = document.querySelector("#reset");

var recentScore = localStorage.getItem("Most-Recent");
console.log(recentScore);
var scoreHistory = localStorage.getItem("Score-History");

if(!scoreHistory) {
  scoreHistory = {
    perfectArray: [],
    imperfectArray: []
  }
};





newGameEl.addEventListener("click", function() {
  console.log("Click new game");
  document.location.href="../index.html"
});

resetEl.addEventListener("click", function(event) {
  let element = event.target;
  console.log("Click reset scores");
  scoreHistory.perfectArray = [];
  scoreHistory.imperfectArray = [];
  localStorage.setItem("Score-History", "[[],[]]")
});
