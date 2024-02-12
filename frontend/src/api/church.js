const API = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'https://www.littleone.life/api';

export const createChurch = async (churchData) => {
    const response = await fetch(`${API}/church/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(churchData)
    });
    return response.json();
};

export const getAllChurches = async (userId) => {
    const response = await fetch(`${API}/churches`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    });
    return response.json();
};

export const getChurchById = async (churchId) => {
    const response = await fetch(`${API}/church/get`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: churchId })
    });
    return response.json();
};

export const updateChurch = async (churchId, updatedData) => {
    const response = await fetch(`${API}/church/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: churchId, ...updatedData })
    });
    return response.json();
};

export const deleteChurch = async (churchId) => {
    const response = await fetch(`${API}/church/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: churchId })
    });
    return response.json();
};
