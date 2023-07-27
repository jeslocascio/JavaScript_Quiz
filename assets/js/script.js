// Variables for countdown and timer
var timerEl = document.getElementById('countdown');
var timeLeft = 80;

// Variables for running and quiz, and its elements
var start = document.getElementById('start');
var questionEl = document.getElementById("question");
var answerEl = document.getElementById("answer-buttons");
var currentQuestionIndex = 0;
var testing = document.getElementById("theChoice");
var restart = document.getElementById("restart");

// Variables dealing with the score page
var score = timeLeft;
var submission = document.getElementById("submit-area");
var submitButton = document.getElementById("sendInitials");
var userInitials = document.getElementById("userName");
var scoreList = document.getElementById("highScore");
var scorePage = document.getElementById("hsPage");
var initialText = document.getElementById("syi");
var theScoreboard = document.getElementById("scoreboard");
var done = document.getElementById("youDidIt");

// Hides the score page when you open the website
scorePage.style="display:none";

// Function to handle the countdown timer
function countdown() {
  var timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      timerEl.textContent = 'Time: ' + timeLeft;
      timeLeft--;
    } else if (timeLeft === 0) {
      timerEl.textContent = 'Time is up!';
      clearInterval(timeInterval);
      submitScore();
    } else {
      timerEl.textContent = 'Time is up!';
      clearInterval(timeInterval);
    }
  }, 1000);
}

// Determines what happens after clicking "Start"
start.addEventListener('click', function() {
  if(start) {
    timeLeft = 80;
    countdown();
    start.style="display:none";
    theScoreboard.classList.add("hide");
    currentQuestionIndex === 0;
    score = timeLeft;
    scoreList.innerHTML = "";
    showQuestion();
  }
})

// Function for showing you the question and choice options for the quiz
function showQuestion() {
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
    // An if statement that sets the correct answer
    if (answer.correct) {
      button.dataset.correct = answer.correct;
      testing.style = "display:block";
    }
    button.addEventListener("click", selectAnswer);
    console.log(answer.text);
  });
}

// Function to reset the state of the page every time you hit "Start"
function resetState(){
  console.log("Reset State")
  start.style.display = "none";
  questionEl.classList.remove("hide");
  answerEl.classList.remove("hide");
  while (answerEl.firstChild){
    answerEl.removeChild(answerEl.firstChild);
  } 
};

// Function to how you if you selected a correct or incorrect answer
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
    // If you are wrong, it takes 10 seconds off the timer
    timeLeft = timeLeft - 10;
    nextQuestion();
  }
  Array.from(answerEl.children).forEach(button => {
    if(button.dataset.correct === true){
      button.classList.add("correct");
    }
  
   
  })
}

// Function to take you to the next question, or the submission page.
function nextQuestion() {
  console.log("Next Question")
  if(currentQuestionIndex < questions.length - 1){
    currentQuestionIndex++;
    showQuestion();
  } else {
    submitScore();
  }
}

// Function to end the quiz and, tells you the score, and lets you submit your results
function submitScore() {
  console.log("You did it!");
 localStorage.setItem("score", timeLeft);
localStorage.getItem("score");
 console.log(sessionStorage.getItem("score"));
 questionEl.textContent ="You finished the quiz with " + localStorage.getItem("score") + " seconds left!";
 answerEl.style="display:none";
 testing.style="display:none";
 submission.classList.remove("hide");
 timeLeft = -1;
 timerEl.textContent = 'Time is up!';
 currentQuestionIndex = 0; 
}

// Determines what happens after you click the "Submit" button
submitButton.addEventListener('click', function() {
  RecordScores();
  done.classList.remove("hide");
  done.innerHTML = "Your score has been submitted, " + theUser + "! Click 'View High Scores' to see how you compare to other quiz takers!"
  submitButton.style="display:none";
  userInitials.style="display:none";
  initialText.style="display:none";
  scorePage.style="display:block";
})

// Function to record your submitted score. Adds "NA" if you leave the submission box blank
function RecordScores() {
  theUser = userInitials.value.trim().toUpperCase();
  if (theUser === "") {
    theUser = "NA";
  }
  console.log(theUser);
  var newScore = theUser + ":" + localStorage.getItem("score");
  var highScoreList =  localStorage.getItem("highScores");
  console.log(typeof highScoreList);
  if (highScoreList === null) {
    highScoreList = "";
  }
  highScoreList += ("\n" + newScore);
  localStorage.setItem("highScores", highScoreList);
}

//Function to display a list of all submitted scores
function ShowScores() {
  theScoreboard.classList.remove("hide");
  scoreList.innerHTML = "";
  var highScoreList =  localStorage.getItem("highScores");
  console.log(highScoreList);
  let arr = highScoreList.split('\n');
  console.log(arr);
  for (i=0;i<arr.length;i++)
  {
    if (arr[i] === "") {
      continue;
    }
    scoreList.innerHTML += arr[i] + "<br>";
  }
}

// Determines that the "scorePage" button takes you to the View High Scores page
scorePage.addEventListener('click',function() {
  done.classList.add("hide");
  ShowScores();
  questionEl.classList.add("hide");
  restart.classList.remove("hide");
})

// Makes it so the "Restart" button will reload the page so you can take the quiz again
restart.addEventListener('click', function() {
  location.reload();
})

//The list of questions and answers used in the quiz, along with if they are correct or incorrect
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