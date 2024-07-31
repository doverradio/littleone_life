const API = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'http://localhost:8000/api';

export const fetchNearbyChurches = async (lat, lng, distance, token) => {
    const response = await fetch(`${API}/churches`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ latitude: lat, longitude: lng, radius: distance })
    });
    return response.json();
};

export const saveChurches = async (churches, token) => {
    const response = await fetch(`${API}/churches`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(churches)
    });
    return response.json();
};
