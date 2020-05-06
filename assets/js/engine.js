/* Change every time new game is started*/

var roundPosition; // Track what round they are on
var score; // Track their score
var pageNumber;
/* Change every Round*/

var numberOfLives; // Store lives
var numberOfPasses; // Store number of passes left
var currentQuestionNumber; // Store what question they are on out of 10
var questionNumber; // Track what question they are on (out of 10)
var topic;
var tempQuestion = []; // Store question data temp before pushing array into quesiton array
var questions = []; // store questions for each round 

/* Change every question */

var timer; // used to display seconds left to answer question
var questionText; // Store question text
var yearClue; //  Store year film was made
var lengthOfWord;

getTopics();

function getTopics() {
  // get topics from json file - generate random number between 1 and 10 and select key and item based on that

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
generateQuestion(); // Generate 6 questions (3 random movies from 2 random pages)
}); 

// Generate the question
function generateQuestion() {
// Called after data is gathered

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
  var z=1;
  
  // Generate three different random numbers (don't want same topic selected twice)
  do{
        x = Math.round(Math.random() * 10);
        y = Math.round(Math.random() * 10);
        z = Math.round(Math.random() * 10);
    }  while (x === y || y === z || z === x || x === 0 || y === 0 || z === 0);


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
    
    
    var selected = movies.Search[z - 1]; 
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
// At this point you have 6 questions stored in an array with their respective years
questionNumber = 1; // Start questions
// Call showQuestion 
setTimeout(showQuestion, 3000); // Wait for arrayto poputate
}


function showQuestion() {
movieTitleData = questions[questionNumber - 1][0];
movieYearData = questions[questionNumber - 1][1];
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
var wordPosition = rand - 1; // Array start at 0 
console.log("What we are trying to replace: " + titlewords[wordPosition]);
console.log("the current topic :" + topic);
if (titlewords[wordPosition].toString().toLowerCase() != topic.toString().toLowerCase()) {
    lengthOfWord = titlewords[wordPosition].length;
    console.log(lengthOfWord);
    titlewords[wordPosition] =  "GUESS";
}
else {
    removeWord(); // Call the function again if it choose the topic word
}


}

// Call random word - Pick a word to be replaced - check that the word is not the topic word - if it is restart the function - if not replace it with 'guess'
removeWord();

console.log("question to be displayed: " + titlewords);

// Build HTML 
// Remove Loading Giff
// Input question data into template 

document.getElementById("question_number").innerHTML = questionNumber;


// at the end of this increase Question Number so when it is called again it moves on to the next question
}



// Start the timer for each question
function startTimer() {}

// Submit answer
function submitAnswer() {}

// When question is answered - move to next question
function nextQuestion() {}

// Lose a life if you get the answer wrong
function lostLife() {}

// Pass current question (costs a pass)
function skipQuestion() {}

// Move to next round
function nextRound() {}

// Round completed
function roundComplete() {
  console.log("Round completed");
}

// Quit the game
function quit() {}

// Restart the game
function restart() {}

/* Button listener */
$(".play-now-btn").click(function () {
  // Start the game
});
