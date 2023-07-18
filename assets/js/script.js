var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');

function countdown() {
  var timeLeft = 80;

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


countdown();


