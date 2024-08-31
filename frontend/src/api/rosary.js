const API = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'https://www.littleone.life/api';

// Function to create a new Rosary
export const createRosary = async (userId, mystery, intentions) => {
  try {
    const response = await fetch(`${API}/rosary/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, mystery, intentions }),
      credentials: 'include' // Ensure credentials are included
    });

    if (!response.ok) {
      throw new Error('Failed to create rosary');
    }

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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId }),
      credentials: 'include'
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ rosaryId }),
      credentials: 'include'
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId }),
      credentials: 'include'
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ rosaryId, ...updates }),
      credentials: 'include'
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ rosaryId }),
      credentials: 'include'
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId }),
      credentials: 'include'
    });
    return await response.json();
  } catch (error) {
    console.error('Error in getRosaryHistory:', error);
    throw error;
  }
};

// For Charts
export const getMysteryCount = async (userId) => {
  try {
    const response = await fetch(`${API}/rosary/mystery-count`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId }),
      credentials: 'include'
    });
    return await response.json();
  } catch (error) {
    console.error('Error in getMysteryCount:', error);
    throw error;
  }
};

export const getUserRosaries = async (userId, page = 1, limit = 30) => {
  try {
      const response = await fetch(`${API}/rosary/user-rosaries`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId, page, limit }),
          credentials: 'include'
      });
      return await response.json();
  } catch (error) {
      console.error('Error fetching user rosaries:', error);
      throw error;
  }
};

export const deleteRosaries = async (rosaryIds) => {
  try {
      const response = await fetch(`${API}/rosary/delete-rosaries`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ rowsToDelete: rosaryIds }),
          credentials: 'include'
      });

      return await response.json();
  } catch (error) {
      console.error('Error deleting rosaries:', error);
      throw error;
  }
};

export const submitRosary = async (userId, intentions) => {
  const response = await fetch(`${API}/rosary/submit`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, intentions }),
      credentials: 'include'
  });

  if (!response.ok) {
      throw new Error('Failed to submit rosary');
  }

  return await response.json();
};
