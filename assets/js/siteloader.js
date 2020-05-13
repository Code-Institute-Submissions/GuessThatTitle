// Used to load the background image for the game before displaying the site
$(window).load(function() { 


let $images = $('.images-to-load img'); // Store images in a variable 
let loaded_images_count = 0;

$images.load(function(){
    loaded_images_count++;
    if (loaded_images_count == $images.length) {
    $(".loading").addClass("d-none");
    $(".loaded-container").fadeIn('fast').removeClass("d-none");
    }
});


$(".loading").addClass("d-none");
$(".loaded-container").fadeIn('fast').removeClass("d-none");

});