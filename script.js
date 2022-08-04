var contentEl = document.getElementById("content");
var startBtn = document.querySelector("#start");
var timerEl = document.querySelector("#timer");
var containerEl = document.querySelector("#container");
var highScoreEl = document.querySelector("#high-score");
// highScoreEl.textContent = highScore;
var hideStartBtn = function () {
  document.getElementById("start").style.display = "none";
};
var hideHeader = function () {
  document.getElementById("header").style.display = "none";
};

var highScore = 0;
var timer = 15;
var currentQuestionIndex = 0;
var timerInterval;
var scores = JSON.parse(localStorage.getItem("scores")) || [];

console.log(scores);

var questions = [
  {
    question: "Commonly used data types DO Not Include:",
    options: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question: "The condition in an if/else statement is enclosed with______.",
    options: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "parenthesis",
  },
  {
    question: "Arrays in JavaScript can be used to store______.",
    options: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
];

//starting timer
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

//Function that creates the ol li
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
  hideStartBtn();
};

//Highscore display
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
  initialsInput.setAttribute("type", "text");
  initialsInput.setAttribute("id", "input-value");
  var submitInputBtn = document.createElement("BUTTON");
  submitInputBtn.textContent = "Submit";

  initialsSpan.appendChild(initialsInput);
  initialsSpan.appendChild(submitInputBtn);
  initials.appendChild(initialsSpan);
  finalScore.appendChild(finalScoreSpan);

  containerEl.appendChild(header);
  containerEl.appendChild(finalScore);
  containerEl.appendChild(initials);

  //Storing objects in storage and JSON
  // Why can't I put .value in this
  var initialsInputValue = document.getElementById("input-value");

  submitInputBtn.addEventListener("click", function () {
    console.log(initialsInputValue.value);
    console.log(highScore);

    var userScore = {
      initials: initialsInputValue.value,
      highScore: highScore,
    };

    console.log(userScore);

    scores.push(userScore);

    // Storing data into browser with JSON
    localStorage.setItem("scores", JSON.stringify(scores));

    renderHighScoreslist();
  });
};

// Highscore list for the container after entering initials
var renderHighScoreslist = function () {
  //Spread syntax for future reference
  // sortScores = [];
  // sortScores.push(...scores)
  scores.sort(function (a, b) {
    return b.highScore - a.highScore;
  });

  console.log(scores[0]);
  // i < scores.length the run through the list if I want to create a list of high score
  for (var i = 0; i === 0; i++) {
    console.log(scores[i]);

    var score = document.createElement("p");
    score.textContent = `${scores[i].initials}: ${scores[i].highScore}`;
    // contentEl.appendChild(score);
    console.log(score);
  }

  containerEl.innerHTML = "";
  var header = document.createElement("h2");
  header.textContent = "High scores";
  var submitBtn = document.createElement("div");
  var resetBtn = document.createElement("BUTTON");
  resetBtn.textContent = "Go back";
  var clearHighScoreBtn = document.createElement("BUTTON");
  clearHighScoreBtn.textContent = "Clear high scores";
  submitBtn.appendChild(resetBtn);
  submitBtn.appendChild(clearHighScoreBtn);

  containerEl.appendChild(header);
  containerEl.appendChild(score);
  containerEl.appendChild(submitBtn);
  // Go back button
  resetBtn.addEventListener("click", function () {
    window.location.href = "index.html";
  });
  // Clear score button
  clearHighScoreBtn.addEventListener("click", function () {
    console.log("test");
    // clear score
    score.textContent = "";
    localStorage.clear();
  });
};

function endGame() {
  clearInterval(timerInterval);
  timerEl.textContent = 0;
  containerEl.innerHTML = "";
  // Show game over
  renderGameoverDisplay();
  hideStartBtn();
}

// View High Score button
highScoreEl.addEventListener("click", function () {
  renderHighScoreslist();
  hideStartBtn();
  hideHeader();
});

// Game start button
startBtn.addEventListener("click", function () {
  startTimer();
  renderCurrentQuestion();
  hideHeader();
});

// Question select clicks
containerEl.addEventListener("click", function (event) {
  if (event.target.matches("li")) {
    timerEl.textContent = timer;
    var currentQuestion = questions[currentQuestionIndex];

    var userGuess = event.target.textContent;

    if (userGuess === currentQuestion.answer) {
      console.log("You guessed right!");
      highScore++;
      // increase song
      // play sound
    } else {
      console.log("You guessed wrong");
      timer--;
    }
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
