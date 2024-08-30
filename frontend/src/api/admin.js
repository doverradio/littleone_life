// src/api/admin.js

// Base URL for API requests
const API_BASE_URL = process.env.REACT_APP_API || 'http://localhost:8000/api';

// Function to get all users
export const getUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      credentials: 'include', // Include credentials (cookies) for session management
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Function to update a user's role
export const updateUserRole = async (userId, role) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/role`, {
      method: 'PUT',
      credentials: 'include', // Include credentials (cookies) for session management
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    });

    if (!response.ok) {
      throw new Error(`Error updating user role: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};
