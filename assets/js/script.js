var timerEl = document.getElementById('countdown');
var start = document.getElementById('start');
var answer = document.getElementsByClassName('option_button');
var timeLeft = 80;
var testQuestions = document.getElementsByClassName('response_box');
testQuestions.style = document.getElementsByClassName('response_box');
var theQuestion = document.getElementById('questionText');
var buttonOne = document.getElementById('option_1');
var buttonTwo = document.getElementById('option_2');
var buttonThree = document.getElementById('option_3');
var buttonFour = document.getElementById('option_4');
var wrongButton = document.getElementsByClassName('option_button');
var answerCheck = document.getElementById('iscorrect');


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
    testQuestions.style="display:block";
    theQuestion.textContent = 'What does the DOM stand for?';
    buttonOne.textContent = 'Directive Override Mission';
    buttonTwo.textContent = 'Document Object Model';
    buttonThree.textContent = 'Discovery Objective Model';
    buttonFour.textContent = 'Dismount Obstacles Mission';
  }
})

wrongButton.addEventListener('click', function() {
  if(wrongButton) {
    answerCheck.textContent = 'Wrong Answer!';
  } else {
    answerCheck.textContent = 'Correct!';
  }
})


