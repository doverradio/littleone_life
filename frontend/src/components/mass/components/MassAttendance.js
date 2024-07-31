import React from 'react';

const MassAttendance = ({
    userChurches,
    nearbyChurches, // Add this prop
    handleChurchSelection,
    selectedMassTime,
    handleMassTimeChange,
    massTimesOptions,
    selectedChurch,
    addChurchToMassOptions,
}) => (
    <div className='mt-3'>
        <h3>Mass Attendance</h3>
        <div className="form-group">
            <form>
                {[...userChurches, ...nearbyChurches].map((church, index) => (
                    <div key={index} className="radio-button-container">
                        <input 
                            type="radio" 
                            id={church._id || index} 
                            name="churchSelection" 
                            value={church._id || index} 
                            onChange={handleChurchSelection} 
                        />
                        <label htmlFor={church._id || index}>&nbsp;&nbsp;{church.name}</label>
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
