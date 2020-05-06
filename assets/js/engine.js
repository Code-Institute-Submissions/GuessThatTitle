/* Change every time new game is started*/

var roundPosition; // Track what round they are on
var score; // Track their score

/* Change every Round*/

var numberOfLives; // Store lives
var numberOfPasses; // Store number of passes left
var currentQuestionNumber; // Store what question they are on out of 10
var questionNumber; // Track what question they are on (out of 10)
var topic;

/* Change every question */

var timer; // used to display seconds left to answer question
var questionText; // Store question text
var yearClue; //  Store year film was made

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
   var topicOne = jsonData[Object.keys(jsonData)[x -1]];
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
generateQuestion();
}); 

// Generate the question
function generateQuestion() {
// Called after data is gathered

function callApi(cb) {
var URL = "https://www.omdbapi.com/?apikey=c1466e63&s=" + topic; // Set url for query to api based on topic selected
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
    // Do stuff with data here 
    var movies = info;
    console.log(movies);

    

}


callApi(processData); // Call on the API to get movies based on topic


}














/* Start Game function */
function roundStart() {
// Make choose topic container disappear and start displaying questions     


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
