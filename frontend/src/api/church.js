const API = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'https://www.littleone.life/api';

export const createChurch = async (churchData) => {
    const response = await fetch(`${API}/church/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(churchData),
        credentials: 'include'
    });
    return response.json();
};

export const getAllChurches = async (userId) => {
    const response = await fetch(`${API}/churches`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId }),
        credentials: 'include'
    });
    return response.json();
};

export const getChurchById = async (churchId) => {
    const response = await fetch(`${API}/church/get`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: churchId }),
        credentials: 'include'
    });
    return response.json();
};

export const updateChurch = async (churchId, updatedData) => {
    const response = await fetch(`${API}/church/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: churchId, ...updatedData }),
        credentials: 'include'
    });
    return response.json();
};

export const deleteChurch = async (churchId) => {
    const response = await fetch(`${API}/church/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: churchId }),
        credentials: 'include'
    });
    return response.json();
};

export const addChurchesToUser = async (userId, churches) => {
    const response = await fetch(`${API}/churches/addToUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, churches }),
        credentials: 'include'
    });
    return response.json();
};

export const getChurchesByZipCode = async (zipCode) => {
    const response = await fetch(`${API}/churches/by-zip`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ zipCode }),
        credentials: 'include'
    });
    return response.json();
};

export const addUserToChurch = async (userId, churchId) => {
    try {
        const response = await fetch(`${API}/church/add-user`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, churchId }),
            credentials: 'include'
        });
        return await response.json();
    } catch (error) {
        console.error('Error adding user to church:', error);
        return { error: 'Unable to add user to church' };
    }
};
