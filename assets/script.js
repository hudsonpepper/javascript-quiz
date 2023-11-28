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
var answers = [ans1El, ans2El, ans3El, ans4El];
// Variable Initializations
var questionNumber = 0;
let question1 = {
  question: "Q1: do robot cows dream of electric milk?",
  answer1: "sample answer 1: no...",
  answer2: "sample answer 2: yes!",
  answer3: "sample answer 3: this is a stupid question.",
  answer4: "sample answer 4: cows don't sleep",
  correctAnswer: 3,
  isQuestionAnswered: [false,false,false,false]
}
let question2= {
  question: "Q2: do robot cows dream of electric milk?",
  answer1: "sample answer 1: no...",
  answer2: "sample answer 2: yes!",
  answer3: "sample answer 3: this is a stupid question.",
  answer4: "sample answer 4: cows don't sleep",
  correctAnswer: 2,
  isQuestionAnswered: [false,false,false,false]
}
let question3 = {
  question: "Q3: do robot cows dream of electric milk?",
  answer1: "sample answer 1: no...",
  answer2: "sample answer 2: yes!",
  answer3: "sample answer 3: this is a stupid question.",
  answer4: "sample answer 4: cows don't sleep",
  correctAnswer: 3,
  isQuestionAnswered: [false,false,false,false]
}
let qArr = [question1, question2, question3];
var defaultTime = 60;
var secondsLeft = defaultTime;
var stopTimer = false;

// EventListener for "View HighScore"
highscoreEl.addEventListener("click", function(event) {
  let element = event.target;
  console.log("click");
  if (element.textContent == "View Highscores") {
    quizEl.classList.add("hidden");
    scoreboardEl.classList.remove("hidden");
    element.textContent = "Start New Game";
    stopTimer =true;
    timeEl.textContent = "Default Time: " + defaultTime;
  }
  else if(element.textContent == "Start New Game") {
    element.textContent = "View Highscores";
    timeEl.textContent = "Time: " + defaultTime;
    startQuiz();
  }
})
// EventListener for Answering a question
quizEl.addEventListener("click", function(event) {
  let element = event.target;
  if (element.classList.contains("card")) {
    answerChoice = element.getAttribute("data-number");
    console.log("Before: ", qArr[questionNumber].isQuestionAnswered);
    if(!qArr[questionNumber].isQuestionAnswered[answerChoice -1]){
      qArr[questionNumber].isQuestionAnswered[answerChoice -1] = true;
      console.log("After: ", qArr[questionNumber].isQuestionAnswered);
      if (answerChoice == qArr[questionNumber].correctAnswer) {
        console.log("You got it Correct!");
        element.classList.add("correct");
        element.classList.remove("notClicked");
      }
      else {
        console.log("You got it wrong");
        secondsLeft-=5;
        timeEl.textContent = "Time: "+ secondsLeft;
        element.classList.add("incorrect");
        element.classList.remove("notClicked");
      }
    };
  }
})

//EventListener for the prev and next buttons
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
    if(secondsLeft <= 0 || stopTimer) {
      secondsLeft = 0;
      clearInterval(timerInterval);
      timeEl.setAttribute("style", "color: red;");
      endQuiz();
    }

  }, 1000);
}
setTime(true)
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
  for (let i = 0; i < answers.length; i++) {
    if (qArray[num].isQuestionAnswered[i] == false) {
    answers[i].classList.remove("correct");
    answers[i].classList.remove("incorrect");
    answers[i].classList.add("notClicked");
    }
    else {
      if (i == qArray[num].correctAnswer - 1) {
        answers[i].classList.add("correct");
        answers[i].classList.remove("incorrect");
        answers[i].classList.remove("notClicked");
      }
      else {
        answers[i].classList.remove("correct");
        answers[i].classList.add("incorrect");
        answers[i].classList.remove("notClicked");
      }

    }
  }
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
  secondsLeft = defaultTime;
  questionNumber = 0;
  quizEl.classList.remove("hidden");
  scoreboardEl.classList.add("hidden");
  for(let i = 0; i < qArr.length; i++) {
    qArr[i].isQuestionAnswered = [false, false, false, false];
  }
  loadQuestion(0,qArr);
}
loadQuestion(0,qArr);