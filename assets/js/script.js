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
let qArr = [
  {
    question: "Which is a correct for-loop in JavaScript?",
    answer1: "for(i = 0, i < 10, i++) {console.log(i);}",
    answer2: "for(let i = 10; i > 0; i--) {console.log(i);}",
    answer3: "for i in range(10): print(i)",
    answer4: "for[let i = 0; i < 10; i++] {console.log(i);}",
    correctAnswer: 2,
    isQuestionAnswered: [false,false,false,false],
    isGuessedCorrect: function () {
      return this.isQuestionAnswered[this.correctAnswer-1];
    }
  },
  {
    question: "What is NOT a JavaScript primative type?",
    answer1: "string",
    answer2: "number",
    answer3: "array",
    answer4: "object",
    correctAnswer: 4,
    isQuestionAnswered: [false,false,false,false],
    isGuessedCorrect: function () {
      return this.isQuestionAnswered[this.correctAnswer-1];
    }
  },
  {
    question: "How do you print 'Hello World' in JavaScript?",
    answer1: "cout << 'Hello World';",
    answer2: "print('Hello World')",
    answer3: "console.log('Hello World');",
    answer4: "system.out.print('Hello World');",
    correctAnswer: 3,
    isQuestionAnswered: [false,false,false,false],
    isGuessedCorrect: function () {
      return this.isQuestionAnswered[this.correctAnswer-1];
    }
  },
  {
    question: "Which is correctly defining a JavaScript object: ",
    answer1: "var carObj = {wheels: 4, make: 'Honda', model: 'CRV'};",
    answer2: "var carObj : {wheels: 4; make: 'Honda'; model: 'CRV'};",
    answer3: "var carObj = [wheels: 4, make: 'Honda', model: 'CRV'];",
    answer4: "var carObj : [wheels = 4, make = 'Honda', model = 'CRV'];",
    correctAnswer: 1,
    isQuestionAnswered: [false,false,false,false],
    isGuessedCorrect: function () {
      return this.isQuestionAnswered[this.correctAnswer-1];
    }
  },
  {
    question: "How do you find the length of an array in JavaScript?",
    answer1: "testArr.length();",
    answer2: "testArr.length;",
    answer3: "Array.length(testArr);",
    answer4: "length(testArr);",
    correctAnswer: 2,
    isQuestionAnswered: [false,false,false,false],
    isGuessedCorrect: function () {
      return this.isQuestionAnswered[this.correctAnswer-1];
    }
  },
  {
    question: "Which will set 'testStorage' as a key inside local storage memory?",
    answer1: "localMemory.setItem('testStorage': 'hello');",
    answer2: "localStorage.setItem('testStorage': 'hello');",
    answer3: "localStorage.setItem('testStorage');",
    answer4: "localStorage.setItem('3': 'testStorage');",
    correctAnswer: 2,
    isQuestionAnswered: [false,false,false,false],
    isGuessedCorrect: function () {
      return this.isQuestionAnswered[this.correctAnswer-1];
    }
  },
  {
    question: "How would I call the method 'funFact' from the object 'planetObj'?",
    answer1: "planetObj.funFact;",
    answer2: "planetObj:funFact();",
    answer3: "funFact(planetObj);",
    answer4: "planetObj.funFact();",
    correctAnswer: 4,
    isQuestionAnswered: [false,false,false,false],
    isGuessedCorrect: function () {
      return this.isQuestionAnswered[this.correctAnswer-1];
    }
  }
];
var defaultTime = 60;
var secondsDeducted = 5;
var secondsLeft = defaultTime;
var quizDone = false;
var quizResults = {
  initials: "",
  numCorrect: 0,
  numQuestions: qArr.length,
  finalTime: 0,
  isPerfectScore: false
};
var numCorrect = 0;

// EventListener for "View HighScore"
highscoreEl.addEventListener("click", function(event) {
  document.location.href="scoreboard.html"
  "./scoreboard.html"
})

// EventListener for the Submit button for initials
confirmEl.addEventListener("click", function(event) {
  event.preventDefault();
  quizResults.initials = initialsEl.value;
  if(quizResults.initials == "") {
    document.querySelector("#alert").classList.remove("hidden");
  }
  else{
  console.log("quizResults final: ", quizResults);
  localStorage.setItem("Most-Recent", JSON.stringify(quizResults));
  document.location.href="./scoreboard.html"
  }
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
        quizResults.numCorrect++;
        respEl.textContent = "Correct! You have found " + quizResults.numCorrect + " / " + qArr.length + " correct answers.";
        if(quizResults.numCorrect == qArr.length) {
          quizDone = true;
          quizResults.isPerfectScore = true;
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

//Adds Timer Functionality
function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    if(!quizDone){
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft;

    }
    if(secondsLeft <= 0 || quizDone) {
      if(secondsLeft < 0) {
        secondsLeft = 0;
      }
      quizResults.finalTime = secondsLeft;
      console.log("ending quiz: ", quizResults);
      timeEl.textContent = "Time: " + quizResults.finalTime;
      quizDone = true;
      loadQuestion(questionNumber, qArr)
      clearInterval(timerInterval);
      endQuiz();
    }

  }, 1000);
}

// function to deal with loadingQuestion Data
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
  questionEl.textContent = "Q"+(questionNumber+1)+": " + qArray[num].question;
  ans1El.textContent = qArray[num].answer1;
  ans2El.textContent = qArray[num].answer2;
  ans3El.textContent = qArray[num].answer3;
  ans4El.textContent = qArray[num].answer4;
  for (let i = 0; i < answers.length; i++) {
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

// function to do end of quiz 
function endQuiz() {
  if(quizResults.isPerfectScore) {
    scoreEl.textContent = "You got a perfect score with " + quizResults.finalTime + " seconds remaining"
  }
  else {
    scoreEl.textContent = "You were only able to find " + quizResults.numCorrect + " / " + quizResults.numQuestions + " correct answers before time ran out."
  }
  scoreboardEl.classList.remove("hidden");
}


//function to 
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