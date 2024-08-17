// src/components/confession/components/ConfessionForm.js
import React, { useState } from 'react';
import './ConfessionForm.css';
import { useAuth } from '../../../api/authHook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChurchSearch from './ChurchSearch';
import {
    addChurchToConfessionOptions,
    removeChurchFromConfessionOptions
} from '../helpers/confessionHelpers';

const ConfessionForm = ({
    userChurches,
    setUserChurches,
    nearbyChurches,
    setNearbyChurches,
    showChurchForm,
    setShowChurchForm,
    newChurch,
    selectedChurch,
    setSelectedChurch,
    confessionTime,
    setConfessionTime,
    handleSubmitConfession,
    isSubmitting
}) => {
    const { user, token } = useAuth();
    const { _id } = user || {};
    const userId = _id;

    const handleChurchSelection = (church) => {
        setSelectedChurch(church);
    };

    const notify = (message, type) => {
        toast[type](message);
    };

    return (
        <div className="confession-form d-flex flex-column align-items-center">
            <ToastContainer />
            <div className="row w-100 justify-content-center mb-3">
                <div className="col-md-12 text-center">
                    <h3>Confession Attendance</h3>
                    <ChurchSearch
                        filterQuery={''}
                        setFilterQuery={() => {}}
                        isFilterVisible={false}
                        toggleFilterVisibility={() => {}}
                    />
                    {/* Other components and logic similar to MassForm */}
                    <div className="church-list">
                        {userChurches.map((church, index) => (
                            <div
                                key={index}
                                className={`radio-button-container ${selectedChurch && selectedChurch._id === church._id ? 'selected-row' : ''}`}
                            >
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
                                <button
                                    onClick={() => removeChurchFromConfessionOptions(userId, church, token, setUserChurches, setNearbyChurches)}
                                    title="Remove church from user churches"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        {nearbyChurches.map((church, index) => (
                            <div
                                key={`nearby-${index}`}
                                className={`radio-button-container ${selectedChurch && selectedChurch.placeId === church.placeId ? 'selected-row' : ''}`}
                            >
                                <input
                                    type="radio"
                                    id={church.placeId || `nearby-${index}`}
                                    name="churchSelection"
                                    value={church.placeId || `nearby-${index}`}
                                    onChange={() => handleChurchSelection(church)}
                                />
                                <label htmlFor={church.placeId || `nearby-${index}`} title={`${church.name}, ${church.address}, ${church.city}, ${church.state}`}>
                                    <div>
                                        <span className="church-name">{church.name}</span>
                                        {church.address}, {church.city}, {church.state}
                                    </div>
                                </label>
                                <button
                                    onClick={() => addChurchToConfessionOptions(userId, church, token, setUserChurches, setNearbyChurches)}
                                    title="Add church to user churches"
                                >
                                    Add
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <hr className="w-100"/>
            <div className="form-group w-100 mt-3 text-center">
                <label htmlFor="confessionTime">Confession Time:</label>
                <input
                    type="datetime-local"
                    className="form-control"
                    id="confessionTime"
                    value={confessionTime}
                    onChange={(e) => setConfessionTime(e.target.value)}
                />
            </div>
            <div className="row w-100 justify-content-center my-3">
                <div className="col-md-12 text-center">
                    <button
                        className="btn btn-primary mt-3 submit-confession-btn"
                        onClick={handleSubmitConfession}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Confession'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfessionForm;
