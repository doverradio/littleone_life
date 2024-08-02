// src/components/confession/helpers/confessionHelpers.js

const API = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'https://www.littleone.life/api';

/**
 * Add a church to the user's list of churches for confessions
 * @param {string} userId - The user's ID
 * @param {object} church - The church object to add
 * @param {string} token - The authentication token
 * @returns {Promise<object>} - The response from the API
 */
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
        return await response.json();
    } catch (error) {
        console.error('Error adding church to user:', error);
        throw error;
    }
};

/**
 * Remove a church from the user's list of churches for confessions
 * @param {string} userId - The user's ID
 * @param {object} church - The church object to remove
 * @param {string} token - The authentication token
 * @returns {Promise<object>} - The response from the API
 */
export const removeChurchFromUser = async (userId, church, token) => {
    try {
        const response = await fetch(`${API}/churches/removeFromUser`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId, churchId: church._id }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error removing church from user:', error);
        throw error;
    }
};

/**
 * Add a church to the options for selecting churches during confession
 * @param {string} userId - The user's ID
 * @param {object} church - The church object to add
 * @param {string} token - The authentication token
 * @param {function} setUserChurches - The state setter for user churches
 * @param {function} setNearbyChurches - The state setter for nearby churches
 */
export const addChurchToConfessionOptions = async (userId, church, token, setUserChurches, setNearbyChurches) => {
    try {
        const updatedChurch = await addChurchToUser(userId, church, token);
        setUserChurches(prevUserChurches => [...prevUserChurches, updatedChurch]);
        setNearbyChurches(prevNearbyChurches => prevNearbyChurches.filter(nearby => nearby.name !== church.name || nearby.address !== church.address));
    } catch (error) {
        console.error('Error adding church to user:', error);
    }
};

/**
 * Remove a church from the options for selecting churches during confession
 * @param {string} userId - The user's ID
 * @param {object} church - The church object to remove
 * @param {string} token - The authentication token
 * @param {function} setUserChurches - The state setter for user churches
 * @param {function} setNearbyChurches - The state setter for nearby churches
 */
export const removeChurchFromConfessionOptions = async (userId, church, token, setUserChurches, setNearbyChurches) => {
    try {
        await removeChurchFromUser(userId, church, token);
        setUserChurches(prevUserChurches => prevUserChurches.filter(userChurch => userChurch._id !== church._id));
        setNearbyChurches(prevNearbyChurches => [...prevNearbyChurches, church]);
    } catch (error) {
        console.error('Error removing church from user:', error);
    }
};
