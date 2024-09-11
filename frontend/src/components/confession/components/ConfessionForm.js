import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import './ConfessionForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChurchSearch from './ChurchSearch';
import {
    addChurchToConfessionOptions,
    removeChurchFromConfessionOptions,
} from '../helpers/confessionHelpers';

const ConfessionForm = ({
    userId,
    userChurches,
    setUserChurches,
    nearbyChurches = [],
    setNearbyChurches,
    selectedChurch,
    setSelectedChurch,
    confessionTime,
    setConfessionTime,
    handleSubmitConfession,
    isSubmitting,
}) => {
    const [favoriteChurches, setFavoriteChurches] = useState([]); // Define this locally
    
    const [filterQuery, setFilterQuery] = useState('');

    const handleChurchSelection = (church) => {
        setSelectedChurch(church);
    };

    const filterChurches = (churches, query) => {
        if (!query) return churches;
        return churches.filter((church) =>
            church.name.toLowerCase().includes(query.toLowerCase()) ||
            church.address.toLowerCase().includes(query.toLowerCase()) ||
            church.city.toLowerCase().includes(query.toLowerCase())
        );
    };

    const filteredUserChurches = filterChurches(userChurches, filterQuery);
    const filteredNearbyChurches = filterChurches(
        nearbyChurches.filter((nearby) => !userChurches.some((user) => user.name === nearby.name)),
        filterQuery
    );

    const toggleFavorite = async (church) => {
        const isFavorited = church.users && church.users.includes(userId);
        try {
            if (isFavorited) {
                // Unheart the church by removing it from favorites
                const result = await removeChurchFromConfessionOptions(userId, church, setUserChurches, setNearbyChurches);
                if (result) {
                    setFavoriteChurches((prevFavorites) =>
                        prevFavorites.filter((fav) => fav._id !== church._id && fav.placeId !== church.placeId)
                    );
                    toast.success(`${church.name} removed from favorites`);
                } else {
                    toast.error('Failed to update favorites');
                }
            } else {
                // Heart the church by adding it to favorites
                const result = await addChurchToConfessionOptions(userId, church, setUserChurches, setNearbyChurches);
                if (result) {
                    setFavoriteChurches((prevFavorites) => [...prevFavorites, church]); // Update state with the newly favorited church
                    toast.success(`${church.name} added to favorites`);
                } else {
                    toast.error('Failed to update favorites');
                }
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            toast.error('Failed to update favorites');
        }
    };

    const isFavorite = (church) => {
        return church.users && church.users.includes(userId);
    };

    return (
        <div className="confession-form d-flex flex-column align-items-center">
            <ToastContainer />
            <div className="row w-100 justify-content-center mb-3">
                <div className="col-md-12 text-center">
                    <h3>Confession Attendance</h3>
                    <ChurchSearch filterQuery={''} setFilterQuery={() => {}} isFilterVisible={false} toggleFilterVisibility={() => {}} />
                    <div className="church-list">
                        {userChurches.map((church, index) => (
                            <ChurchItem
                                key={church._id || index}
                                church={church}
                                selectedChurch={selectedChurch}
                                handleChurchSelection={handleChurchSelection}
                                toggleFavorite={toggleFavorite}
                                isFavorite={isFavorite(church)}
                            />
                        ))}
                        {nearbyChurches.length > 0 ? (
                            nearbyChurches.map((church, index) => (
                                <ChurchItem
                                    key={church.placeId || `nearby-${index}`}
                                    church={church}
                                    selectedChurch={selectedChurch}
                                    handleChurchSelection={handleChurchSelection}
                                    toggleFavorite={toggleFavorite}
                                    isFavorite={isFavorite(church)}
                                />
                            ))
                        ) : (
                            <p>No nearby churches found.</p>
                        )}
                    </div>
                </div>
            </div>
            <hr className="w-100" />
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

const ChurchItem = ({ church, selectedChurch, handleChurchSelection, toggleFavorite, isFavorite }) => {
    const isSelected = selectedChurch && (selectedChurch._id === church._id || selectedChurch.placeId === church.placeId);
    return (
        <div className={`radio-button-container ${isSelected ? 'selected-row' : ''}`}>
            <input
                type="radio"
                id={church._id || church.placeId}
                name="churchSelection"
                value={church._id || church.placeId}
                onChange={() => handleChurchSelection(church)}
            />
            <label htmlFor={church._id || church.placeId} title={`${church.name}, ${church.address}, ${church.city}, ${church.state}`}>
                <div>
                    <span className="church-name">{church.name}</span>
                    {church.address}, {church.city}, {church.state}
                </div>
            </label>
            <FontAwesomeIcon
                icon={isFavorite ? faSolidHeart : faRegularHeart}
                className="favorite-icon"
                onClick={() => toggleFavorite(church)}
                title={isFavorite ? 'Unheart church' : 'Heart church'}
            />
        </div>
    );
};

export default ConfessionForm;
