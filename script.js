// Smooth scrolling for anchor links
// Select all anchor links that start with "#" (internal links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent the default anchor link behavior
      // Smoothly scroll to the target section
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth' // Enable smooth scrolling
      });
    });
  });
  
  // Scroll Animation
  // Select all sections on the page
  const sections = document.querySelectorAll('section');
  
  // Create an IntersectionObserver to detect when sections come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add animation classes when the section is in view
        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
        // Stop observing the section after the animation is applied
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Trigger the animation when 10% of the section is visible
  });
  
  // Observe each section for the scroll animation
  sections.forEach((section) => {
    observer.observe(section);
  });
  
  // Form submission handling
  // Add an event listener to the contact form for the submit event
  document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior
  
    // Show a confirmation message to the user
    alert('Thank you for your message! I will get back to you soon.');
  
    // Get the values from the form inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    // Send the form data to the backend using fetch
    fetch('/send-email', {
      method: 'POST', // Use the POST method
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify({ name, email, message }), // Convert the data to JSON
    })
      .then((response) => response.text()) // Parse the response as text
      .then((data) => {
        alert(data); // Show the success message from the backend
        document.getElementById('contact-form').reset(); // Clear the form
      })
      .catch((error) => {
        console.error('Error:', error); // Log any errors to the console
        alert('Error sending message'); // Show an error message to the user
      });
  });