function sendMail(contactForm) {
    emailjs.send("gmail", "website_email", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "user_message": contactForm.message.value
    })
    .then (
        function(response) {
           // Clear the form
           document.getElementById("email_form").reset(); 
           // Display Popup
           $(".email-success").fadeIn(1000).removeClass("d-none");

        }, function(error) {
           $(".email-fail").fadeIn(1000).removeClass("d-none");
        });
        return false;
}