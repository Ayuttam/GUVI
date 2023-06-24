$(document).ready(function() {
  $('#registration-form').submit(function(event) {
    event.preventDefault();

    // Get user details from the form
    const name = $('input[name="name"]').val();
    const age = $('input[name="age"]').val();
    const dob = $('input[name="dob"]').val();
    const contact = $('input[name="contact"]').val();

    // Perform client-side validation
    if (name === "" || age === "" || dob === "" || contact === "") {
      $('#error-message').text("Please fill in all the fields.");
    } else {
      // Submit the form
      this.submit();
    }
  });
});
