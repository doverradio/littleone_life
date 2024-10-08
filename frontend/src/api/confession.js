// src/api/confessions.js

const API = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'https://www.littleone.life/api';

export const createConfession = async (confessionData) => {
    try {
        const response = await fetch(`${API}/confession/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(confessionData),
            credentials: 'include'
        });
        return await response.json();
    } catch (error) {
        console.error('Error in createConfession:', error);
        throw error;
    }
};

export const countConfessionsByUser = async (userId) => {
    try {
        const response = await fetch(`${API}/confession/count`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
      credentials: 'include'
            },
            body: JSON.stringify({ userId })
        });
        return await response.json();
    } catch (error) {
        console.error('Error in countConfessionsByUser:', error);
        throw error;
    }
};

export const getAllConfessions = async (userId) => {
    try {
        const response = await fetch(`${API}/confession/all`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include'
            },
            body: JSON.stringify({ userId })
        });
        return await response.json();
    } catch (error) {
        console.error('Error in getAllConfessions:', error);
        throw error;
    }
};

export const getConfessionById = async (confessionId) => {
    try {
        const response = await fetch(`${API}/confession/single`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include'
            },
            body: JSON.stringify({ _id: confessionId })
        });
        return await response.json();
    } catch (error) {
        console.error('Error in getConfessionById:', error);
        throw error;
    }
};

export const updateConfession = async (confessionId, updateData) => {
    try {
        const response = await fetch(`${API}/confession/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include'
            },
            body: JSON.stringify({ _id: confessionId, ...updateData })
        });
        return await response.json();
    } catch (error) {
        console.error('Error in updateConfession:', error);
        throw error;
    }
};

export const deleteConfession = async (confessionId) => {
    try {
        const response = await fetch(`${API}/confession/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include'
            },
            body: JSON.stringify({ _id: confessionId })
        });
        return await response.json();
    } catch (error) {
        console.error('Error in deleteConfession:', error);
        throw error;
    }
};

export const getUserConfessions = async (userId, page, limit) => {
    try {
        const response = await fetch(`${API}/confession/user-confessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include'
            },
            body: JSON.stringify({ userId, page, limit })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data; // { confessions: userConfessions, total }
    } catch (error) {
        console.error('Error fetching user confessions:', error);
        // Handle errors as appropriate for your application
    }
};

export const deleteConfessions = async (confessionIds) => {
    try {
        const response = await fetch(`${API}/confession/delete-confessions`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include'
            },
            body: JSON.stringify({ rowsToDelete: confessionIds })
        });

        return await response.json();
    } catch (error) {
        console.error('Error deleting confessions:', error);
        throw error;
    }
};
