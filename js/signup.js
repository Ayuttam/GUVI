$(document).ready(function() {
  $('.register-form').submit(function(event) {
    event.preventDefault();
    var form = $(this);
    var name = $('input[name="name"]').val();
    var email = $('input[name="email"]').val();
    var password = $('input[name="password"]').val();
    
    $.ajax({
      type: 'POST',
      url: form.attr('action'),
      data: {
        name: name,
        email: email,
        password: password
      },
      success: function(response) {
        // Handle successful registration
        alert('User registered successfully!');
        form.trigger('reset');
        window.location.href = 'login.html'; // Redirect to login.html
      },
      error: function(xhr, status, error) {
        // Handle registration error
        console.log(xhr.responseText);
        alert('Registration failed. Please try again.');
      }
    });
  });
});
