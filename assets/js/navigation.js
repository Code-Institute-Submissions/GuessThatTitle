$(".menu-button ").click(function(){
// Display nav (will add slide)    
$(".contain-menu").toggle("slidedown");
});


$(".go-home").click(function(){
console.log("home nav clicked");
$(".displayvar").addClass("d-none");
$(".contain-menu").toggle("slidedown");
$(".page-body").removeClass("d-none");    
});

$(".play-game").click(function(){
console.log("Start the game");
});

$(".go-about").click(function(){
// Hide everything 
// Unhide about    
});



$(".how-to").click(function(){
console.log("How to Play");    
});

$(".go-contact").click(function(){
// Hide everything 
// Unhide contact     
});