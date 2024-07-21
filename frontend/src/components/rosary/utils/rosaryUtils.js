// src/utils/rosaryUtils.js
import { deleteRosaries, getUserRosaries, createRosary } from '../../../api/rosary';
import { createIntention, updateIntention } from '../../../api/intentions';
import { fetchIntentions } from './fetchFunctions';
export const increaseFontSize = (currentSize, MAX_FONT_SIZE) => {
    return Math.min(currentSize + 1, MAX_FONT_SIZE);
};

export const decreaseFontSize = (currentSize, MIN_FONT_SIZE) => {
    return Math.max(currentSize - 1, MIN_FONT_SIZE);
};


export const handleDelete = async (selectedIds, token, userId, currentPage, rosariesPerPage, setRosaries, setTotalRosaries, setRefreshTrigger, setError) => {
    if (window.confirm('Are you sure you want to delete the selected rosaries?')) {
        try {
            const response = await deleteRosaries(selectedIds, token);
            if (response) {
                console.log('Deleted successfully');
                setRefreshTrigger(prev => prev + 1);
                const data = await getUserRosaries(userId, token, currentPage, rosariesPerPage);
                setRosaries(data.rosaries);
                setTotalRosaries(data.total);
            }
        } catch (error) {
            console.error('Delete operation failed:', error);
            setError(error.message);
        }
    }
};

export const columns = [
    { header: 'Date', accessor: 'createdAt', isDate: true },
    { header: 'Mystery', accessor: 'm' },
    // Add other columns as needed
];

export const handleEmailToggle = () => {
    // Future email functionality logic
};

export const toggleVirtualRosary = (setShowVirtualRosary) => {
    setShowVirtualRosary(prev => !prev);
};

export const handleIntentionCheckboxChange = (intentionId, setSelectedIntentions) => {
    setSelectedIntentions(prevSelected => {
        if (prevSelected.includes(intentionId)) {
            return prevSelected.filter(id => id !== intentionId);
        } else {
            return [...prevSelected, intentionId];
        }
    });
};

export const handleDeleteIntention = async (intentionId, token, fetchIntentions) => {
    // Implement delete intention logic
};

export const handlePrayRosary = async (userId, selectedMystery, selectedIntentions, token, toggleModal, setSelectedIntentions, setSelectedMystery, setIsSubmitting, setCount) => {
    setIsSubmitting(true);
    const rosaryData = {
        userId,
        mystery: selectedMystery,
        intentions: selectedIntentions,
    };

    try {
        await createRosary(rosaryData.userId, rosaryData.mystery, rosaryData.intentions, rosaryData.recording, token);
        setSelectedIntentions([]);
        setSelectedMystery('Luminous');
        toggleModal('rosary');
    } catch (error) {
        console.error('Error creating rosary:', error);
    }

    setIsSubmitting(false);
    setCount(prevCount => prevCount + 1);
};

export const addPrayerIntention = (setIsAddingIntention) => {
    setIsAddingIntention(true);
};

export const handleNewIntentionSubmit = async (e, newIntention, userId, token, setPrayerIntentions, setNewIntention, setIsAddingIntention) => {
    e.preventDefault();
    if (!newIntention.trim()) return;

    try {
        await createIntention({ user: userId, content: newIntention, type: 'Rosary' }, token);
        await fetchIntentions(userId, token, setPrayerIntentions);
        setNewIntention('');
        setIsAddingIntention(false);
    } catch (error) {
        console.error('Error adding new intention:', error);
    }
};

export const handleMysteryClick = (mysteryName, mysteriesDetails, setSelectedMystery, setSelectedMysteryDetails, setSelectedMysteryIcon, mysteries, toggleVirtualRosary) => {
    setSelectedMystery(mysteryName);
    setSelectedMysteryDetails(mysteriesDetails[mysteryName]);
    const selectedMystery = mysteries.find(mystery => mystery.name === mysteryName);
    setSelectedMysteryIcon(selectedMystery ? selectedMystery.image : null);
    toggleVirtualRosary();
};

export const handleEditClick = (intentionId, content, setEditingIntentionId, setEditContent) => {
    setEditingIntentionId(intentionId);
    setEditContent(content);
};

export const handleUpdateIntention = async (e, editingIntentionId, editContent, token, fetchIntentions, setEditingIntentionId) => {
    e.preventDefault();
    try {
        await updateIntention(editingIntentionId, { content: editContent }, token);
        fetchIntentions();
        setEditingIntentionId(null);
    } catch (error) {
        console.error('Error updating intention:', error);
    }
};

export const handleRowSelect = (selectedRows) => {
    // Implement what should happen when rows are selected
    // console.log(selectedRows);
};

export const formatDataForTable = (rosaries) => {
    return rosaries.map(rosary => {
        return {
            createdAt: rosary.createdAt,
            m: rosary.m,
            _id: rosary._id
        };
    });
};
