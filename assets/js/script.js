var timerEl = document.getElementById('countdown');
var start = document.getElementById('start');
// var answer = document.getElementsByClassName('option_button');
var timeLeft = 80;
// var testQuestions = document.querySelector('.response_box');
// // testQuestions.style = document.getElementsByClassName('response_box');
// var theQuestion = document.getElementById('questionText');
// var buttonOne = document.getElementById('option_1');
// var buttonTwo = document.getElementById('option_2');
// var buttonThree = document.getElementById('option_3');
// var buttonFour = document.getElementById('option_4');
// var button = document.getElementsByClassName('option_button');
// var answerCheck = document.getElementById('iscorrect');
// var correctAnswer = buttonTwo;
// var wrongAnswer = buttonOne, buttonThree, buttonFour;
var questionEl = document.getElementById("question");
var answerEl = document.getElementById("answer-buttons");
var currentQuestionIndex = 0;
var score = timeLeft;
var testing = document.getElementById("theChoice");


function countdown() {
  var timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      timerEl.textContent = 'Time: ' + timeLeft;
      timeLeft--;
    } else {
      timerEl.textContent = 'Time is up!';
      clearInterval(timeInterval);
    }
  }, 1000);
}



start.addEventListener('click', function() {
  if(start) {
    countdown();
    start.style="display:none";
    currentQuestionIndex = 0;
    score = timeLeft;
    showQuestion();
  }
})


var questions = [
  {
    question: "What does the DOM stand for?",
    answers: [
      {text: 'Directive Override Mission', correct: false},
      {text: 'Document Object Model', correct: true},
      {text: 'Discovery Objective Model', correct: false},
      {text: 'Dismount Obstacles Mission', correct: false},
    ]
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      {text: 'script', correct: true},
      {text: 'link', correct: false},
      {text: 'div', correct: false},
      {text: 'header', correct: false},
    ]
  },
 {
    question: "Where do you link the JavaScript in the HTML file?",
    answers: [
      {text: 'head', correct: false},
      {text: 'div', correct: false},
      {text: 'body', correct: true},
      {text: 'header', correct: false},
    ]
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: [
      {text: 'myFunction function()', correct: false},
      {text: 'function myFunction{}', correct: false},
      {text: 'function = myFunction()', correct: false},
      {text: 'function myFunction()', correct: true},
    ]
  }
]

function showQuestion(){
  console.log("Show Question");
  resetState();
  var currentQuestion = questions[currentQuestionIndex];
  var questionNo = currentQuestionIndex + 1;
  questionEl.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.setAttribute("id", "answer_choice")
    button.classList.add("btn_answer");
    answerEl.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
      testing.style="display:block";
    }
    button.addEventListener("click", selectAnswer);
    console.log(answer.text);
  });
}

function resetState(){
  console.log("Reset State")
  start.style.display = "none";
  while (answerEl.firstChild){
    answerEl.removeChild(answerEl.firstChild);
  } 
};

function selectAnswer(e){
  console.log("Select Answer");
  var selectedBtn = e.target;
  var isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    testing.textContent = "Correct";
    nextQuestion();
  } else {
    selectedBtn.classList.add("incorrect");
    testing.textContent = "Incorrect";
    timeLeft = timeLeft - 10;
    nextQuestion();
  }
  Array.from(answerEl.children).forEach(button => {
    if(button.dataset.correct === true){
      button.classList.add("correct");
    }
  
   
  })
}

function nextQuestion() {
  console.log("Next Question")
  if(currentQuestionIndex < questions.length - 1){
    currentQuestionIndex++;
    showQuestion();
  } else {
    submitScore();
  }
}

function submitScore() {
  console.log("You did it!");
 sessionStorage.setItem("score", timeLeft);
 sessionStorage.getItem("score");
 console.log(sessionStorage.getItem("score"));
 questionEl.style="display:none";
 answerEl.style="display:none";
 timeLeft = 0;
}




// "What does the DOM stand for?" 'Document Object Model',
// Inside which HTML element do we put the JavaScript? '<script>'
// Where is the correct place to insert a JavaScript? 'The <body> section
// How do you create a function in JavaScript? 'function myFunction()'