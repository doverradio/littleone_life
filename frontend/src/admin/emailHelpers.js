// src/admin/emailHelpers.js

import { sendNotificationEmail } from '../api/email';

/**
 * Sends a notification email.
 * @param {Object} emailData - The data for the email to be sent.
 */
export const handleSendNotification = async (emailData) => {
  try {
    await sendNotificationEmail(emailData);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};
