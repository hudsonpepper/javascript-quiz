// Add relavent HTML IDs as JS variables
  // Nav Bar IDs
var timeEl = document.querySelector("#timer");
var highscoreEl = document.querySelector("#highscores");
  // 'Start Quiz' IDs
var welcomeEl = document.querySelector("#pageLoad");
var defaultEl = document.querySelector("#defaultTime");
var deductionEl = document.querySelector("#deductionTime")
var startEl = document.querySelector("#startQuiz");
  // Quiz IDs
var quizEl = document.querySelector("#quiz");
    // Quiz Nav IDs
var quizNavEl = document.querySelector("#question-navigation")
var prevEl = document.querySelector("#previous");
var nextEl = document.querySelector("#next");
var portionEl = document.querySelector("#portion-done");
    // Question IDs
var questionEl = document.querySelector("#question");
var ans1El = document.querySelector("#answer1");
var ans2El = document.querySelector("#answer2");
var ans3El = document.querySelector("#answer3");
var ans4El = document.querySelector("#answer4");
var respEl = document.querySelector("#response");
      // Answer IDs in Array Format
var answers = [ans1El, ans2El, ans3El, ans4El];
    // 'Quiz-Done' IDs
var scoreboardEl = document.querySelector("#scoreboard");
var scoreEl = document.querySelector("#score");
var initialsEl = document.querySelector("#initials");
var confirmEl = document.querySelector("#confirm");

// Variable Initializations
var questionNumber = 0;
var defaultTime = 60;
var secondsDeducted = 5;
var secondsLeft = defaultTime;
var quizDone = false;

  // Results Obj: will be stored in Local Memory
var quizResults = {
  initials: "",
  numCorrect: 0,
  numQuestions: qArr.length,
  finalTime: 0,
  isPerfectScore: false
};

// JS Formatting for PageLoad
defaultEl.textContent = defaultTime;
deductionEl.textContent = secondsDeducted;
// Display seconds left on the time box at the top
timeEl.textContent = "Time: " + secondsLeft;

// Event Listener to start the quiz
startEl.addEventListener("click", startQuiz);

// EventListener for "View HighScore"
highscoreEl.addEventListener("click", function(event) {
  document.location.href="./scoreboard.html";
})

// EventListener for the Submit button for "Enter initials"
confirmEl.addEventListener("click", function(event) {
  event.preventDefault();
  quizResults.initials = initialsEl.value;
  // Alert Popup for if they submit before entering initials
  if(quizResults.initials == "") {
    document.querySelector("#alert").classList.remove("hidden");
  }
  // Stores quizResults in localStorage and changes page to scoreboard.html
  else{
  localStorage.setItem("Most-Recent", JSON.stringify(quizResults));
  document.location.href="./scoreboard.html";
  }
})

// EventListener for Answering a question
quizEl.addEventListener("click", function(event) {
  let element = event.target;
  // Ensures both that they clicked on a card, and the quiz is still going
  if (element.classList.contains("card") && !quizDone) {
    var answerChoice = element.getAttribute("data-number");
    // If the question has not yet been clicked, then log that it has
    if(!qArr[questionNumber].isQuestionAnswered[answerChoice -1]){
      qArr[questionNumber].isQuestionAnswered[answerChoice -1] = true;
      // If answer is correct, add appropriate text, color, class
      if (answerChoice == qArr[questionNumber].correctAnswer) {
        quizResults.numCorrect++;
        respEl.textContent = "✅Correct! You have found " + quizResults.numCorrect + " / " + qArr.length + " correct answers.";
        // Checks if this all questions have been answered correctly
        if(quizResults.numCorrect == qArr.length) {
          // if so, then end the quiz and note that they got a perfect score
          quizDone = true;
          quizResults.isPerfectScore = true;
        }
        element.classList.add("correct");
        element.classList.remove("isValid");
        // Disable all other answers for this question.
        for(let i = 0; i < answers.length; i++) {
          if ((!answers[i].classList.contains("correct")) && (!answers[i].classList.contains("incorrect")) ) {
            answers[i].classList.add("disabled");
            answers[i].classList.remove("isValid");
          }
        }
        // Go to the next question if not the last question
        if (questionNumber != qArr.length -1) {
          questionNumber++;
          loadQuestion(questionNumber,qArr)
        }
      }
      // Else, if they got it wrong, change message, time, and class to reflect it.
      else if (!element.classList.contains("disabled")) {
        respEl.textContent = "❌You got it wrong. Deducting 5 seconds from remaining time."
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
  // Takes in the data-number from the next and prev buttons and iterates or decrements question number accordingly.
  if (element.classList.contains("card")) {
    questionNumber += Number(element.getAttribute("data-number"));
    loadQuestion(questionNumber,qArr);
  }
})


//function to start the quiz
function startQuiz() {
  // Initialize Time and Question Number
  secondsLeft = defaultTime;
  questionNumber = 0;
  // Display Quiz
  welcomeEl.classList.add("hidden");
  quizEl.classList.remove("hidden");
  scoreboardEl.classList.add("hidden");
  // Reset Question History
  for(let i = 0; i < qArr.length; i++) {
    qArr[i].isQuestionAnswered = [false, false, false, false];
  }
  // Shuffle Question Order
  qArr = shuffleArray(qArr);
  // Load first Question
  loadQuestion(0,qArr)
  quizDone = false;
  // Start Timer
  setTime();
}

//Function to shuffle question order for each quiz
function shuffleArray(arr) {
  // Fisher Yates Shuffle:  Source = https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  for (let i = arr.length - 1; i >= 0; i--) {
    randomIndex = Math.floor(Math.random() * i);
    source_elem = arr[i];
    target_elem = arr[randomIndex];
    arr[i] = target_elem;
    arr[randomIndex] = source_elem;
  }
  return arr;
}

//Adds Timer Functionality
function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    // Assuming the quiz is not yet done: reduce time, change time display
    if(!quizDone){
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft;
    }
    // If quiz is done or time has run out, end the quiz, reload questions to reflect it, store final time, and clear the time interval
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
function loadQuestion(num,qArray) {
  // Logic as to if prev and next buttons should display given question number
  if(num==0) {
    prevEl.classList.add("hidden");
    nextEl.classList.remove("hidden");
  }
  else if(num==qArray.length-1) {
    nextEl.classList.add("hidden");
    prevEl.classList.remove("hidden");
  }
  else {
    prevEl.classList.remove("hidden");
    nextEl.classList.remove("hidden");
  }
  // Logic to display correct question
  questionEl.textContent="Q"+(questionNumber+1)+": "+qArray[num].question;
  ans1El.textContent=qArray[num].answer1;
  ans2El.textContent=qArray[num].answer2;
  ans3El.textContent=qArray[num].answer3;
  ans4El.textContent=qArray[num].answer4;
  // Logic for correct card class formatting given question and answer history and if quiz is ongoing
  for(let i=0;i<answers.length;i++) {
    // Default Behavior
    if((!qArray[num].isQuestionAnswered[i])&&(!qArray[num].isGuessedCorrect())&&(!quizDone)) {
      modifyAnswerStyles("isValid",i);
    }
    else if(qArray[num].isQuestionAnswered[i]) {
      // Answer Correct Behavior
      if(i==qArray[num].correctAnswer-1) {
        modifyAnswerStyles("correct",i);
      }
      // Wrong Answer Behavior
      else {
        modifyAnswerStyles("incorrect",i);
      }
    }
    // Can no longer Answer Behavior
    else {
      modifyAnswerStyles("disabled",i);
    }
  }
  // Display "question number" / "total questions" between question nav buttons
  let portionMessage=(questionNumber+1)+" / "+qArr.length;
  portionEl.textContent=portionMessage;
}

// Function which handles relevant class changes based on answer history and 'isCorrect' behavior
function modifyAnswerStyles(answerState,i) {
  if(answerState==="isValid") {
    answers[i].classList.add("isValid");
    answers[i].classList.remove("correct","incorrect","disabled");

  } else if(answerState==="correct") {
    answers[i].classList.add("correct");
    answers[i].classList.remove("incorrect","disabled","isValid");

  } else if(answerState==="incorrect") {
    answers[i].classList.add("incorrect");
    answers[i].classList.remove("correct","disabled","isValid");

  } else {
    answers[i].classList.add("disabled");
    answers[i].classList.remove("correct","incorrect","isValid");

  }
}

// Function which handles endQuiz behavior
function endQuiz() {
  // Perfect Score Message
  if(quizResults.isPerfectScore) {
    scoreEl.textContent = "You got a perfect score with " + quizResults.finalTime + " seconds remaining"
  }
  // Imperfect Score Message
  else {
    scoreEl.textContent = "You were only able to find " + quizResults.numCorrect + " / " + quizResults.numQuestions + " correct answers before time ran out."
  }
  // Show initial form 
  scoreboardEl.classList.remove("hidden");
}