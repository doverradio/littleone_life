import React from 'react';

const PrayerIntentionsForm = ({
    isAddingIntention,
    newIntention,
    handleNewIntentionSubmit,
    setNewIntention,
    handleCloseForm // Add this prop
}) => {
    return (
        <div className="prayer-intentions-form">
            <div className="row">
                <div className="col-12">
                    {
                        isAddingIntention ? (
                            <form onSubmit={handleNewIntentionSubmit}>
                                <textarea 
                                    className='form-control m-1'
                                    value={newIntention}
                                    onChange={(e) => setNewIntention(e.target.value)} 
                                />
                                <button type="submit" className='btn btn-outline-secondary btn-sm m-1'>Add</button>
                                <button 
                                    type="button" 
                                    className='btn btn-danger btn-sm m-1' 
                                    onClick={handleCloseForm}
                                >
                                    Close
                                </button>
                            </form>
                        ) : null
                    }
                </div>
            </div>
        </div>
    );
};

export default PrayerIntentionsForm;
