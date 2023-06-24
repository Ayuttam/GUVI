$(document).ready(function() {
  $('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
  });
  
  $('#login-button').click(function(event) {
    event.preventDefault();
    $('form.login-form').submit();
  });

  $('.register-form').submit(function(event) {
    event.preventDefault();
    var form = $(this);

    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize(),
      success: function(response) {
        alert('User registered successfully!');
        form.trigger('reset');
        $('form.login-form').show();
        form.hide();
      },
      error: function(xhr, status, error) {
        console.log(xhr.responseText);
      }
    });
  });
});
