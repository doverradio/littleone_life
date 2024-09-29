const API = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'https://www.littleone.life/api';

// Function to create a new intention
export const createIntention = async (intention, userId) => {
    try {
        const response = await fetch(`${API}/intention`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...intention, user: userId }),
            credentials: 'include'  // Include credentials for session-based auth
        });
        if (!response.ok) {
            throw new Error('Failed to create intention');
        }
        const data = await response.json();
        console.log('createIntention response:', data);
        return data;
    } catch (error) {
        console.error('Error in createIntention:', error);
        throw error;
    }
};

// Function to get all intentions for a user
export const getAllIntentions = async (userId, type) => {
    try {
        const response = await fetch(`${API}/intentions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, type }),
            credentials: 'include'  // Include credentials for session-based auth
        });
        return await response.json();
    } catch (error) {
        console.error('Error in getAllIntentions:', error);
        throw error;
    }
};

// Function to get a single intention by ID
export const getIntentionById = async (intentionId) => {
    try {
        const response = await fetch(`${API}/intention/getintention`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: intentionId }),
            credentials: 'include'  // Include credentials for session-based auth
        });
        return await response.json();
    } catch (error) {
        console.error('Error in getIntentionById:', error);
        throw error;
    }
};

// Function to update an intention
export const updateIntention = async (id, intention, userId) => {
    try {
        const response = await fetch(`${API}/intention/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: id, ...intention, userId }),
            credentials: 'include'
        });
        return await response.json();
    } catch (error) {
        console.error('Error in updateIntention:', error);
        throw error;
    }
};

// Function to delete an intention
export const deleteIntention = async (id, userId) => {
    try {
        const response = await fetch(`${API}/intention/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: id, userId }),
            credentials: 'include'  // Include credentials for session-based auth
        });
        if (!response.ok) {
            throw new Error('Failed to delete intention');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in deleteIntention:', error);
        throw error;
    }
};
