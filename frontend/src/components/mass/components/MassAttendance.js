import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import './MassAttendance.css';

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
                                <div>
                                    <span className="church-name">{church.name}</span> 
                                    {church.address}, {church.city}, {church.state}
                                </div>
                            </label>
                            <FontAwesomeIcon 
                                icon={solidHeart} 
                                className="add-icon m-1" 
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
                                <div className="church-item-label">
                                    <span className="church-name">{church.name}</span> 
                                    {church.address}, {church.city}, {church.state}
                                </div>
                            </label>
                            <FontAwesomeIcon 
                                icon={regularHeart}
                                className="remove-icon m-1" 
                                title="Add church to user churches"
                                onClick={() => addChurchToMassOptions(church)}
                            />
                        </div>
                    ))}
                </div>
            </form>
        </div>
    </div>
);

export default MassAttendance;
