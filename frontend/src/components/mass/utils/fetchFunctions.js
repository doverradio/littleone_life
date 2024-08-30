// src/components/mass/utils/fetchFunctions.js

import { getAllIntentions } from '../../../api/intentions';

export const fetchIntentions = async (userId, token, setPrayerIntentions) => {
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
