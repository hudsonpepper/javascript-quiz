// Add relavent HTML IDs as JS variables
var timeEl = document.querySelector("#timer");
var highscoreEl = document.querySelector("#highscores");
var quizEl = document.querySelector("#quiz");
var questionEl = document.querySelector("#question");
var quizNavEl = document.querySelector("#question-navigation")
var prevEl = document.querySelector("#previous");
var nextEl = document.querySelector("#next");
var portionEl = document.querySelector("#portion-done");
var ans1El = document.querySelector("#answer1");
var ans2El = document.querySelector("#answer2");
var ans3El = document.querySelector("#answer3");
var ans4El = document.querySelector("#answer4");
var respEl = document.querySelector("#response");
var scoreboardEl = document.querySelector("#scoreboard");

// Variable Initializations
var questionNumber = 0;
let question1 = {
  question: "Q1: do robot cows dream of electric milk?",
  answer1: "sample answer 1: no...",
  answer2: "sample answer 2: yes!",
  answer3: "sample answer 3: this is a stupid question.",
  answer4: "sample answer 4: cows don't sleep",
  correctAnswer: 3
}
let question2= {
  question: "Q2: do robot cows dream of electric milk?",
  answer1: "sample answer 1: no...",
  answer2: "sample answer 2: yes!",
  answer3: "sample answer 3: this is a stupid question.",
  answer4: "sample answer 4: cows don't sleep",
  correctAnswer: 2
}
let question3 = {
  question: "Q3: do robot cows dream of electric milk?",
  answer1: "sample answer 1: no...",
  answer2: "sample answer 2: yes!",
  answer3: "sample answer 3: this is a stupid question.",
  answer4: "sample answer 4: cows don't sleep",
  correctAnswer: 3
}
let qArr = [question1, question2, question3];
var secondsLeft = 60;


quizEl.addEventListener("click", function(event) {
  let element = event.target;
  if (element.classList.contains("card")) {
    console.log("click"); 
    answerChoice = element.getAttribute("data-number")
    console.log("You clicked on answer #" + answerChoice);
    console.log("Correct answer: ", qArr[questionNumber].correctAnswer);
    if (answerChoice == qArr[questionNumber].correctAnswer) {
      console.log("You got it Correct!");
    }
    else {
      console.log("You got it wrong");
    }
  };

})
quizNavEl.addEventListener("click", function(event) {
  event.stopPropagation();
  let element = event.target;
  if (element.classList.contains("card")) {
    questionNumber += Number(element.getAttribute("data-number"));
    loadQuestion(questionNumber,qArr);
  }


})





timeEl.textContent = "Time: " + secondsLeft;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = "Time: "+ secondsLeft;
    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      timeEl.setAttribute("style", "color: red;");
      endQuiz();
    }

  }, 100);
}
//setTime()
function loadQuestion(num, qArray) {
  if (num == 0) {
    prevEl.classList.add("hidden");
    nextEl.classList.remove("hidden");
  }
  else if (num == qArray.length - 1) {
    nextEl.classList.add("hidden");
    prevEl.classList.remove("hidden");
  }
  else {
    prevEl.classList.remove("hidden");
    nextEl.classList.remove("hidden");
  }
  questionEl.textContent = qArray[num].question;
  ans1El.textContent = qArray[num].answer1;
  ans2El.textContent = qArray[num].answer2;
  ans3El.textContent = qArray[num].answer3;
  ans4El.textContent = qArray[num].answer4;
  let portionMessage = (questionNumber + 1) + " / " + qArr.length;
  portionEl.textContent = portionMessage;
}
function endQuiz() {
  //ToDo: turn the quiz to the highscore section
  //Todo: store the current score
  quizEl.classList.toggle("hidden");
  scoreboardEl.classList.toggle("hidden");
}
function startQuiz() {
  secondsLeft = 60;
  questionNumber = 1;
  quizEl.classList.toggle("hidden");
  //scoreboardEl.classList.toggle("hidden");
  loadQuestion(0,qArr);
}
loadQuestion(0,qArr);