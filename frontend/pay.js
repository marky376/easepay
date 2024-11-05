document.addEventListener("DOMContentLoaded", function() {
  const greetingElement = document.getElementById('user-greeting');
  const currentHour = new Date().getHours(); // Get the current hour
  let greetingMessage; // Variable to hold the greeting message

  // Determine greeting based on the time of day
  if (currentHour < 12) {
      greetingMessage = 'Good Morning, Mark!';
  } else if (currentHour < 18) {
      greetingMessage = 'Good Afternoon, Mark!';
  } else {
      greetingMessage = 'Good Evening, Mark!';
  }

  greetingElement.innerHTML = greetingMessage; 
});
