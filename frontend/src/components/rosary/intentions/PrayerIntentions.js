import React from 'react';
import { MdOutlineModeEdit, MdDelete } from "react-icons/md";
import { isAuthenticated } from '../../../api/auth';
import { fetchIntentions } from '../utils/fetchFunctions'; // Import fetchIntentions if not already

const PrayerIntentions = ({
    prayerIntentions,
    selectedIntentions,
    handleIntentionCheckboxChange,
    handleEditClick,
    handleDeleteIntention,
    editingIntentionId,
    editContent,
    setEditContent,
    handleUpdateIntention,
    setEditingIntentionId, 
    setSelectedIntentions,
    setPrayerIntentions // Ensure this prop is passed to update state
}) => {

    const {
        user: { _id },
        token
    } = isAuthenticated();

    const userId = _id;

    return (
        <>
            <h2>Prayer Intentions</h2>
            {prayerIntentions.length > 0 ? (
                <ul className="prayer-intentions-list">
                    {prayerIntentions.map(intention => (
                        <li key={intention._id} className="prayer-intention-item d-flex align-items-center justify-content-center">
                            <input 
                                type="checkbox" 
                                checked={selectedIntentions.includes(intention._id)} 
                                onChange={() => handleIntentionCheckboxChange(intention._id, setSelectedIntentions)} 
                                className="mr-2"
                            />
                            <p className="m-0 flex-grow-1 text-center">{intention.content}</p>
                            <MdOutlineModeEdit onClick={() => handleEditClick(intention._id, intention.content, setEditingIntentionId, setEditContent)} className="ml-2" />
                            <MdDelete onClick={() => handleDeleteIntention(intention._id, token, fetchIntentions, userId, setPrayerIntentions)} className="ml-2" />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No intentions added yet.</p>
            )}
        </>
    );
};

export default PrayerIntentions;
