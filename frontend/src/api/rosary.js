const API = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'https://www.littleone.life/api';

// Function to create a new Rosary
export const createRosary = async (userId, mystery, intentions, recording) => {
  try {
    const response = await fetch(`${API}/rosary/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers like Authorization if needed
      },
      body: JSON.stringify({ userId, mystery, intentions, recording })
    });
    return await response.json();
  } catch (error) {
    console.error('Error in createRosary:', error);
    throw error;
  }
};

export const getRosaryCountByUser = async (userId) => {
  try {
    const response = await fetch(`${API}/rosary/count`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add other headers like Authorization if needed
      },
      body: JSON.stringify({ userId })
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching rosary count:', error);
    throw error;
  }
};


// Function to retrieve a single Rosary by ID
export const getRosary = async (rosaryId) => {
  try {
    const response = await fetch(`${API}/rosary/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers like Authorization if needed
      },
      body: JSON.stringify({ rosaryId })
    });
    return await response.json();
  } catch (error) {
    console.error('Error in getRosary:', error);
    throw error;
  }
};

// Function to retrieve all Rosaries for a user
export const getAllRosaries = async (userId) => {
  try {
    const response = await fetch(`${API}/rosaries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers like Authorization if needed
      },
      body: JSON.stringify({ userId })
    });
    return await response.json();
  } catch (error) {
    console.error('Error in getAllRosaries:', error);
    throw error;
  }
};

// Function to update a Rosary
export const updateRosary = async (rosaryId, updates) => {
  try {
    const response = await fetch(`${API}/rosary/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers like Authorization if needed
      },
      body: JSON.stringify({ rosaryId, ...updates })
    });
    return await response.json();
  } catch (error) {
    console.error('Error in updateRosary:', error);
    throw error;
  }
};

// Function to delete a Rosary
export const deleteRosary = async (rosaryId) => {
  try {
    const response = await fetch(`${API}/rosary/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers like Authorization if needed
      },
      body: JSON.stringify({ rosaryId })
    });
    return await response.json();
  } catch (error) {
    console.error('Error in deleteRosary:', error);
    throw error;
  }
};

// Function to get the history of all Rosaries prayed by a user
export const getRosaryHistory = async (userId) => {
  try {
    const response = await fetch(`${API}/rosary/history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers like Authorization if needed
      },
      body: JSON.stringify({ userId })
    });
    return await response.json();
  } catch (error) {
    console.error('Error in getRosaryHistory:', error);
    throw error;
  }
};
