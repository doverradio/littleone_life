import React from 'react';

const MassTimeSelection = ({ selectedMassTime, handleMassTimeChange, massTimesOptions }) => (
    <div className="row">
        <div className="col-md-5 offset-md-2">
            <select value={selectedMassTime} onChange={handleMassTimeChange} className="form-control">
                <option value="">Select Mass Time</option>
                {massTimesOptions.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                ))}
            </select>
        </div>
    </div>
);

export default MassTimeSelection;
