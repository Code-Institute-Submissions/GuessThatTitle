/* Change every time new game is started*/

var roundPosition; // Track what round they are on
var score; // Track their score
var pageNumber;
/* Change every Round*/

var numberOfLives; // Store lives
var numberOfPasses; // Store number of passes left
var currentQuestionNumber; // Store what question they are on out of 10
var questionNumber = 1; // Track what question they are on (out of 10)
var topic;
var tempQuestion = []; // Store question data temp before pushing array into quesiton array
var questions = []; // store questions for each round
var timerVal = 60;
/* Change every question */

var timer; // used to display seconds left to answer question
var questionText; // Store question text
var yearClue; //  Store year film was made
var lengthOfWord;
var wordPosition;
var answer;
var arrayPositionSelect = 1;

// Audio
var correctAnsAudio = new Audio("/assets/audio/correct2.mp3");
correctAnsAudio.loop = false; //  Dont Loop
correctAnsAudio.volume = 0.5;

var wrongAnsAudio = new Audio("/assets/audio/wrong.mp3");
wrongAnsAudio.loop = false; //  Dont Loop
wrongAnsAudio.volume = 0.3;

var timerAudio = new Audio("/assets/audio/beep.mp3");
timerAudio.loop = false;
timerAudio.volume = 0.5;


$(".play-now-btn").click(function () {
  $(".displayvar").addClass("d-none");
  $(".message-to-player").text("GOOD LUCK!");
  $(".splashscreen").hide().fadeIn(500).removeClass("d-none");
  setTimeout(startGame, 3000);
});

// Called when the game is started
function startGame() {
  setVars();
  getTopics();
  displayTopicChoice();
  $(".menu1").addClass("d-none");
  $(".menu2").removeClass("d-none");
  console.log("show menu");
}

function transition() {}

// Set variable values for start of game
function setVars() {
  numberOfLives = 3;
  questionNumber = 1;
  roundPosition = 1;
  timerVal = 60;
  arrayPositionSelect = 1;
  questions = [];
  clearInterval(timer);
}

function displayTopicChoice() {
  // Pull up html for topic choice (remove-d-none)
  $(".displayvar").addClass("d-none"); // Hide everything
  $(".select-topic").removeClass("d-none"); // Show topic choice
}

function getTopics() {
  questionNumber = 1;
  clearInterval(timer); // Clear interval when new round is called
  console.log("TIMER RESET");
  // Request the data from the json file

  function getData(setData) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/js/topics.json");
    xhr.send();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        setData(JSON.parse(this.responseText)); // Only call createArray when the data has arrived
      }
    };
  }

  function createArray(data) {
    var jsonData = data;
    var x = 1;
    var y = 1;
    var z = 1;

    // Generate three different random numbers (don't want same topic selected twice)
    do {
      x = Math.ceil(Math.random() * 20);
      y = Math.ceil(Math.random() * 20);
      z = Math.ceil(Math.random() * 20);
    } while (x === y || y === z || z === x);

    // Select Topics from JSON (need to minus one since array starts at 0)
    var topicOne = jsonData[Object.keys(jsonData)[x - 1]];
    var topicTwo = jsonData[Object.keys(jsonData)[y - 1]];
    var topicThree = jsonData[Object.keys(jsonData)[z - 1]];

    console.log("X :" + x);
    console.log("Y :" + y);
    console.log("Z :" + z);

    // Set round number
    document.getElementById("round-number").innerHTML = roundPosition;

    document.getElementById("topic1").innerHTML = topicOne;
    document.getElementById("topic2").innerHTML = topicTwo;
    document.getElementById("topic3").innerHTML = topicThree;
  }

  getData(createArray); // Call set data and pass in createArray function
}

// Listen for topic to be chosen
$(".choose-topic-btn").click(function () {
  // Set global topic variable to the chosen topic
  topic = $(this).text();
  console.log("Topic Choosen: " + topic);
  // Now you need to generate the questions based on this topic
  // Hide Select Topic buttons
  $(".select-topic").fadeIn("1000").addClass("d-none");
  $(".loading").removeClass("d-none");
  generateQuestion(); // Generate 6 questions (3 random movies from 2 random pages)
});

// Generate the question
function generateQuestion() {
  // Called after data is gathered
  console.log("Question Number: " + questionNumber);
  function callApi(cb) {
    console.log("Getting data from page : " + pageNumber);
    var URL =
      "https://www.omdbapi.com/?apikey=c1466e63&s=" +
      topic +
      "&page=" +
      pageNumber; // Set url for query to api based on topic selected
    var xhr = new XMLHttpRequest();
    // set url based on selected trending item
    xhr.open("GET", URL);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        cb(JSON.parse(this.responseText)); // Only call createArray when the data has arrived
      }
    };
  }

  function processData(info) {
    var movies = info;
    // Select three random movie titles
    var x = 1;
    var y = 1;

    // Generate three different random numbers (don't want same topic selected twice)
    do {
      x = Math.round(Math.random() * 10);
      y = Math.round(Math.random() * 10);
    } while (x === y || x === 0 || y === 0);

    var selected = movies.Search[x - 1];
    console.log(selected);
    var movieTitle = selected[Object.keys(selected)[0]]; // Movie Title - Push to Array
    var movieYear = selected[Object.keys(selected)[1]]; // Movie Year - Push to Array

    // Create an array and then push into Questions Array
    tempQuestion = [movieTitle, movieYear];
    questions.push(tempQuestion);

    var selected = movies.Search[y - 1];
    console.log(selected);
    var movieTitle = selected[Object.keys(selected)[0]]; // Movie Title - Push to Array
    var movieYear = selected[Object.keys(selected)[1]]; // Movie Year - Push to Array

    // Create an array and then push into Questions Array
    tempQuestion = [movieTitle, movieYear];
    questions.push(tempQuestion);
  }
  // Generate two random numbers
  var x = 1;
  var y = 1;
  do {
    x = Math.round(Math.random() * 10);
    y = Math.round(Math.random() * 10);
  } while (x === y || x === 0 || y === 0);

  // Get data from two random pages
  pageNumber = x;
  for (i = 0; i < 2; i++) {
    callApi(processData); // Call on the API to get movies based on topic from two random pages
    pageNumber = y;
  }

  // Call showQuestion
  setTimeout(showQuestion, 3000); // Wait for arrayto poputate
}

function showQuestion() {
  console.log("Array Output");
  console.log(questions);
  movieTitleData = questions[arrayPositionSelect - 1][0];
  movieYearData = questions[arrayPositionSelect - 1][1];
  // Make choose topic container disappear and start displaying questions
  // Use question number to select what data to manipulate
  console.log("Movie Title: " + movieTitleData);
  console.log("Movie Year: " + movieYearData);

  // Break down the data
  var titlewords = movieTitleData.split(" "); // Title stored in its own array
  var titlelength = titlewords.length;
  console.log("Title lendth : " + titlelength);
  // Remove a random word from the title that isn't the topic word

  function removeWord() {
    // Generate random number between the length of the title and 1
    var rand;
    do {
      rand = Math.round(Math.random() * 10);
    } while (rand > titlelength || rand === 0);
    wordPosition = rand - 1; // Array start at 0
    console.log("What we are trying to replace: " + titlewords[wordPosition]);
    answer = titlewords[wordPosition];
    console.log("the current topic :" + topic);
    answer = answer.replace(/[#?!,:]/g, "");
    // Use answer length to generate string to replace missing word with

    var replacement = [];

    // If answer is just one letter - replace it with an underline
    // If answer is greater than one - replace the remaining letters with underline

    if (answer.length === 1) {
      for (i = 0; i < answer.length; i++) {
        replacement[i] = ["_"];
      }
    } else {
      for (i = 0; i < answer.length - 1; i++) {
        replacement[i] = ["_"];
      }
    }

    var string = answer[0] + replacement.join();
    string.replace(/,/g, "");

    if (
      titlewords[wordPosition].toString().toLowerCase() !=
      topic.toString().toLowerCase()
    ) {
      lengthOfWord = titlewords[wordPosition].length;
      console.log(lengthOfWord);
      titlewords[wordPosition] = `${string}`;
    }
    // Problem might arise if the movie only has one word and it is the key word (end in infinite loop)
    // Check if the title is only one word and that word is the topic word
    else if (
      titlewords.length === 1 &&
      titlewords[wordPosition].toString().toLowerCase() ===
        topic.toString().toLowerCase()
    ) {
      lengthOfWord = titlewords[wordPosition].length;
      console.log(lengthOfWord);
      titlewords[wordPosition] = `${string}`;
    } else {
      removeWord(); // Call the function again if it choose the topic word
    }
  }

  // Call random word - Pick a word to be replaced - check that the word is not the topic word - if it is restart the function - if not replace it with 'guess'
  removeWord();

  console.log("question to be displayed: " + titlewords);

  // Build HTML
  // Remove Loading Giff
  // Input question data into template
  var displayQ = titlewords.toString();
  var displayQ2 = displayQ.replace(/,/g, " ");

  document.getElementById("question_number").innerHTML = questionNumber;
  document.getElementById("lives").innerHTML = numberOfLives;
  $(".display-title").text(displayQ2);
  $(".display-question").removeClass("d-none");
  $(".loading").addClass("d-none");

  // at the end of this increase Question Number so when it is called again it moves on to the next question

  // Clear the timer
  clearInterval(timer);
  console.log("TIMER RESET");
  // Start Timer when everything is ready
  startTimer();
}

function checkAnswer() {
  if (answer.length == 1) {
    var check = $("#input-answer").val();
  } else {
    var check = answer[0] + $("#input-answer").val();
  }

  // need to strip answer of special strings (, : ? etc)
  var stripAns = answer.replace(/[#?!,:]/g, "");
  if (check.toString().toLowerCase() == stripAns.toString().toLowerCase()) {
    $("#input-answer").css("color", "green");
    correctAnsAudio.play();
    $("#correct").fadeIn(500).toggleClass("d-none");
    clearInterval(timer);
    setTimeout(nextQuestion, 2000);
  } else {
    $("#input-answer").css("color", "#212429");
  }
}

// Start the timer for each question
function startTimer() {
  // Cap timer at 10 seconds so it can't go any lower
  if (timerVal == 10) {
    timerVal = 10;
  } else {
    timerVal = 60 / roundPosition;
  }

  clearInterval(timer);
  // Use roundNumber to determine how quick it goes
  // A minute for each question in Round 1 - Timer initial value is 60 seconds
  $(".timer").text(timerVal);

  timer = setInterval(countDown, 1000);

  function countDown() {
    if (timerVal != 0) {
      if (timerVal <= 10) {
        timerAudio.play();
        $(".timer").css("color", "red");
      }
      timerVal--;
      $(".timer").hide().fadeIn("1000").text(timerVal);
    } else {
      // Show the correct answer here
      clearInterval(timer);
      loseLife();
      document.getElementById("lives").innerHTML = numberOfLives;
      $("#input-answer").val(answer);
      setTimeout(doNext, 4000);

      function doNext() {
      $(".timer").css("color", "grey"); // Reset color
      nextQuestion();
      }
    }
  }
}

function restartTimer() {
  // When the next question is called
}

// When question is answered - move to next question
function nextQuestion() {
  // empty text area and remove message
  $("#correct").fadeIn(500).addClass("d-none");

  $("#input-answer").val("");
  $("#input-answer").css("color", "#212429");
  questionNumber++;
  arrayPositionSelect++;
  if (questionNumber < 5 && numberOfLives >= 0) {
    showQuestion(); // Dont need to call generate question (all questions generated)
  } else if (numberOfLives < 0) {
    gameOver();
  } else if (questionNumber >= 5) {
    roundComplete();
    // Start Round
  }
}

// Pass current question (costs a life)
function skipQuestion() {
  // Check if they have any lives left
  if (numberOfLives < 1) {
    // Alert them that they have no lives
    $(".skip-question-btn").text("Out of lives!");
    $(".skip-question-btn").css("background-color", "red");
  } else {
    // Lose a life
    loseLife();
    document.getElementById("lives").innerHTML = numberOfLives;
    nextQuestion(); // Call next question
  }
}

// Move to next round
function startRound() {
  // Anything else you need to do when a round is started
  $(".splashscreen").addClass("d-none");
  getTopics();
  displayTopicChoice();
}

function nextRound() {
  // Increase round position number
  roundPosition++;
  // Call topic selection
  startRound();
  // Vary timer settings
}

// Round completed
function roundComplete() {
  numberOfLives++; // Add a life if they complete the round 
  document.getElementById("message-icon").innerHTML = `+1</h5><i class="fas fa-heart message-icon-style-2 d-inline"></i>`;
  // Display round complete message
  $(".displayvar").addClass("d-none"); // Hide everything
  $(".message-to-player").text("Round Complete!");
  $(".splashscreen").removeClass("d-none");
  // Wait 2 seconds and start next round
  setTimeout(nextRound, 2000);
}

function loseLife() {
  // Play sound
  wrongAnsAudio.play();

  var x = 1;
  var shakeheart = setInterval(shake, 100);

  function shake() {
    if (x < 5) {
      $("#lives").toggleClass("d-none");
      $(".lives-icon").toggleClass("d-none");
      x++;
      console.log("X is");
    } else {
      clearInterval(shakeheart);
    }
  }
  numberOfLives--;
}

// Mute Audio

$(".audio-icon").click(function () {
  if (correctAnsAudio.volume != 0) {
    $(this).removeClass("fa-volume-up").addClass("fa-volume-mute");
    correctAnsAudio.volume = 0;
    wrongAnsAudio.volime = 0;
    timerAudio.volume = 0;
    console.log("Sound Muted");
  } else if (correctAnsAudio.volume == 0) {
    $(this).removeClass("fa-volume-mute").addClass("fa-volume-up");
    correctAnsAudio.volume = 0.5;
    wrongAnsAudio.volime = 0.3;
    timerAudio.volume = 0.5;
    console.log("Sound On");
  }
});

$(".end-game").click(function () {
  quit();
});

$(".start-again").click(function(){
$(".contain-menu").toggle("slidedown");
startGame();
});

// Quit the game
function quit() {
  setVars();
  $(".menu1").removeClass("d-none");
  $(".menu2").addClass("d-none");
  $(".displayvar").addClass("d-none");
  $(".contain-menu").toggle("slidedown");
  $(".page-body").removeClass("d-none");
}

// Called when they are out of lives (by skipping questions or running out of time)
function gameOver() {
  $(".displayvar").addClass("d-none");
  $("#message-icon").text(" "); // Get rid of lives icon
  $(".message-to-player").text("Game Over :( ");
  $(".splashscreen").removeClass("d-none");
  setVars();
}

$(".skip-question-btn").click(function () {
  skipQuestion();
});
