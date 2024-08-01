import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const MassAttendance = ({
    userChurches,
    nearbyChurches,
    handleChurchSelection,
    selectedMassTime,
    handleMassTimeChange,
    massTimesOptions,
    selectedChurch,
    addChurchToMassOptions,
    removeChurchFromUserOptions,
    token
}) => (
    <div className='mt-3'>
        <h3>Mass Attendance</h3>
        <div className="form-group">
            <form>
                <div className="church-list">
                    {userChurches.map((church, index) => (
                        <div key={index} className="radio-button-container">
                            <input 
                                type="radio" 
                                id={church._id || index} 
                                name="churchSelection" 
                                value={church._id || index} 
                                onChange={() => handleChurchSelection(church)} 
                            />
                            <label htmlFor={church._id || index} title={`${church.name}, ${church.address}, ${church.city}, ${church.state}`}>
                                &nbsp;&nbsp;{church.name}, {church.address}, {church.city}, {church.state}
                            </label>
                            <FontAwesomeIcon 
                                icon={faMinus} 
                                className="remove-icon" 
                                title="Remove church from user churches"
                                onClick={() => removeChurchFromUserOptions(church)}
                            />
                        </div>
                    ))}
                    {nearbyChurches.map((church, index) => (
                        <div key={index} className="radio-button-container">
                            <input 
                                type="radio" 
                                id={church._id || `nearby-${index}`} 
                                name="churchSelection" 
                                value={church._id || `nearby-${index}`} 
                                onChange={() => handleChurchSelection(church)} 
                            />
                            <label htmlFor={church._id || `nearby-${index}`} title={`${church.name}, ${church.address}, ${church.city}, ${church.state}`}>
                                &nbsp;&nbsp;{church.name}, {church.address}, {church.city}, {church.state}
                            </label>
                            <FontAwesomeIcon 
                                icon={faPlus} 
                                className="add-icon" 
                                title="Add church to user churches"
                                onClick={() => addChurchToMassOptions(church)}
                            />
                        </div>
                    ))}
                </div>
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
