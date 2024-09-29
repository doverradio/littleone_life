import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import './ConfessionForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChurchSearch from './ChurchSearch';
import { CONFESSION_TIMES_OPTIONS } from '../constants'; // Import confession times
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
    const [favoriteChurches, setFavoriteChurches] = useState([]);
    const [filterQuery, setFilterQuery] = useState('');

    const handleChurchSelection = (church) => {
        console.log(`handleChurchSelection selectedChurch - initial: `, selectedChurch)
        console.log(`handleChurchSelection church: `, church)
        // Toggle selection: if the same church is clicked again, unselect it
        if (selectedChurch && selectedChurch._id === church._id) {
            setSelectedChurch(null); // Unselect the church
        } else {
            setSelectedChurch(church); // Select the clicked church
            console.log(`handleChurchSelection selectedChurch - post: `, selectedChurch)
        }
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
            let updatedChurch;
            if (isFavorited) {
                const result = await removeChurchFromConfessionOptions(userId, church, setUserChurches, setNearbyChurches);
                if (result) {
                    setFavoriteChurches((prevFavorites) =>
                        prevFavorites.filter((fav) => fav._id !== church._id && fav.placeId !== church.placeId)
                    );
                    toast.success(`${church.name} removed from favorites`);
                    updatedChurch = { ...church, users: church.users.filter(user => user !== userId) };
                } else {
                    toast.error('Failed to update favorites');
                }
            } else {
                const response = await addChurchToConfessionOptions(userId, church, setUserChurches, setNearbyChurches);
                if (response) {
                    setFavoriteChurches((prevFavorites) => [...prevFavorites, response]);
                    toast.success(`${church.name} added to favorites`);
                    updatedChurch = { ...church, users: [...church.users, userId] };
                } else {
                    toast.error('Failed to update favorites');
                }
            }

            if (updatedChurch) {
                setUserChurches((prevChurches) => prevChurches.map((c) => c._id === updatedChurch._id ? updatedChurch : c));
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
                        {userChurches.map((church) => (
                            <ChurchItem
                                key={church._id} // Use the unique _id as key
                                church={church}
                                selectedChurch={selectedChurch}
                                handleChurchSelection={handleChurchSelection}
                                toggleFavorite={toggleFavorite}
                                isFavorite={isFavorite(church)}
                            />
                        ))}
                        {nearbyChurches.length > 0 ? (
                            nearbyChurches.map((church) => (
                                <ChurchItem
                                    key={church.placeId || church._id} // Use placeId if available, otherwise fallback to _id
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
                <select
                    className="form-control"
                    id="confessionTime"
                    value={confessionTime}
                    onChange={(e) => setConfessionTime(e.target.value)}
                >
                    <option value="">Select Confession Time</option>
                    {CONFESSION_TIMES_OPTIONS.map((time, index) => (
                        <option key={index} value={time}>
                            {time}
                        </option>
                    ))}
                </select>
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
    // console.log({ church, selectedChurch, handleChurchSelection, toggleFavorite, isFavorite })
    // const isSelected = selectedChurch && (selectedChurch._id === church._id || selectedChurch.placeId === church.placeId);
    const isSelected = selectedChurch && (selectedChurch._id === church._id );
    if ( isSelected ) { console.log(`isSelected: `, isSelected, `church: `, church) }

    return (
        <div
            className={`radio-button-container ${isSelected ? 'selected-row' : ''}`}
            style={{ backgroundColor: isSelected ? '#d3f9d8' : '', borderColor: isSelected ? '#28a745' : '' }} // Change background color if selected
        >
            <input
                type="radio"
                id={church._id || church.placeId}
                name="churchSelection"
                value={church._id || church.placeId}
                className='m-2'
                onChange={() => handleChurchSelection(church)}
                checked={isSelected} // Ensure the radio button is checked only when selected
            />
            <label htmlFor={church._id || church.placeId} title={`${church.name}, ${church.address}, ${church.city}, ${church.state}`}>
                <div>
                    <span className="church-name">{church.name}</span>
                    {church.address}, {church.city}, {church.state}
                </div>
            </label>
            <FontAwesomeIcon
                icon={isFavorite ? faSolidHeart : faRegularHeart}
                className="favorite-icon m-2"
                onClick={() => toggleFavorite(church)}
                title={isFavorite ? 'Unheart church' : 'Heart church'}
            />
        </div>
    );
};

export default ConfessionForm;
