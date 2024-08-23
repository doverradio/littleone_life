// backend/controllers/email.js

const nodemailer = require('nodemailer');
const Email = require('../models/email');

// Transporter for notification@littleone.life
const notificationTransporter = nodemailer.createTransport({
  host: 'mail.littleone.life',
  port: 587,
  secure: false,
  auth: {
    user: 'notification@littleone.life',
    pass: process.env.NOTIFICATION_EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Transporter for noreply@littleone.life
const noreplyTransporter = nodemailer.createTransport({
  host: 'mail.littleone.life',
  port: 587,
  secure: false,
  auth: {
    user: 'noreply@littleone.life',
    pass: process.env.NOREPLY_EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Function to send email
// Function to send email
exports.sendEmail = async (req, res) => {
  console.log(`Begin sendEmail!  req.body: `, req.body);
  console.log('Notification Email Password:', process.env.NOTIFICATION_EMAIL_PASSWORD);
  console.log('Noreply Email Password:', process.env.NOREPLY_EMAIL_PASSWORD);

  const { from = 'notification@littleone.life', to, subject, message, html } = req.body; // Default 'from' address
  const text = message;

  // Generate HTML if not provided
  const htmlContent = html || 
      `<html>
      <body>
          <p>${message}</p>
      </body>
      </html>`
  ;

  // Validate required fields
  if (!from || !to || !subject || (!text && !htmlContent)) {
      return res.status(400).json({ error: 'Missing required email fields' });
  }

  // Select the correct transporter based on the 'from' address
  let transporter;
  if (from === 'notification@littleone.life') {
      transporter = notificationTransporter;
  } else if (from === 'noreply@littleone.life') {
      transporter = noreplyTransporter;
  } else {
      return res.status(400).json({ error: 'Invalid from address' });
  }

  const mailOptions = {
      from,
      to,
      subject,
      text,
      html: htmlContent,
  };

  console.log(`mailOptions: `, mailOptions)
  try {
      // Send email using the appropriate transporter
      const info = await transporter.sendMail(mailOptions);
      // console.log('Email sent: %s', info.messageId);

      // Save the email details to the database
      const email = new Email({ from, to, subject, text, html: htmlContent });
      await email.save();

      res.status(200).json({ message: 'Email sent successfully', info });
  } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
};