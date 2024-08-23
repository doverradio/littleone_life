// src/api/email.js

// Base URL for API requests
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Function to send email notifications
export const sendNotificationEmail = async (emailData, token) => {
  // console.log(`Begin sendNotificationEmail! emailData: `, emailData)
  // console.log(`Begin sendNotificationEmail! token: `, token)
  try {
    const response = await fetch(`${API_BASE_URL}/email/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error(`Error sending email: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
