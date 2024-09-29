const API = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'https://www.littleone.life/api';

export const createMassAttendance = async (massAttendanceData) => {
    const response = await fetch(`${API}/mass-attendance/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(massAttendanceData),
        credentials: 'include'
    });
    return response.json();
};

export const countMassesByUser = async (userId) => {
    const response = await fetch(`${API}/mass-attendance/count`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId }),
        credentials: 'include'
    });
    return response.json();
};

export const getMassAttendanceByUser = async (userId, massId) => {
    const response = await fetch(`${API}/mass-attendance`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, massId }),
        credentials: 'include'
    });
    return response.json();
};

export const getAllMassAttendances = async (userId) => {
    const response = await fetch(`${API}/mass-attendances`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId }),
        credentials: 'include'
    });
    return response.json();
};

export const updateMassAttendance = async (massId, updatedData) => {
    const response = await fetch(`${API}/mass-attendance/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ massId, ...updatedData }),
        credentials: 'include'
    });
    return response.json();
};

export const deleteMassAttendance = async (massId, userId) => {
    const response = await fetch(`${API}/mass-attendance/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ massId, userId }),
        credentials: 'include'
    });
    return response.json();
};

export const getMassAttendances = async (userId, page, limit, token) => {
    try {
        const response = await fetch(`${API}/mass/user-masses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId, page, limit })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data; // { masses: userMasses, total }
    } catch (error) {
        console.error('Error fetching user masses:', error);
        // Handle errors as appropriate for your application
    }
};

export const deleteMassAttendances = async (massAttendanceIds, token) => {
    try {
        const response = await fetch(`${API}/mass/delete-masses`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ rowsToDelete: massAttendanceIds })
        });

        return await response.json();
    } catch (error) {
        console.error('Error deleting mass attendances:', error);
        throw error;
    }
};
