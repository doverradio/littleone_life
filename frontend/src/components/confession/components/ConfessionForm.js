import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import './ConfessionForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChurchSearch from './ChurchSearch';
import {
    addChurchToFavorites, // New helper function to add/remove favorites
    removeChurchFromFavorites
} from '../helpers/confessionHelpers';

const ConfessionForm = ({
    userId,
    token,
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
    favoriteChurches = [], // List of favorited churches passed as a prop
    setFavoriteChurches, // Setter for favorite churches
}) => {

    const handleChurchSelection = (church) => {
        setSelectedChurch(church);
    };

    const toggleFavorite = async (church) => {
        const isFavorited = favoriteChurches.some(fav => fav._id === church._id || fav.placeId === church.placeId);
        if (isFavorited) {
            // Unheart the church
            await removeChurchFromFavorites(userId, church);
            setFavoriteChurches(favoriteChurches.filter(fav => fav._id !== church._id && fav.placeId !== church.placeId));
        } else {
            // Heart the church
            await addChurchToFavorites(userId, church);
            setFavoriteChurches([...favoriteChurches, church]);
        }
    };

    const isFavorite = (church) => {
        return favoriteChurches.some(fav => fav._id === church._id || fav.placeId === church.placeId);
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
