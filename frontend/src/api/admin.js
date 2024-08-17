// Base URL for API requests
const API_BASE_URL = process.env.REACT_APP_API || 'http://localhost:8000/api';

// Function to get all users
export const getUsers = async (token) => {
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
export const updateUserRole = async (token, userId, role) => {
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/role`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
