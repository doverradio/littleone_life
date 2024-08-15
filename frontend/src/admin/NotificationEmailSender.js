// src/admin/NotificationEmailSender.js

import React, { useState } from 'react';
import { sendNotificationEmail } from '../api/email'; // ensure this path is correct

const NotificationEmailSender = ({ isVisible }) => {
  const [emailData, setEmailData] = useState({
    from: 'notification@littleone.life',
    to: '',
    subject: '',
    text: '',
    html: ''
  });

  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendNotificationEmail(emailData);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <div>
      <h2>Send Notification Email</h2>
      <form onSubmit={handleSubmit}>
        <input name="to" value={emailData.to} onChange={handleChange} placeholder="Recipient Email" required />
        <input name="subject" value={emailData.subject} onChange={handleChange} placeholder="Subject" required />
        <textarea name="text" value={emailData.text} onChange={handleChange} placeholder="Text Content" required />
        <textarea name="html" value={emailData.html} onChange={handleChange} placeholder="HTML Content" required />
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};

export default NotificationEmailSender;
