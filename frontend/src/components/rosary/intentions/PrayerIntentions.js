import React, { useState } from 'react';
import { MdOutlineModeEdit, MdDelete, MdSave, MdCancel } from "react-icons/md";
import { isAuthenticated } from '../../../api/auth';
import { fetchIntentions } from '../utils/fetchFunctions';

const PrayerIntentions = ({
    prayerIntentions,
    selectedIntentions,
    handleIntentionCheckboxChange,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleDeleteIntention,
    editingIntentionId,
    editContent,
    setEditContent,
    setEditingIntentionId,
    setSelectedIntentions
}) => {
    const {
        user: { _id },
        token
    } = isAuthenticated();

    const userId = _id;

    const [charCount, setCharCount] = useState(editContent.length);

    const handleContentChange = (e) => {
        setEditContent(e.target.value);
        setCharCount(e.target.value.length);
    };

    return (
        <div className="prayer-intentions-container">
            <h2>Prayer Intentions</h2>
            {prayerIntentions.length > 0 ? (
                <ul className="prayer-intentions-list">
                    {prayerIntentions.map(intention => (
                        <li key={intention._id} className="prayer-intention-item">
                            <input 
                                type="checkbox" 
                                checked={selectedIntentions.includes(intention._id)} 
                                onChange={() => handleIntentionCheckboxChange(intention._id, setSelectedIntentions)} 
                                className="mr-2"
                            />
                            {editingIntentionId === intention._id ? (
                                <div className="flex-grow-1">
                                    <input
                                        type="text"
                                        value={editContent}
                                        onChange={handleContentChange}
                                        maxLength={100} // Ensure the maxlength attribute is set
                                        className="form-control"
                                    />
                                    <small className={charCount >= 90 ? 'warning' : ''}>
                                        {100 - charCount} characters remaining
                                    </small>
                                </div>
                            ) : (
                                <p className="m-0 flex-grow-1">{intention.content}</p>
                            )}
                            {editingIntentionId === intention._id ? (
                                <>
                                    <MdSave onClick={() => handleSaveClick(intention._id, editContent)} className="ml-2 icon" />
                                    <MdCancel onClick={handleCancelClick} className="ml-2 icon" />
                                </>
                            ) : (
                                <>
                                    <MdOutlineModeEdit onClick={() => handleEditClick(intention._id, intention.content)} className="ml-2 icon" />
                                    <MdDelete onClick={() => handleDeleteIntention(intention._id)} className="ml-2 icon" />
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No intentions added yet.</p>
            )}
        </div>
    );
};

export default PrayerIntentions;
