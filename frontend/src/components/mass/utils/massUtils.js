// src/components/mass/utils/massUtils.js

import { createIntention, deleteIntention, updateIntention } from '../../../api/intentions';
import { fetchIntentions } from './fetchFunctions';

export const handleIntentionCheckboxChange = (intentionId, setSelectedIntentions) => {
    setSelectedIntentions(prevSelected => {
        if (prevSelected.includes(intentionId)) {
            return prevSelected.filter(id => id !== intentionId);
        } else {
            return [...prevSelected, intentionId];
        }
    });
};

export const handleDeleteIntention = async (id, token, fetchIntentions, userId, setPrayerIntentions) => {
    if (window.confirm('Are you sure you want to delete this intention?')) {
        try {
            await deleteIntention(id, token);
            fetchIntentions(userId, token, setPrayerIntentions);
        } catch (error) {
            console.error('Error deleting intention:', error);
        }
    }
};

export const handleAddPrayerIntention = async (intention, userId, token, setPrayerIntentions, setNewIntention, setIsAddingIntention) => {
    try {
        await createIntention(intention, userId, token);
        await fetchIntentions(userId, token, setPrayerIntentions);
        setNewIntention('');
        setIsAddingIntention(false);
    } catch (error) {
        console.error('Error adding prayer intention:', error);
    }
};

export const handleNewIntentionSubmit = (e, newIntention, userId, token, setPrayerIntentions, setNewIntention, setIsAddingIntention, type) => {
    e.preventDefault();
    if (newIntention.length > 100) {
        alert('Prayer intention cannot exceed 100 characters');
        return;
    }
    createIntention({ content: newIntention, type }, userId, token)
        .then(() => {
            fetchIntentions(userId, token, setPrayerIntentions);
            setNewIntention('');
            setIsAddingIntention(false);
        })
        .catch(err => console.error(err));
};

export const handleEditClick = (id, content, setEditingIntentionId, setEditContent) => {
    setEditingIntentionId(id);
    setEditContent(content);
};

export const handleSaveClick = async (id, updatedContent, token, fetchIntentions, userId, setPrayerIntentions, setEditingIntentionId, setEditContent) => {
    if (updatedContent.length > 100) {
        alert('Prayer intention cannot exceed 100 characters');
        return;
    }
    try {
        await updateIntention(id, { content: updatedContent }, token);
        fetchIntentions(userId, token, setPrayerIntentions);
        setEditingIntentionId(null);
        setEditContent('');
    } catch (error) {
        console.error("Error updating intention:", error);
    }
};

export const handleCancelClick = (setEditingIntentionId, setEditContent) => {
    setEditingIntentionId(null);
    setEditContent('');
};

export const handleUpdateIntention = async (id, updatedContent, token, fetchIntentions, userId, setPrayerIntentions, setEditingIntentionId, setEditContent) => {
    try {
        await updateIntention(id, { content: updatedContent }, token);
        fetchIntentions(userId, token, setPrayerIntentions);
        setEditingIntentionId(null);
        setEditContent('');
    } catch (error) {
        console.error("Error updating intention: ", error);
    }
};
