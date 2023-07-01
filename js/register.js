$(document).ready(function() {
  $('#registration-form').submit(function(event) {
    event.preventDefault();

    // Get user details from the form
    var name = $('input[name="name"]').val();
    var age = $('input[name="age"]').val();
    var dob = $('input[name="dob"]').val();
    var contact = $('input[name="contact"]').val();

    // Perform client-side validation
    if (name === "" || age === "" || dob === "" || contact === "") {
      $('#error-message').text("Please fill in all the fields.");
    } else {
      // Submit the form using AJAX
      $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: {
          name: name,
          age: age,
          dob: dob,
          contact: contact
        },
        success: function(response) {
          // Handle the server response if needed
          console.log(response);
          // Redirect to the profile page with the user's details
          var url = "profile.html?name=" + encodeURIComponent(name) + "&age=" + encodeURIComponent(age) + "&dob=" + encodeURIComponent(dob) + "&contact=" + encodeURIComponent(contact);
          window.location.href = url;
        },
        error: function(xhr, status, error) {
          // Handle the error if the AJAX request fails
          console.log(error);
        }
      });
    }
  });
});
