// Add relavent HTML IDs as JS variables
var timeEl = document.querySelector("#timer");
var highscoreEl = document.querySelector("#highscores");
var welcomeEl = document.querySelector("#pageLoad");
var defaultEl = document.querySelector("#defaultTime");
var deductionEl = document.querySelector("#deductionTime")
var startEl = document.querySelector("#startQuiz");
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
var scoreEl = document.querySelector("#score");
var initialsEl = document.querySelector("#initials");
var confirmEl = document.querySelector("#confirm");

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
  isQuestionAnswered: [false,false,false,false],
  isGuessedCorrect: function () {
    return this.isQuestionAnswered[this.correctAnswer-1];
  }
}
let question2= {
  question: "Q2: do robot cows dream of electric milk?",
  answer1: "sample answer 1: no...",
  answer2: "sample answer 2: yes!",
  answer3: "sample answer 3: this is a stupid question.",
  answer4: "sample answer 4: cows don't sleep",
  correctAnswer: 2,
  isQuestionAnswered: [false,false,false,false],
  isGuessedCorrect: function () {
    return this.isQuestionAnswered[this.correctAnswer-1];
  }
}
let question3 = {
  question: "Q3: do robot cows dream of electric milk?",
  answer1: "sample answer 1: no...",
  answer2: "sample answer 2: yes!",
  answer3: "sample answer 3: this is a stupid question.",
  answer4: "sample answer 4: cows don't sleep",
  correctAnswer: 3,
  isQuestionAnswered: [false,false,false,false],
  isGuessedCorrect: function () {
    return this.isQuestionAnswered[this.correctAnswer-1];
  }
}
let qArr = [question1, question2, question3];
var defaultTime = 60;
var secondsDeducted = 5;
var secondsLeft = defaultTime;
var quizDone = false;
var numCorrect = 0;

// EventListener for "View HighScore"
highscoreEl.addEventListener("click", function(event) {
  document.location.href="./scoreboard.html"
})

confirmEl.addEventListener("click", function(event) {
  event.preventDefault();
  let initial = initialsEl.value;
  localStorage.setItem("testing", initial)
  document.location.href="./scoreboard.html"
})

defaultEl.textContent = defaultTime;
deductionEl.textContent = secondsDeducted;
startEl.addEventListener("click", startQuiz)

// EventListener for Answering a question
quizEl.addEventListener("click", function(event) {
  let element = event.target;
  if (element.classList.contains("card") && !quizDone) {
    var answerChoice = element.getAttribute("data-number");
    if(!qArr[questionNumber].isQuestionAnswered[answerChoice -1]){
      qArr[questionNumber].isQuestionAnswered[answerChoice -1] = true;
      if (answerChoice == qArr[questionNumber].correctAnswer) {
        console.log("You got it Correct!");
        numCorrect++;
        respEl.textContent = "Correct! You have found " + numCorrect + " / " + qArr.length + " correct answers.";
        if(numCorrect == qArr.length) {
          quizDone = true;
        }
        element.classList.add("correct");
        element.classList.remove("isValid");
        for(let i = 0; i < answers.length; i++) {
          if ((!answers[i].classList.contains("correct")) && (!answers[i].classList.contains("incorrect")) ) {
            answers[i].classList.add("disabled");
            answers[i].classList.remove("isValid");
          }
        }
        if (questionNumber != qArr.length -1) {
          questionNumber++;
          loadQuestion(questionNumber,qArr)
        }
      }
      else if (!element.classList.contains("disabled")) {
        console.log("You got it wrong");
        respEl.textContent = "You got it wrong. Deducting 5 seconds from remaining time."
        secondsLeft-=secondsDeducted;
        timeEl.textContent = "Time: "+ secondsLeft;
        element.classList.add("incorrect");
        element.classList.remove("isValid");
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
    if(!quizDone){
    secondsLeft--;
    timeEl.textContent = "Time: "+ secondsLeft;
    }
    if(secondsLeft <= 0 || quizDone) {
      timeEl.textContent = "Time: " + secondsLeft;
      quizDone = true;
      loadQuestion(questionNumber, qArr)
      secondsLeft = 0;
      clearInterval(timerInterval);
      endQuiz();
    }

  }, 100);
}
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
    console.log(i, "Has question been answered", (!qArray[num].isQuestionAnswered[i]))
    console.log(i ,"Has correct answer been found", (!qArray[num].isGuessedCorrect()))
    console.log(quizDone, "is the quiz done?")
    if ((!qArray[num].isQuestionAnswered[i]) && (!qArray[num].isGuessedCorrect()) && (!quizDone)) {
    answers[i].classList.remove("correct");
    answers[i].classList.remove("incorrect");
    answers[i].classList.remove("disabled");
    answers[i].classList.add("isValid");
    }
    else if (qArray[num].isQuestionAnswered[i]){
      if (i == qArray[num].correctAnswer - 1) {
        answers[i].classList.add("correct");
        answers[i].classList.remove("incorrect");
        answers[i].classList.remove("disabled");
        answers[i].classList.remove("isValid");
      }
      else {
        answers[i].classList.remove("correct");
        answers[i].classList.add("incorrect");
        answers[i].classList.remove("disabled");
        answers[i].classList.remove("isValid");
      }
    }
    else {
      answers[i].classList.remove("correct");
      answers[i].classList.remove("incorrect");
      answers[i].classList.add("disabled");
      answers[i].classList.remove("isValid");
    }
  }
  let portionMessage = (questionNumber + 1) + " / " + qArr.length;
  portionEl.textContent = portionMessage;
}

function endQuiz() {
  //ToDo: turn the quiz to the highscore section
  //Todo: store the current score
  //respEl.textContent = "Quiz is over"
  scoreboardEl.classList.remove("hidden");
  //document.location.href="./scoreboard.html"
}

function startQuiz() {
  
  secondsLeft = defaultTime;
  questionNumber = 0;
  welcomeEl.classList.add("hidden");
  quizEl.classList.remove("hidden");
  scoreboardEl.classList.add("hidden");
  for(let i = 0; i < qArr.length; i++) {
    qArr[i].isQuestionAnswered = [false, false, false, false];
  }
  loadQuestion(0,qArr)
  quizDone = false;
  numCorrect = 0;
  setTime();
}
//startQuiz();
//loadQuestion(0,qArr);