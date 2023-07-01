$(document).ready(function() {
  $('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
  });
  
  $('#login-button').click(function(event) {
    event.preventDefault();
    var email = $('input[name="email"]').val();
    var password = $('input[name="password"]').val();
    
    if (email.trim() === '' || password.trim() === '') {
      alert('Please fill in both email and password fields.');
      return;
    }
    
    $.ajax({
      type: 'POST',
      url: './php/login.php',
      data: {
        email: email,
        password: password
      },
      success: function(response) {
        // Handle successful login
        if (response === "success") {
          alert('Login successful!');
          window.location.href = 'register.html'; // Redirect to register.html
        } else {
          console.log(response);
          alert('Login credentials do not match.');
        }
      },
      error: function(xhr, status, error) {
        // Handle login error
        console.log(xhr.responseText);
        alert('Login failed. Please try again.');
      }
    });
  });
});
