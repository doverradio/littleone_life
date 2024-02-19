const API = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'https://www.littleone.life/api';

// Function to create a new Prayer
export const createPrayer = async (userId, prayerData, token) => {
  try {
    const response = await fetch(`${API}/prayer/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userId, ...prayerData })
    });
    return await response.json();
  } catch (error) {
    console.error('Error in createPrayer:', error);
    throw error;
  }
};

// Function to retrieve Prayer count for a user
export const getUserPrayerCount = async (userId, token) => {
  try {
    const response = await fetch(`${API}/prayer/count`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userId })
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching prayer count:', error);
    throw error;
  }
};

// Function to retrieve a single Prayer by ID
export const getPrayer = async (prayerId, token) => {
  try {
    const response = await fetch(`${API}/prayer/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ prayerId })
    });
    return await response.json();
  } catch (error) {
    console.error('Error in getPrayer:', error);
    throw error;
  }
};

// Function to retrieve all Prayers for a user
export const getAllPrayers = async (userId, token) => {
  try {
    const response = await fetch(`${API}/prayers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userId })
    });
    return await response.json();
  } catch (error) {
    console.error('Error in getAllPrayers:', error);
    throw error;
  }
};

// Function to update a Prayer
export const updatePrayer = async (prayerId, updates, token) => {
  try {
    const response = await fetch(`${API}/prayer/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ prayerId, ...updates })
    });
    return await response.json();
  } catch (error) {
    console.error('Error in updatePrayer:', error);
    throw error;
  }
};

// Function to delete a Prayer
export const deletePrayer = async (prayerId, token) => {
  try {
    const response = await fetch(`${API}/prayer/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ prayerId })
    });
    return await response.json();
  } catch (error) {
    console.error('Error in deletePrayer:', error);
    throw error;
  }
};

// For Charts
export const getTypeCount = async (userId, token) => {
  try {
    const response = await fetch(`${API}/prayer/prayer-count`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userId })
    });
    return await response.json();
  } catch (error) {
    console.error('Error in getTypeCount:', error);
    throw error;
  }
};

// For Data Table
export const getUserPrayers = async (userId, token, page = 1, limit = 30) => {
  try {
    const response = await fetch(`${API}/prayer/user-prayers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userId, page, limit })
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching user prayers:', error);
    throw error;
  }
};

export const deletePrayers = async (prayerIds, token) => {
  try {
    const response = await fetch(`${API}/prayer/delete-prayers`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ rowsToDelete: prayerIds })
    });

    return await response.json();
  } catch (error) {
    console.error('Error deleting prayers:', error);
    throw error;
  }
};
