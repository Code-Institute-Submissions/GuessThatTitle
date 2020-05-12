$(".menu-button").click(function () {
  // Display nav (will add slide)
  $(".contain-menu").toggle("slidedown");
});

$(".go-home").click(function () {
  console.log("home nav clicked");
  $(".displayvar").addClass("d-none");
  $(".contain-menu").toggle("slidedown");
  $(".page-body").removeClass("d-none");
});

$(".play-game").click(function () {
$(".displayvar").addClass("d-none");
$(".contain-menu").toggle("slidedown");
$(".message-to-player").text("GOOD LUCK!");
$(".splashscreen").hide().fadeIn(500).removeClass("d-none");
setTimeout(startGame, 3000);
});

$(".learn-more").click(function () {
$(".displayvar").addClass("d-none");
  $(".contain-menu").toggle("slidedown");
  $(".contain-about-us").removeClass("d-none");
});

$(".how-to").click(function () {
  $(".displayvar").addClass("d-none");
  $(".contain-menu").toggle("slidedown");
  $(".contain-how-to").removeClass("d-none");
});

$(".how-to-btn").click(function(){
$(".displayvar").addClass("d-none");
$(".contain-how-to").removeClass("d-none");
});

// Close email send popup
$(".close-popup").click(function(){
$(".email-success").addClass("d-none");
$(".email-fail").addClass("d-none");
})


