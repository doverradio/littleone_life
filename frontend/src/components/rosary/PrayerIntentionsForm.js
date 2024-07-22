import React, { useState } from 'react';

const PrayerIntentionsForm = ({
    isAddingIntention,
    newIntention,
    handleNewIntentionSubmit,
    setNewIntention,
    handleCloseForm
}) => {
    const [charCount, setCharCount] = useState(newIntention.length);

    const handleContentChange = (e) => {
        setNewIntention(e.target.value);
        setCharCount(e.target.value.length);
    };

    return (
        <form onSubmit={handleNewIntentionSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    value={newIntention}
                    onChange={handleContentChange}
                    maxLength={100} // Ensure the maxlength attribute is set
                    className="form-control"
                />
                <small className={charCount >= 90 ? 'warning' : ''}>
                    {100 - charCount} characters remaining
                </small>
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
            <button type="button" className="btn btn-secondary" onClick={handleCloseForm}>Close</button>
        </form>
    );
};

export default PrayerIntentionsForm;
