$(document).ready(function() {
    // Function to handle form submission
    $('#add_event_form').on('submit', function(event) {
      event.preventDefault(); // Prevent default form submission
  
      // Fetch input values from the form
      const eventName = $('#eventname').val();
      const eventDescription = $('#eventdescription').val();
      const eventDate = $('#eventdate').val();
      const startTime = $('#starttime').val();
      const endTime = $('#endtime').val();
      const eventLocation = $('#eventlocation').val();
  
      // Prepare data to send in the POST request
      const eventData = {
        name: eventName,
        description: eventDescription,
        date: eventDate,
        startTime: startTime,
        endTime: endTime,
        location: eventLocation
      };
  
      // Send a POST request to the server
      $.ajax({
        url: '/api/events/add', // Endpoint where your backend route is defined
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(eventData),
        success: function(response) {
          alert('Event added successfully!');
          // Optionally, redirect to another page after successful addition
          window.location.href = '/events.html'; // Redirect to events page
        },
        error: function(xhr, status, error) {
          console.error('Error adding event:', error);
          alert('An error occurred while adding the event. Please try again.');
        }
      });
    });
  });
  