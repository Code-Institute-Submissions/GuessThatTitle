/* Change every time new game is started*/

var roundPosition; // Track what round they are on
var score; // Track their score
var pageNumber;
/* Change every Round*/

var numberOfLives = 3; // Store lives
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


$(".play-now-btn").click(function(){
startGame();
});


// Called when the game is started
function startGame() {
    // Reset variables 
    numberOfLives = 3;
    questionNumber = 1;
    roundPosition = 1;
    timerVal = 60;
    arrayPositionSelect = 1;
    getTopics();
    displayTopicChoice();
}




function displayTopicChoice() {
    // Pull up html for topic choice (remove-d-none)
    $(".displayvar").addClass("d-none"); // Hide everything 
    $(".select-topic").removeClass("d-none"); // Show topic choice
}




function getTopics() {
clearInterval(timer); // Clear interval when new round is called 
console.log("TIMER RESET");
questionNumber = 1;
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
  var x=1;
  var y=1;
  var z=1;
  
  // Generate three different random numbers (don't want same topic selected twice)
  do{
        x = Math.ceil(Math.random() * 10);
        y = Math.ceil(Math.random() * 10);
        z = Math.ceil(Math.random() * 10);
    }  while (x === y || y === z || z === x);

   // Select Topics from JSON (need to minus one since array starts at 0)
   var topicOne = jsonData[Object.keys(jsonData)[x - 1]];
   var topicTwo = jsonData[Object.keys(jsonData)[y -1]];  
   var topicThree = jsonData[Object.keys(jsonData)[z -1]];  

   // Set round number 
   document.getElementById("round-number").innerHTML = roundPosition; 
   
   document.getElementById("topic1").innerHTML = topicOne; 
   document.getElementById("topic2").innerHTML = topicTwo; 
   document.getElementById("topic3").innerHTML = topicThree; 
  
  }

  getData(createArray); // Call set data and pass in createArray function
}

// Listen for topic to be chosen 
$(".choose-topic-btn").click(function(){
// Set global topic variable to the chosen topic 
topic = $(this).text();
console.log("Topic Choosen: " + topic);
// Now you need to generate the questions based on this topic
// Hide Select Topic buttons 
$(".select-topic").fadeIn('1000').addClass("d-none");
$(".loading").removeClass("d-none");
generateQuestion(); // Generate 6 questions (3 random movies from 2 random pages)
}); 

// Generate the question
function generateQuestion() {
// Called after data is gathered
console.log("Question Number: " + questionNumber);
function callApi(cb) {
console.log("Getting data from page : " + pageNumber);
var URL = "https://www.omdbapi.com/?apikey=c1466e63&s=" + topic + "&page=" + pageNumber; // Set url for query to api based on topic selected
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

function processData (info) {

 var movies = info;
  // Select three random movie titles
  var x=1;
  var y=1;
  
  
  // Generate three different random numbers (don't want same topic selected twice)
  do{
        x = Math.round(Math.random() * 10);
        y = Math.round(Math.random() * 10);
      
    }  while (x === y || x === 0 || y === 0);


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
  var x=1;
  var y=1;
  do{
        x = Math.round(Math.random() * 10);
        y = Math.round(Math.random() * 10);
     
    }  while (x === y || x === 0 || y === 0);

// Get data from two random pages 
pageNumber = x;
for (i=0; i < 2; i++) {  
callApi(processData); // Call on the API to get movies based on topic from two random pages 
pageNumber = y;
}

// Call showQuestion 
setTimeout(showQuestion, 3000); // Wait for arrayto poputate
}


function showQuestion() {



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
if (titlewords[wordPosition].toString().toLowerCase() != topic.toString().toLowerCase()) {
    lengthOfWord = titlewords[wordPosition].length;
    console.log(lengthOfWord);
    titlewords[wordPosition] =  "GUESS";
}
// Problem might arise if the movie only has one word and it is the key word (end in infinite loop)
// Check if the title is only one word and that word is the topic word 
else if (titlewords.length === 1 && titlewords[wordPosition].toString().toLowerCase() === topic.toString().toLowerCase()){
    lengthOfWord = titlewords[wordPosition].length;
    console.log(lengthOfWord);
    titlewords[wordPosition] =  "GUESS";
}
else {
    removeWord();     // Call the function again if it choose the topic word 
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
$(".display-answer").text(answer);
// at the end of this increase Question Number so when it is called again it moves on to the next question

// Clear the timer 
clearInterval(timer);
console.log("TIMER RESET");
// Start Timer when everything is ready 
startTimer();

}


function checkAnswer () {
    var check = $("#input-answer").val();
    // need to strip answer of special strings (, : ? etc)
    var stripAns = answer.replace(/[#?!,:]/g, "");
    if(check.toString().toLowerCase() == stripAns.toString().toLowerCase()) {
       $("#input-answer").css("border", "2px solid green"); 
       setTimeout(nextQuestion, 1000);
    }
    else {
          $("#input-answer").css("border", "2px solid black"); 
    }
}


// Start the timer for each question
function startTimer() {

// Cap timer at 10 seconds so it can't go any lower    
if (timerVal == 10) {
    timerVal = 10;
}    
else {
timerVal = 60 / roundPosition;
}

clearInterval(timer);
// Use roundNumber to determine how quick it goes     
// A minute for each question in Round 1 - Timer initial value is 60 seconds 
$(".timer").text(timerVal);

timer = setInterval(countDown, 1000);

function countDown () {
    if (timerVal != 0) {
    timerVal--;
    $(".timer").text(timerVal);
    }
    else {
    clearInterval(timer);
    numberOfLives--;
    document.getElementById("lives").innerHTML = numberOfLives;   
    nextQuestion(); 
}
}

}

function restartTimer() {
    // When the next question is called 
}



// When question is answered - move to next question
function nextQuestion() {

 
        // empty text area 
       $("#input-answer").val(""); 
      $("#input-answer").css("border", "2px solid black");
       questionNumber++;
       arrayPositionSelect++;
       if (questionNumber < 5 && numberOfLives > 0) {
       showQuestion(); // Dont need to call generate question (all questions generated)
       }
       else if (numberOfLives < 0){

       }
       else {
           roundComplete();
           // Start Round
       
       }
}

// Pass current question (costs a life)
function skipQuestion() {
   // Check if they have any lives left 
   if (numberOfLives < 0) {
       console.log("You gotz no lives left"); 
       // Alert them that they have no lives
       $(".skip-question-btn").text("Out of lives!");
       $(".skip-question-btn").css("background-color", "red");
   } 
   else {
   // Lose a life
   numberOfLives--;
   document.getElementById("lives").innerHTML = numberOfLives; 
   nextQuestion(); // Call next question
   }

}

// Move to next round
function startRound() {
    // Anything else you need to do when a round is started
    $(".message-to-player").addClass("d-none");
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
// Display round complete message 
$(".displayvar").addClass("d-none"); // Hide everything 
$(".message-to-player").text("Round Complete!").removeClass("d-none");
// Wait 2 seconds and start next round  
setTimeout(nextRound, 2000);
    
// Go to next round
}

// Quit the game
function quit() {}

// Restart the game
function restart() {}

// Called when they are out of lives (by skipping questions or running out of time)
function gameOver() {}


$(".skip-question-btn").click(function(){
skipQuestion();
});

