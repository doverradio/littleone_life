const API = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'https://www.littleone.life/api';
const log = console.log;

export const createMassAttendance = async (massAttendanceData, token) => {
    const response = await fetch(`${API}/mass-attendance/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(massAttendanceData)
    });
    return response.json();
};

export const countMassesByUser = async (userId, token) => {
    const response = await fetch(`${API}/mass-attendance/count`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId })
    });
    return response.json();
};

export const getMassAttendanceByUser = async (userId, massId, token) => {
    const response = await fetch(`${API}/mass-attendance`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, massId })
    });
    return response.json();
};

export const getAllMassAttendances = async (userId, token) => {
    const response = await fetch(`${API}/mass-attendances`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId })
    });
    return response.json();
};

export const updateMassAttendance = async (massId, updatedData, token) => {
    const response = await fetch(`${API}/mass-attendance/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ massId, ...updatedData })
    });
    return response.json();
};

export const deleteMassAttendance = async (massId, token) => {
    const response = await fetch(`${API}/mass-attendance/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ massId })
    });
    return response.json();
};
