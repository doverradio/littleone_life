import React from 'react';
import { MdOutlineModeEdit, MdDelete, MdSave, MdCancel } from "react-icons/md";

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
                                <input
                                    type="text"
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    className="form-control"
                                />
                            ) : (
                                <p className="m-0 flex-grow-1">{intention.content}</p>
                            )}
                            {editingIntentionId === intention._id ? (
                                <>
                                    <MdSave onClick={() => handleSaveClick(intention._id, editContent)} className="ml-2" />
                                    <MdCancel onClick={handleCancelClick} className="ml-2" />
                                </>
                            ) : (
                                <>
                                    <MdOutlineModeEdit onClick={() => handleEditClick(intention._id, intention.content, setEditingIntentionId, setEditContent)} className="ml-2" />
                                    <MdDelete onClick={() => handleDeleteIntention(intention._id)} className="ml-2" />
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
