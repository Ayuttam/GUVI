$(document).ready(function() {
  // Retrieve user data from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');
  const age = urlParams.get('age');
  const dob = urlParams.get('dob');
  const contact = urlParams.get('contact');

  // Display user data on the profile page
  document.getElementById('name').value = name;
  document.getElementById('age').value = age;
  document.getElementById('dob').value = dob;
  document.getElementById('contact').value = contact;

  // Enable editing
  document.getElementById('edit-btn').addEventListener('click', function() {
    enableEditing();
  });

  // Cancel editing and revert back to original data
  document.getElementById('cancel-btn').addEventListener('click', function() {
    disableEditing();
  });

  // Save changes and submit the form
  document.getElementById('save-btn').addEventListener('click', function() {
    disableEditing();
    document.getElementById('profile-form').submit();
  });

  // Function to enable editing
  function enableEditing() {
    document.getElementById('name').readOnly = false;
    document.getElementById('age').readOnly = false;
    document.getElementById('dob').readOnly = false;
    document.getElementById('contact').readOnly = false;

    document.getElementById('edit-btn').style.display = 'none';
    document.getElementById('cancel-btn').style.display = 'inline-block';
    document.getElementById('save-btn').style.display = 'inline-block';
  }

  // Function to disable editing
  function disableEditing() {
    document.getElementById('name').readOnly = true;
    document.getElementById('age').readOnly = true;
    document.getElementById('dob').readOnly = true;
    document.getElementById('contact').readOnly = true;

    document.getElementById('edit-btn').style.display = 'inline-block';
    document.getElementById('cancel-btn').style.display = 'none';
    document.getElementById('save-btn').style.display = 'none';
  }
});
// Save changes and submit the form
document.getElementById('save-btn').addEventListener('click', function(event) {
  disableEditing();
  event.preventDefault(); // Prevent the default form submission

  // Get the form data
  var formData = $('#profile-form').serialize();

  // Send the form data to the server using AJAX
  $.ajax({
    url: $('#profile-form').attr('action'), // Get the form action URL
    type: 'POST',
    data: formData,
    success: function(response) {
      // Handle the server response if needed
      console.log(response);
    },
    error: function(xhr, status, error) {
      // Handle the error if the AJAX request fails
      console.log(error);
    }
  });
});