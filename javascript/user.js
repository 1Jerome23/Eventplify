$(document).ready(function() {
    // User registration logic
    $('#signup_form').on('submit', function(event) {
      event.preventDefault();
      const username = $('#signup_username').val();
      const password = $('#signup_password').val();
  
      // Send a POST request to the server for registration
      fetch('/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
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
            window.location.href = 'plan.html'; // Redirect to plan.html after successful login
          } else {
            alert('Invalid login credentials');
          }
        })
        .catch(error => {
          console.log(error);
          alert('An error occurred during login');
        });
    });
    
    $('.tab a').on('click', async function(e) {
      e.preventDefault();
      const target = $(this).attr('href');
  
      try {
        // Check if the user is authenticated
        const response = await fetch('/user/is-authenticated');
        const data = await response.json();
        
        if (target === '#plan' && !data.authenticated) {
          alert('Please log in or sign up to access the Plan tab.');
        } else {
          $('.tab.active').removeClass('active');
          $(this).parent().addClass('active');
  
          $('.tab-content > div').hide();
          $(target).fadeIn(600);
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while checking user authentication');
      }
    });
  
  
    $('.plan').on('click', function(event) {
      event.preventDefault();
      redirectToPlanPage();
    });
      
    async function redirectToPlanPage() {
      const response = await fetch('/user/is-authenticated');
      const data = await response.json();
      if (data.authenticated) {
        window.location.href = 'plan.html';
  
      } else {
        alert('Please register and log in to access the task page.');
      }
    }
  
  
  });