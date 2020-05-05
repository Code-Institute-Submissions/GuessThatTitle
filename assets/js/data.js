// This is a basic script used to access data 
var movie_name = "car";
var url = "https://www.omdbapi.com/?apikey=c1466e63&s=" + movie_name;

function getData (cb) {

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", url);
    xhr.send();
}

var el = document.getElementById("data");

getData(function(data) {
    data = data.Search;

    data.forEach(function(item){
    el.innerHTML += "<p>" + item.Title + "</p>";
    });
});