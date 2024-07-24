// src/components/mass/components/PrayerIntentions.js
import React from 'react';

const PrayerIntentions = ({
    prayerIntentions,
    editingIntentionId,
    handleUpdateIntention,
    setEditContent,
    setEditingIntentionId,
    handleDeleteIntention,
    selectedIntentions,
    handleIntentionCheckboxChange,
    handleEditClick,
    isAddingIntention,
    handleNewIntentionSubmit,
    newIntention,
    setNewIntention,
    setIsAddingIntention,
    editContent
}) => (
    <div className="prayer-intentions">
        <h3>Prayer Intentions</h3>
        <button 
            className="btn btn-outline-secondary mb-3" 
            onClick={() => setIsAddingIntention(true)}
        >
            Add New Intention
        </button>
        {isAddingIntention && (
            <form onSubmit={handleNewIntentionSubmit}>
                <div className="form-group">
                    <label htmlFor="newIntention">New Intention</label>
                    <textarea
                        id="newIntention"
                        className="form-control"
                        rows="3"
                        value={newIntention}
                        onChange={(e) => setNewIntention(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary mt-2">Add Intention</button>
                <button 
                    type="button" 
                    className="btn btn-secondary mt-2 ml-2" 
                    onClick={() => setIsAddingIntention(false)}
                >
                    Cancel
                </button>
            </form>
        )}
        <div className="intention-list mt-3">
            {prayerIntentions.map((intention) => (
                <div key={intention._id} className="card mb-2">
                    <div className="card-body">
                        <p>{intention.content}</p>
                        <button 
                            className="btn btn-outline-primary btn-sm mr-2"
                            onClick={() => handleEditClick(intention._id, intention.content)}
                        >
                            Edit
                        </button>
                        <button 
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeleteIntention(intention._id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
        {editingIntentionId && (
            <form onSubmit={handleUpdateIntention}>
                <div className="form-group">
                    <label htmlFor="editIntention">Edit Intention</label>
                    <textarea
                        id="editIntention"
                        className="form-control"
                        rows="3"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary mt-2">Update Intention</button>
            </form>
        )}
    </div>
);

export default PrayerIntentions;
