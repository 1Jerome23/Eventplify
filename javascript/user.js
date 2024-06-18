$(document).ready(function() {
    // User registration logic
    $('#signup_form').on('submit', function(event) {
      event.preventDefault();
      const username = $('#signup_username').val();
      const password = $('#signup_password').val();
      const email = $('#signup_email').val();
  
      // Send a POST request to the server for registration
      fetch('/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      })
        .then(response => {
          if (response.ok) {
            alert('Registration successful');
            $('.tab.active').removeClass('active');
            $('#login').addClass('active'); // Switch to the "Log In" tab
  
          } else {
            response.json().then(data => {
              alert(data.error);
            });
          }
        })
        .catch(error => {
          console.log(error);
          alert('An error occurred during registration');
        });
    });
    
    // User login logic
    $('#login_form').on('submit', function (event) {
      event.preventDefault();
      const username = $('#login_username').val();
      const password = $('#login_password').val();
      // Send a POST request to the server for login
      fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'Logged in!') {
            alert('Login successful');
            window.location.href = 'home.html'; 
          } else {
            alert('Invalid login credentials');
          }
        })
        .catch(error => {
          console.log(error);
          alert('An error occurred during login');
        });
    });
  
    $('.plan').on('click', function(event) {
      event.preventDefault();
      redirectToHomePage();
    });
      
    async function redirectToHomePage() {
      const response = await fetch('/user/is-authenticated');
      const data = await response.json();
      if (data.authenticated) {
        window.location.href = 'home.html';
  
      } else {
        alert('Please register and log in to access the task page.');
      }
    }
  
  
  });