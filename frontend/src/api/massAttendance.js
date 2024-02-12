const API = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'https://www.littleone.life/api';

export const createMassAttendance = async (massAttendanceData) => {
    const response = await fetch(`${API}/mass-attendance/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(massAttendanceData)
    });
    return response.json();
};

export const countMassesByUser = async (userId) => {
    const response = await fetch(`${API}/mass-attendance/count`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    });
    return response.json();
};

export const getMassAttendanceByUser = async (userId, massId) => {
    const response = await fetch(`${API}/mass-attendance`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, massId })
    });
    return response.json();
};

export const getAllMassAttendances = async (userId) => {
    const response = await fetch(`${API}/mass-attendances`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    });
    return response.json();
};

export const updateMassAttendance = async (massId, updatedData) => {
    const response = await fetch(`${API}/mass-attendance/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ massId, ...updatedData })
    });
    return response.json();
};

export const deleteMassAttendance = async (massId) => {
    const response = await fetch(`${API}/mass-attendance/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ massId })
    });
    return response.json();
};
