// src/api/ai.js

const API = process.env.REACT_APP_API || 'https://www.littleone.life/api'; // Your backend API URL

export const interactWithAI = async (userId, interactionType, content) => {
    try {
        const response = await fetch(`${API}/ai/interact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, interactionType, content }),
            credentials: 'include'
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

export const getChatHistory = async (userId, page) => {
    try {
        const response = await fetch(`${API}/ai/chat-history?userId=${userId}&page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
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
