// Import required modules
const express = require('express'); // Express.js for creating the server
const nodemailer = require('nodemailer'); // Nodemailer for sending emails
const cors = require('cors'); // CORS middleware to allow cross-origin requests
require('dotenv').config(); // Load environment variables from .env file

// Initialize Express app
const app = express();

// Define the port for the server to listen on
// Use the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

// Nodemailer Configuration
// Create a transporter object using Gmail as the email service
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail as the email service
  auth: {
    user: process.env.EMAIL, // Your Gmail address (from .env file)
    pass: process.env.PASSWORD, // Your Gmail app password (from .env file)
  },
});

// Email Endpoint
// Handle POST requests to /send-email
app.post('/send-email', (req, res) => {
  // Extract name, email, and message from the request body
  const { name, email, message } = req.body;

  // Configure the email options
  const mailOptions = {
    from: email, // Sender's email address
    to: process.env.EMAIL, // Your email address (from .env file)
    replyTo: email, // The user's email address for replies
    subject: `New Message from ${name}`, // Email subject
    text: message, // Email body
  };

  // Send the email using the transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // Handle errors
      console.error(error); // Log the error to the console
      res.status(500).send('Error sending email'); // Send a 500 error response
    } else {
      // Log success and send a 200 response
      console.log('Email sent: ' + info.response); // Log the success message
      res.status(200).send('Email sent successfully'); // Send a success response
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log the server's running status
});