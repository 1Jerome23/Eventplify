$(document).ready(function() {
  // User registration logic
  $('#signup_form').on('submit', function(event) {
    event.preventDefault();
    
    // Fetch input values
    const username = $('#username').val();
    const password = $('#password').val();
    const confirmPassword = $('#confirmpassword').val();
    const email = $('#email').val();
    
    // Debug statements to check input values
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('Email:', email);
    
    // Email validation
    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|edu\.ph)$/.test(email)) {
      alert('Invalid email format.');
      return;
    }
    
    // Password validation
    if (!password || password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }
    
    if (!/[A-Z]/.test(password)) {
      alert('Password must contain at least one uppercase letter.');
      return;
    }
    
    if (!/[a-z]/.test(password)) {
      alert('Password must contain at least one lowercase letter.');
      return;
    }
    
    if (!/[0-9]/.test(password)) {
      alert('Password must contain at least one number.');
      return;
    }
    
    if (!/[!@#$%^&*]/.test(password)) {
      alert('Password must contain at least one special character (!@#$%^&*).');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      console.log('Password:', password);
      console.log('Confirm Password:', confirmPassword);
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
