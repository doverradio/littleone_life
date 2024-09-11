// src/components/confession/helpers/confessionHelpers.js

import { addChurchToUser, removeChurchFromUser } from "../../../api/church";

/**
 * Add a church to the options for selecting churches during confession
 * @param {string} userId - The user's ID
 * @param {object} church - The church object to add
 * @param {function} setUserChurches - The state setter for user churches
 * @param {function} setNearbyChurches - The state setter for nearby churches
 */
export const addChurchToConfessionOptions = async (userId, church, setUserChurches, setNearbyChurches) => {
    try {
        const updatedChurch = await addChurchToUser(userId, church);
        console.log('Add Church Response:', updatedChurch); // Log the response
        if (updatedChurch) {
            setUserChurches(prevUserChurches => [...prevUserChurches, updatedChurch]);
            setNearbyChurches(prevNearbyChurches => prevNearbyChurches.filter(nearby => nearby.name !== church.name || nearby.address !== church.address));
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error adding church to user:', error);
        return false;
    }
};


/**
 * Remove a church from the options for selecting churches during confession
 * @param {string} userId - The user's ID
 * @param {object} church - The church object to remove
 * @param {function} setUserChurches - The state setter for user churches
 * @param {function} setNearbyChurches - The state setter for nearby churches
 */
export const removeChurchFromConfessionOptions = async (userId, church, setUserChurches, setNearbyChurches) => {
    try {
        const result = await removeChurchFromUser(userId, church);
        console.log('Remove Church Response:', result); // Log the response
        if (result) {
            setUserChurches(prevUserChurches => prevUserChurches.filter(userChurch => userChurch._id !== church._id));
            setNearbyChurches(prevNearbyChurches => [...prevNearbyChurches, church]);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error removing church from user:', error);
        return false;
    }
};
