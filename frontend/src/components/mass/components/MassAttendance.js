// src/components/mass/components/MassAttendance.js
import React from 'react';

const MassAttendance = ({
    userChurches,
    handleChurchSelection,
    selectedMassTime,
    handleMassTimeChange,
    massTimesOptions,
    selectedChurch,
    specialIntentions,
    setSpecialIntentions,
    handleSubmitMass,
    isSubmitting,
}) => (
    <div className='mt-3'>
        <h3>Mass Attendance</h3>
        <div className="form-group">
            <form>
                {userChurches.map(church => (
                    <div key={church._id} className="radio-button-container">
                        <input 
                            type="radio" 
                            id={church._id} 
                            name="churchSelection" 
                            value={church._id} 
                            onChange={handleChurchSelection} 
                        />
                        <label htmlFor={church._id}>&nbsp;&nbsp;{church.name}</label>
                    </div>
                ))}
            </form>
        </div>
        <div className="form-group">
            <label htmlFor="massTime">Select Mass Time</label>
            <select 
                id="massTime" 
                className="form-control" 
                value={selectedMassTime || ''} 
                onChange={handleMassTimeChange}
            >
                <option value="" disabled>Select a mass time</option>
                {massTimesOptions.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                ))}
            </select>
        </div>
    </div>
);

export default MassAttendance;
