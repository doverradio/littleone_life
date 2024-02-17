// src/api/confessions.js

const API = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'https://www.littleone.life/api';

export const createConfession = async (confessionData, token) => {
    try {
        const response = await fetch(`${API}/confession/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(confessionData)
        });
        return await response.json();
    } catch (error) {
        console.error('Error in createConfession:', error);
        throw error;
    }
};

export const countConfessionsByUser = async (userId, token) => {
    try {
        const response = await fetch(`${API}/confession/count`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId })
        });
        return await response.json();
    } catch (error) {
        console.error('Error in countConfessionsByUser:', error);
        throw error;
    }
};

export const getAllConfessions = async (userId, token) => {
    try {
        const response = await fetch(`${API}/confession/all`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId })
        });
        return await response.json();
    } catch (error) {
        console.error('Error in getAllConfessions:', error);
        throw error;
    }
};

export const getConfessionById = async (confessionId, token) => {
    try {
        const response = await fetch(`${API}/confession/single`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ _id: confessionId })
        });
        return await response.json();
    } catch (error) {
        console.error('Error in getConfessionById:', error);
        throw error;
    }
};

export const updateConfession = async (confessionId, updateData, token) => {
    try {
        const response = await fetch(`${API}/confession/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ _id: confessionId, ...updateData })
        });
        return await response.json();
    } catch (error) {
        console.error('Error in updateConfession:', error);
        throw error;
    }
};

export const deleteConfession = async (confessionId, token) => {
    try {
        const response = await fetch(`${API}/confession/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ _id: confessionId })
        });
        return await response.json();
    } catch (error) {
        console.error('Error in deleteConfession:', error);
        throw error;
    }
};
