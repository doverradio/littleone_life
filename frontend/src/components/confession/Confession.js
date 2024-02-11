import React, { useState } from 'react';

const Confession = () => {
    const [lastConfessionDate, setLastConfessionDate] = useState('');
    const [daysSinceLastConfession, setDaysSinceLastConfession] = useState(0);

    const handleDateChange = (event) => {
        setLastConfessionDate(event.target.value);
        calculateDaysSince(event.target.value);
    };

    const calculateDaysSince = (date) => {
        const lastConfession = new Date(date);
        const today = new Date();
        const diffTime = Math.abs(today - lastConfession);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysSinceLastConfession(diffDays);
    };

    return (
        <div className="confession-component">
            <h2>Confession</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="lastConfessionDate">Last Confession Date:</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        id="lastConfessionDate" 
                        value={lastConfessionDate} 
                        onChange={handleDateChange}
                    />
                </div>
                <p>Days since last confession: {daysSinceLastConfession}</p>
                {/* Add more fields or functionalities as needed */}
            </form>
        </div>
    );
};

export default Confession;
