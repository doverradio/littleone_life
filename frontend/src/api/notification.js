// src/api/notification.js

// Base URL for API requests
const API = process.env.REACT_APP_API || 'http://localhost:8000/api';

// Function to toggle notification
export const toggleNotification = async (userId, component) => {
  try {
    const response = await fetch(`${API}/toggle-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, component }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Error toggling notification: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error toggling notification:', error);
    throw error;
  }
};

// Function to get user notification preferences
export const getUserNotificationPreferences = async (userId) => {
    try {
        const response = await fetch(`${API}/user/notification-preferences`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId }),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Error fetching notification preferences: ${response.statusText}`);
        }

        const data = await response.json();
        return data.preferences;
    } catch (error) {
        console.error('Error fetching notification preferences:', error);
        throw error;
    }
};