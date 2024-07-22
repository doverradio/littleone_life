import { deleteRosaries, getUserRosaries, createRosary } from '../../../api/rosary';
import { createIntention, deleteIntention, updateIntention } from '../../../api/intentions';
import { fetchIntentions } from './fetchFunctions';
const API = process.env.REACT_APP_API || 'https://www.littleone.life/api'; // Your backend API URL

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

export const handlePrayRosary = async (userId, selectedMystery, selectedIntentions, token, toggleModal, setSelectedIntentions, setSelectedMystery, setIsSubmitting, setCount) => {
    setIsSubmitting(true);
    const rosaryData = {
        userId,
        mystery: selectedMystery,
        intentions: selectedIntentions,
        recording: "" // Assuming recording is part of the payload, else remove this
    };

    try {
        await createRosary(rosaryData.userId, rosaryData.mystery, rosaryData.intentions, token);
        setSelectedIntentions([]);
        setSelectedMystery('Luminous');
        toggleModal('rosary');
    } catch (error) {
        console.error('Error creating rosary:', error);
    } finally {
        setIsSubmitting(false);
        setCount(prevCount => prevCount + 1);
    }
};


export const addPrayerIntention = async (intention, userId, token, setPrayerIntentions, setNewIntention, setIsAddingIntention) => {
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


export const handleMysteryClick = (mysteryName, mysteriesDetails, setSelectedMystery, setSelectedMysteryDetails, setSelectedMysteryIcon, mysteries, setShowVirtualRosary) => {
    setSelectedMystery(mysteryName);
    setSelectedMysteryDetails(mysteriesDetails[mysteryName]);
    const selectedMystery = mysteries.find(mystery => mystery.name === mysteryName);
    setSelectedMysteryIcon(selectedMystery ? selectedMystery.image : null);
    setShowVirtualRosary(prev => !prev); // Ensure this is a function
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
