// src/api/ai.js

const API = process.env.REACT_APP_API || 'https://www.littleone.life/api'; // Your backend API URL

export const interactWithAI = async (userId, interactionType, content, token) => {
    try {
        const response = await fetch(`${API}/ai/interact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the token in the headers
            },
            body: JSON.stringify({ userId, interactionType, content }),
        });

        if (!response.ok) {
            throw new Error('Failed to interact with AI');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error interacting with AI:', error);
        throw error;
    }
};

export const getChatHistory = async (userId, page, token) => {
    try {
        const response = await fetch(`${API}/ai/chat-history?userId=${userId}&page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the token in the headers
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch chat history');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching chat history:', error);
        throw error;
    }
};
