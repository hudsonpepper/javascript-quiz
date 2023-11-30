  // Question Array
  // Note: Because it is imported first, this variable is available to the main script
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