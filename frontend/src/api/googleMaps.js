// src/api/googleMaps.js

const API = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'http://localhost:8000/api';

export const fetchNearbyChurches = async (lat, lng, distance, userId) => {
    const response = await fetch(`${API}/churches`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude: lat, longitude: lng, radius: distance, userId }), // Include userId
        credentials: 'include'
    });
    return response.json();
};


export const saveChurches = async (churches, userId) => {
    const response = await fetch(`${API}/churches`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ churches, userId }), // Include userId
        credentials: 'include'
    });
    return response.json();
};

