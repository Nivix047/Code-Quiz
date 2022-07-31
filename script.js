var contentEl = document.getElementById("content");
var startBtn = document.querySelector("#start");
var timerEl = document.querySelector("#timer");
var containerEl = document.querySelector("#container");
var highScoreEl = document.querySelector("#high-score");

var highScore = 0;
var timer = 75;
var currentQuestionIndex = 0;
var timerInterval;

var questions = [
  {
    question: "What is the color of the sky",
    options: ["blue", "orange", "red", "green"],
    answer: "blue",
  },
  {
    question: "what car is best?",
    options: ["audi", "ford", "kia soul", "gmc"],
    answer: "kia soul",
  },
  {
    question: "what langauge is best?",
    options: ["java", "c++", "javascript", "python"],
    answer: "javascript",
  },
];

//Function that creates the questions and answers
var renderCurrentQuestion = function () {
  containerEl.innerHTML = "";
  var currentQuestion = questions[currentQuestionIndex];

  var header = document.createElement("h2");
  header.textContent = currentQuestion.question;
  containerEl.appendChild(header);

  var olEl = document.createElement("ol");

  for (var i = 0; i < currentQuestion.options.length; i++) {
    var liEl = document.createElement("li");
    liEl.textContent = `${i + 1}.` + currentQuestion.options[i];
    olEl.appendChild(liEl);
  }
  containerEl.appendChild(olEl);
};

//Function that tracks score
highScoreEl.textContent = highScore;

startBtn.addEventListener("click", function () {
  renderCurrentQuestion();

  timerEl.textContent = timer;

  if (timer === 0) {
    clearInterval(timerInterval);
    containerEl.innerHTML = "";
    // change DOM to say game over
    var header = document.createElement("h2");
    header.textContent = "Game Over";
    containerEl.appendChild(header);
  }
});

containerEl.addEventListener("click", function (event) {
  if (event.target.matches("li")) {
    timerEl.textContent = timer;
    var currentQuestion = questions[currentQuestionIndex];

    var userGuess = event.target.textContent;

    if (userGuess === currentQuestion.answer) {
      console.log("You guessed right!");
      // add score
      highScoreEl.textContent = highScore;
      highScore++;
      // increase song
      // play sound
    } else {
      console.log("You guessed wrong");
      timer--;
    }
    // Need if else statement so it doesnt go to questions that doesn't exist
    currentQuestionIndex++;
    renderCurrentQuestion();
  }
});

console.log(questions[0].question);
