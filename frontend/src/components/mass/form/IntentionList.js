import React from 'react';
import { MdOutlineModeEdit } from 'react-icons/md';

const IntentionList = ({
    prayerIntentions,
    editingIntentionId,
    handleUpdateIntention,
    setEditContent,
    setEditingIntentionId,
    handleDeleteIntention,
    selectedIntentions,
    handleIntentionCheckboxChange,
    handleEditClick,
    editContent
}) => (
    <div className="row">
        <div className="col-12">
            {
                prayerIntentions.length > 0 ? (
                    <ul style={{ listStyle: 'none' }}>
                        {
                            prayerIntentions.map(intention => (
                                <li key={intention._id}>
                                    {
                                        editingIntentionId === intention._id ? (
                                            <form onSubmit={handleUpdateIntention}>
                                                <textarea
                                                    rows={5}
                                                    className="form-control"
                                                    value={editContent}
                                                    onChange={(e) => setEditContent(e.target.value)}
                                                />
                                                <div className="row my-2">
                                                    <div className="col-12">
                                                        <button type="submit" className="btn btn-primary btn-sm m-1">Save</button>
                                                        <button 
                                                            className="btn btn-secondary btn-sm m-1" 
                                                            onClick={() => setEditingIntentionId(null)}
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button 
                                                            className='btn btn-danger btn-sm m-1'
                                                            onClick={() => handleDeleteIntention(intention._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                            ) : (
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-1">
                                                            <input 
                                                                type="checkbox" 
                                                                checked={selectedIntentions.includes(intention._id)}
                                                                onChange={() => handleIntentionCheckboxChange(intention._id)}
                                                            />
                                                        </div>
                                                        <div className="col-9">
                                                            <p style={{ fontSize: '12px', textAlign: 'left', wordBreak: 'break-word' }}>
                                                                {intention.content}
                                                            </p>
                                                        </div>
                                                        <div className="col-1">
                                                            <span 
                                                                onClick={() => handleEditClick(intention._id, intention.content)}
                                                                style={{ fontSize: '9px'}}
                                                            >
                                                                <MdOutlineModeEdit />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                ) 
                : 
                <p>
                    No intentions added yet.
                </p>
            }
        </div>
    </div>
);

export default IntentionList;
