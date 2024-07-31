import { countMassesByUser, getAllMassAttendances, createMassAttendance } from '../../../api/massAttendance';
import { getAllIntentions } from '../../../api/intentions';
import { getAllChurches } from '../../../api/church';
const API = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'https://www.littleone.life/api';

export const fetchMassData = async (userId, token, setCount, setMassAttendances, setPieChartData, setUserChurches, setPrayerIntentions, setError) => {
    await fetchMassCount(userId, token, setCount);
    await fetchMassAttendances(userId, token, setMassAttendances, setPieChartData, setError);
    await fetchUserChurches(userId, token, setUserChurches);
    await fetchIntentions(userId, token, setPrayerIntentions, setError);
};

const fetchMassCount = async (userId, token, setCount) => {
    const response = await countMassesByUser(userId, token);
    if (response) {
        setCount(response.massAttendanceCount);
    }
};

const fetchMassAttendances = async (userId, token, setMassAttendances, setPieChartData, setError) => {
    try {
        const data = await getAllMassAttendances(userId, token);
        if (data.error) {
            setError(data.error);
        } else {
            setMassAttendances(data);
            const pieChartData = processMassAttendanceDataForPieChart(data);
            setPieChartData(pieChartData);
        }
    } catch (err) {
        setError('Error fetching data');
    }
};

const processMassAttendanceDataForPieChart = (massAttendances) => {
    const countByMassTime = {};

    massAttendances.forEach(mass => {
        const { massTime } = mass;
        if (countByMassTime[massTime]) {
            countByMassTime[massTime] += 1;
        } else {
            countByMassTime[massTime] = 1;
        }
    });

    return Object.keys(countByMassTime).map(massTime => {
        return {
            label: massTime,
            value: countByMassTime[massTime]
        };
    });
};

const fetchUserChurches = async (userId, token, setUserChurches) => {
    try {
        const response = await fetch(`${API}/churches`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId })
        });

        const data = await response.json();
        if (data.error) {
            console.error(data.error);
        } else {
            setUserChurches(data);
        }
    } catch (error) {
        console.error('Error fetching user churches:', error);
    }
};


const fetchIntentions = async (userId, token, setPrayerIntentions, setError) => {
    try {
        const response = await getAllIntentions(userId, "Mass", token);
        if (response) {
            setPrayerIntentions(response);
        } else {
            setPrayerIntentions([]);
        }
    } catch (error) {
        console.error("Error fetching intentions: ", error);
        setPrayerIntentions([]);
    }
};

export const handleMassData = async (userId, selectedChurch, selectedMassTime, selectedIntentions, specialIntentions, token, toggleModal, setCount, setSelectedIntentions, setSelectedChurch, setSelectedMassTime) => {
    const massData = {
        user: userId,
        church: selectedChurch,
        massTime: selectedMassTime,
        i: selectedIntentions,
        specialIntentions
    };

    try {
        await createMassAttendance(massData, token);
        setSelectedIntentions([]);
        setSelectedChurch(null);
        setSelectedMassTime('');
        toggleModal('mass');
    } catch (error) {
        console.error('Error creating mass attendance:', error);
    }

    setCount(prevCount => prevCount + 1);
};

export const addChurchToUser = async (userId, church, token) => {
    try {
        const response = await fetch(`${API}/churches/addToUser`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId, churches: [church] }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to add church to user');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding church to user:', error);
        throw error;
    }
};

