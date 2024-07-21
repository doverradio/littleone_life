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

export const handleDeleteIntention = async (intentionId, token, fetchIntentions, userId) => {
    if (window.confirm('Are you sure you want to delete this intention?')) {
        try {
            await deleteIntention(intentionId, token);
            await fetchIntentions(userId, token);
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

export const handleMysteryClick = (mysteryName, mysteriesDetails, setSelectedMystery, setSelectedMysteryDetails, setSelectedMysteryIcon, mysteries, setShowVirtualRosary) => {
    setSelectedMystery(mysteryName);
    setSelectedMysteryDetails(mysteriesDetails[mysteryName]);
    const selectedMystery = mysteries.find(mystery => mystery.name === mysteryName);
    setSelectedMysteryIcon(selectedMystery ? selectedMystery.image : null);
    setShowVirtualRosary(prev => !prev); // Ensure this is a function
};



export const handleEditClick = (intentionId, content, setEditingIntentionId, setEditContent) => {
    setEditingIntentionId(intentionId);
    setEditContent(content);
};

export const handleSaveClick = async (intentionId, content, token, fetchIntentions, userId, setEditingIntentionId, setEditContent, setPrayerIntentions) => {
    try {
        const response = await fetch(`${API}/intention/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ _id: intentionId, content })
        });

        if (!response.ok) {
            throw new Error('Failed to update intention');
        }

        const data = await response.json();
        await fetchIntentions(userId, token, setPrayerIntentions);
        setEditingIntentionId(null);
        setEditContent('');
    } catch (error) {
        console.error('Error updating intention:', error);
    }
};

export const handleCancelClick = (setEditingIntentionId, setEditContent) => {
    setEditingIntentionId(null);
    setEditContent('');
};

export const handleUpdateIntention = async (e, editingIntentionId, editContent, token, fetchIntentions, userId, setEditingIntentionId) => {
    e.preventDefault();
    try {
        await updateIntention(editingIntentionId, { content: editContent }, token);
        await fetchIntentions(userId, token);
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
