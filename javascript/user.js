$(document).ready(function() {
  // User registration logic
  $('#signup_form').on('submit', function(event) {
    event.preventDefault();
    
    // Fetch input values
    const username = $('#username').val();
    const password = $('#password').val();
    const confirmPassword = $('#confirmpassword').val();
    const email = $('#email').val();

  // Email validation
  if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|edu\.ph)$/.test(email)) {
    alert('Invalid email format.');
    return;
  }

  // Password validation
  if (!password || !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{12,36}$/.test(password)) {
    alert('Password must be 12-36 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
    return;
  }

  // Password match validation
  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }
    // If all validations pass, proceed with registration
    fetch('/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password }),
    })
      .then(response => {
        if (response.ok) {
          alert('Registration successful');
        } else {
          response.json().then(data => {
            alert(data.error);
          });
        }
      })
      .catch(error => {
        console.error('Error during registration:', error);
        alert('An error occurred during registration');
      });
  });

  // User login logic
  $('#login_form').on('submit', function (event) {
    event.preventDefault();
    const email = $('#email').val(); // Assuming your input id is 'email'
    const password = $('#password').val(); // Assuming your input id is 'password'
  
    // Validate inputs
    if (!email || !password) {
      alert('Email and password are required');
      return;
    }
  
    // Send a POST request to the server for login
    fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(response => {
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Invalid email or password');
        }
        throw new Error('Login failed');
      }
      return response.json();
    })
    .then(data => {
      alert('Login successful');
    })
    .catch(error => {
      console.error('Error during login:', error.message);
      alert(error.message); // Alert the user with the error message
    });
  });

});
