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
                    maxLength={100}
                    className="form-control"
                    placeholder="Enter your prayer intention here"
                />
                <small>{100 - charCount} characters remaining</small>
            </div>
            <button type="submit" className="btn btn-primary m-1">Add</button>
            <button type="button" className="btn btn-secondary m-1" onClick={handleCloseForm}>Close</button>
        </form>
    );
};

export default PrayerIntentionsForm;
