// src/components/mass/helpers/massHelpers.js

import { countMassesByUser, getAllMassAttendances, createMassAttendance } from '../../../api/massAttendance';
import { getAllIntentions } from '../../../api/intentions';
import { createChurch, getAllChurches } from '../../../api/church';
const API = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'https://www.littleone.life/api';

export const fetchMassData = async (userId, setCount, setMassAttendances, setPieChartData, setUserChurches, setPrayerIntentions, setError) => {
    await fetchMassCount(userId, setCount);
    await fetchMassAttendances(userId, setMassAttendances, setPieChartData, setError);
    await fetchUserChurches(userId, setUserChurches);
    await fetchIntentions(userId, setPrayerIntentions, setError);
};

const fetchMassCount = async (userId, setCount) => {
    const response = await countMassesByUser(userId);
    if (response) {
        setCount(response.massAttendanceCount);
    }
};

const fetchMassAttendances = async (userId, setMassAttendances, setPieChartData, setError) => {
    try {
        const data = await getAllMassAttendances(userId);
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

    return Object.keys(countByMassTime).map(massTime => ({
        label: massTime,
        value: countByMassTime[massTime]
    }));
};

const fetchUserChurches = async (userId, setUserChurches) => {
    try {
        const response = await getAllChurches(userId);
        if (response) {
            setUserChurches(response);
        } else {
            console.error("No churches found");
        }
    } catch (error) {
        console.error("Error fetching churches:", error);
    }
};

export const fetchIntentions = async (userId, setPrayerIntentions, setError) => {
    try {
        const response = await getAllIntentions(userId, "Mass");
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

export const handleMassData = async (userId, selectedChurch, selectedMassTime, selectedIntentions, specialIntentions, toggleModal, setCount, setSelectedIntentions, setSelectedChurch, setSelectedMassTime) => {
    const massData = {
        user: userId,
        church: selectedChurch,
        massTime: selectedMassTime,
        i: selectedIntentions,
        specialIntentions
    };

    try {
        await createMassAttendance(massData);
        setSelectedIntentions([]);
        setSelectedChurch(null);
        setSelectedMassTime('');
        toggleModal('mass');
    } catch (error) {
        console.error('Error creating mass attendance:', error);
    }

    setCount(prevCount => prevCount + 1);
};

export const addChurchToUser = async (userId, church) => {
    try {
        const response = await fetch(`${API}/churches/addToUser`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, churches: [church] }),
            credentials: 'include'
        });
        return await response.json();
    } catch (error) {
        console.error('Error adding church to user:', error);
        throw error;
    }
};

export const removeChurchFromUser = async (userId, church) => {
    try {
        const response = await fetch(`${API}/churches/removeFromUser`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, churchId: church._id }),
            credentials: 'include'
        });
        return await response.json();
    } catch (error) {
        console.error('Error removing church from user:', error);
        throw error;
    }
};

export const addChurchToMassOptions = async (userId, church, setUserChurches, setNearbyChurches) => {
    try {
        const updatedChurch = await addChurchToUser(userId, church);
        setUserChurches(prevUserChurches => [...prevUserChurches, updatedChurch]);
        setNearbyChurches(prevNearbyChurches => prevNearbyChurches.filter(nearby => nearby.name !== church.name || nearby.address !== church.address));
    } catch (error) {
        console.error('Error adding church to user:', error);
    }
};

export const removeChurchFromUserOptions = async (userId, church, setUserChurches, setNearbyChurches) => {
    try {
        await removeChurchFromUser(userId, church);
        setUserChurches(prevUserChurches => prevUserChurches.filter(userChurch => userChurch._id !== church._id));
        setNearbyChurches(prevNearbyChurches => [...prevNearbyChurches, church]);
    } catch (error) {
        console.error('Error removing church from user:', error);
    }
};
