var contentEl = document.getElementById("content");
var startBtn = document.querySelector("#start");
var timerEl = document.querySelector("#timer");
var containerEl = document.querySelector("#container");
var highScoreEl = document.querySelector("#high-score");
// highScore display - Does it need to be global?
highScoreEl.textContent = highScore;

var highScore = 0;
var timer = 75;
var currentQuestionIndex = 0;
var timerInterval;

//List of questions:
//Win condition
//Loss condition
//High Score href // high score
//Using local storage to set and clear items?

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

//staring timer

function startTimer() {
  timerEl.textContent = timer;

  timerInterval = setInterval(function () {
    timer--;
    timerEl.textContent = timer;

    if (timer <= 0) {
      endGame();
    }
  }, 1000);
}

//Function that creates the questions and answers
var renderCurrentQuestion = function () {
  containerEl.innerHTML = "";
  console.log(currentQuestionIndex);
  var currentQuestion = questions[currentQuestionIndex];

  var header = document.createElement("h2");
  header.textContent = currentQuestion.question;
  containerEl.appendChild(header);

  var olEl = document.createElement("ol");

  for (var i = 0; i < currentQuestion.options.length; i++) {
    var liEl = document.createElement("li");
    liEl.textContent = currentQuestion.options[i];
    olEl.appendChild(liEl);
  }
  containerEl.appendChild(olEl);
};

//Highscore display // Need to figure out where to call it // Also needs to clear h1 from main
var renderGameoverDisplay = function () {
  containerEl.innerHTML = "";
  var header = document.createElement("h2");
  header.textContent = "All done!";
  var finalScore = document.createElement("div");
  finalScore.textContent = "Your final score is: ";
  var finalScoreSpan = document.createElement("span");
  finalScoreSpan.textContent = highScore;
  var initials = document.createElement("div");
  initials.textContent = "Enter initials: ";
  var initialsSpan = document.createElement("span");
  var initialsInput = document.createElement("INPUT");
  var submitInput = document.createElement("INPUT");
  initialsInput.setAttribute("type", "text");
  submitInput.setAttribute("type", "submit");

  initialsSpan.appendChild(initialsInput);
  initialsSpan.appendChild(submitInput);
  initials.appendChild(initialsSpan);
  finalScore.appendChild(finalScoreSpan);

  containerEl.appendChild(header);
  containerEl.appendChild(finalScore);
  containerEl.appendChild(initials);
};

// Highscore list for the container // Need to figure out where to call it
var renderHighScoreslist = function () {
  containerEl.innerHTML = "";
  var header = document.createElement("h2");
  header.textContent = "High scores";
  var list = document.createElement("INPUT");
  list.setAttribute("type", "text");
  var submitBtn = document.createElement("div");
  var resetBtn = document.createElement("BUTTON");
  resetBtn.textContent = "Go back";
  var clearHighScoreBtn = document.createElement("BUTTON");
  clearHighScoreBtn.textContent = "Clear high scores";
  submitBtn.appendChild(resetBtn);
  submitBtn.appendChild(clearHighScoreBtn);

  containerEl.appendChild(header);
  containerEl.appendChild(list);
  containerEl.appendChild(submitBtn);
};

function endGame() {
  // can also just change it to textContent = 0
  clearInterval(timerInterval);
  timerEl.textContent = 0;
  containerEl.innerHTML = "";
  // change DOM to say game over
  var header = document.createElement("h2");
  header.textContent = "Game Over";
  containerEl.appendChild(header);
}

startBtn.addEventListener("click", function () {
  startTimer();
  renderCurrentQuestion();
  // renderHighScoreslist();
  // renderGameoverDisplay();
});

containerEl.addEventListener("click", function (event) {
  if (event.target.matches("li")) {
    timerEl.textContent = timer;
    var currentQuestion = questions[currentQuestionIndex];

    var userGuess = event.target.textContent;

    if (userGuess === currentQuestion.answer) {
      console.log("You guessed right!");
      // add score
      highScore++;
      highScoreEl.textContent = highScore;
      // increase song
      // play sound
    } else {
      console.log("You guessed wrong");
      timer--;
    }
    // Need if else statement so it doesnt go to questions that doesn't exist
    console.log(currentQuestionIndex, questions.length);
    // Index starts at 0 and lenght starts at 1. Needs to match.
    if (currentQuestionIndex == questions.length - 1) {
      console.log("equal");
      //end of game
      endGame();
    } else {
      console.log("not equal");
      currentQuestionIndex++;
      renderCurrentQuestion();
    }
  }
});

console.log(questions[0].question);

//hide start quiz btn
//display the leadership board to fill out inititials
//create a click event, when clicked, store initials and highscore as object in local storage
//hint: create an array, push that object to array, save whole array to local storage

// var user = {
//   username: initials,
//   highscore: highscore
// }
// array.push(user)
// localStorage.setItem(keyname, array)
