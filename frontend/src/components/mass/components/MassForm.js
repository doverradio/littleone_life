import React, { useState, useEffect } from 'react';
import './MassForm.css';
import MassAttendance from './MassAttendance';
import ManualEntryForm from './ManualEntryForm';
import PrayerIntentions from './PrayerIntentions';
import Map from '../../map/Map';
import { handleManualChurchChange, handleManualChurchSubmit, handleZipCodeSearch, savePendingChurches } from '../helpers/massFormHelpers';
import { addChurchToMassOptions, removeChurchFromUserOptions } from '../helpers/massHelpers';
import { isAuthenticated } from '../../../api/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const MassForm = ({
    userChurches,
    setUserChurches,
    nearbyChurches,
    setNearbyChurches,
    showChurchForm,
    setShowChurchForm,
    submitNewChurch,
    handleChurchChange,
    newChurch,
    selectedMassTime,
    handleMassTimeChange,
    massTimesOptions,
    prayerIntentions,
    editingIntentionId,
    handleUpdateIntention,
    setEditContent,
    setEditingIntentionId,
    handleDeleteIntention,
    selectedIntentions,
    handleIntentionCheckboxChange,
    handleEditClick,
    isAddingIntention,
    handleNewIntentionSubmit,
    newIntention,
    setNewIntention,
    setIsAddingIntention,
    setSpecialIntentions,
    handleSubmitMass,
    isSubmitting,
    count,
    handleChurchSelection,
    editContent,
    selectedChurch,
    specialIntentions
}) => {
    const [distance, setDistance] = useState(8046.72); // default 5 miles in meters
    const [pendingChurches, setPendingChurches] = useState([]);
    const [manualMode, setManualMode] = useState(true);
    const [zipCode, setZipCode] = useState('');
    const [zipCodeChurches, setZipCodeChurches] = useState([]);
    const [manualChurchData, setManualChurchData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        phone: '',
        website: '',
        additionalInfo: '',
    });

    const { user: { _id }, token } = isAuthenticated();
    const userId = _id;

    const [isChurchFormVisible, setIsChurchFormVisible] = useState(false);
    const [filterQuery, setFilterQuery] = useState('');
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const toggleChurchForm = () => {
        setIsChurchFormVisible(!isChurchFormVisible);
    };

    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
        setFilterQuery('');
    };

    const notify = (message, type) => {
        toast[type](message);
    };

    const filterChurches = (churches, query) => {
        if (!query) return churches;
        return churches.filter(church => 
            church.name.toLowerCase().includes(query.toLowerCase()) ||
            church.address.toLowerCase().includes(query.toLowerCase()) ||
            church.city.toLowerCase().includes(query.toLowerCase())
        );
    };

    const filteredUserChurches = filterChurches(userChurches, filterQuery);
    const filteredNearbyChurches = filterChurches(nearbyChurches.filter(nearby => !userChurches.some(user => user.name === nearby.name)), filterQuery);
    const filteredChurches = [...filteredUserChurches, ...filteredNearbyChurches];

    return (
        <div className="mass-questions d-flex flex-column align-items-center">
            <ToastContainer />
            <div className="row w-100 justify-content-center mb-3">
                <div className="col-md-12 text-center">
                    <div className="search-container">
                        {isFilterVisible && (
                            <div className="filter-input-container">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Filter churches by name, address, or city"
                                    value={filterQuery}
                                    onChange={(e) => setFilterQuery(e.target.value)}
                                />
                                {filterQuery && (
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                        className="clear-icon"
                                        onClick={() => setFilterQuery('')}
                                    />
                                )}
                            </div>
                        )}
                        <div className="search-icon-container">
                            <FontAwesomeIcon
                                icon={isFilterVisible ? faTimesCircle : faSearch}
                                className={`search-icon ${isFilterVisible ? 'red' : ''}`}
                                onClick={toggleFilterVisibility}
                                title={isFilterVisible ? "Close search" : "Search by church name"}
                            />
                        </div>
                    </div>
                    <MassAttendance 
                        userChurches={filteredUserChurches}
                        nearbyChurches={filteredNearbyChurches}
                        handleChurchSelection={handleChurchSelection}
                        selectedMassTime={selectedMassTime}
                        handleMassTimeChange={handleMassTimeChange}
                        massTimesOptions={massTimesOptions}
                        selectedChurch={selectedChurch}
                        addChurchToMassOptions={(church) => {
                            addChurchToMassOptions(userId, church, token, setUserChurches, setNearbyChurches);
                            notify('Church added to your list', 'success');
                        }}
                        removeChurchFromUserOptions={(church) => {
                            removeChurchFromUserOptions(userId, church, token, setUserChurches, setNearbyChurches);
                            notify('Church removed from your list', 'info');
                        }}
                        token={token}
                    />
                    <button className="btn btn-outline-secondary mt-3" onClick={toggleChurchForm}>
                        {isChurchFormVisible ? 'Hide Church Form' : 'Add New Church'}
                    </button>
                </div>
            </div>
            {isChurchFormVisible && (
                <div className="w-100">
                    <div className="d-flex justify-content-center mt-3">
                        <button 
                            className={`btn ${manualMode ? 'btn-primary' : 'btn-secondary'} mr-2`}
                            onClick={() => setManualMode(true)}
                        >
                            Manual Entry
                        </button>
                        <button 
                            className={`btn ${!manualMode ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setManualMode(false)}
                        >
                            Use Map
                        </button>
                    </div>
                    {manualMode ? (
                        <ManualEntryForm
                            showChurchForm={showChurchForm}
                            setShowChurchForm={setShowChurchForm}
                            submitNewChurch={submitNewChurch}
                            handleChurchChange={handleChurchChange}
                            newChurch={newChurch}
                            manualChurchData={manualChurchData}
                            handleManualChurchChange={(e) => handleManualChurchChange(e, setManualChurchData, manualChurchData)}
                            handleManualChurchSubmit={(e) => handleManualChurchSubmit(e, (church) => addChurchToMassOptions(userId, church, token, setUserChurches, setNearbyChurches), manualChurchData, setManualChurchData)}
                            zipCode={zipCode}
                            setZipCode={setZipCode}
                            handleZipCodeSearch={() => handleZipCodeSearch(zipCode, token, setZipCodeChurches)}
                            zipCodeChurches={zipCodeChurches}
                            addChurchToMassOptions={(church) => addChurchToMassOptions(userId, church, token, setUserChurches, setNearbyChurches)}
                        />
                    ) : (
                        <Map
                            addChurchToMassOptions={(church) => addChurchToMassOptions(userId, church, token, setUserChurches, setNearbyChurches)}
                            distance={distance}
                            setDistance={setDistance}
                            nearbyChurches={nearbyChurches}
                            setNearbyChurches={setNearbyChurches}
                        />
                    )}
                    {pendingChurches.length > 0 && (
                        <div className="mt-3">
                            <h5>Pending Churches</h5>
                            <ul className="list-group">
                                {pendingChurches.map((church, index) => (
                                    <li key={index} className="list-group-item">{church.name}</li>
                                ))}
                            </ul>
                            <button 
                                className="btn btn-success mt-2"
                                onClick={savePendingChurches}
                            >
                                Save Pending Churches
                            </button>
                        </div>
                    )}
                </div>
            )}
            <hr className="w-100"/>
            <div className="prayer-intentions w-100">
                <PrayerIntentions
                    prayerIntentions={prayerIntentions}
                    editingIntentionId={editingIntentionId}
                    handleUpdateIntention={handleUpdateIntention}
                    setEditContent={setEditContent}
                    setEditingIntentionId={setEditingIntentionId}
                    handleDeleteIntention={handleDeleteIntention}
                    selectedIntentions={selectedIntentions}
                    handleIntentionCheckboxChange={handleIntentionCheckboxChange}
                    handleEditClick={handleEditClick}
                    isAddingIntention={isAddingIntention}
                    handleNewIntentionSubmit={handleNewIntentionSubmit}
                    newIntention={newIntention}
                    setNewIntention={setNewIntention}
                    setIsAddingIntention={setIsAddingIntention}
                    editContent={editContent}
                />
            </div>
            <div className="form-group w-100 mt-3">
                <label htmlFor="specialIntentions">Special Intentions</label>
                <textarea
                    id="specialIntentions"
                    className="form-control"
                    rows="3"
                    value={specialIntentions}
                    onChange={(e) => setSpecialIntentions(e.target.value)}
                ></textarea>
            </div>
            <button 
                className="btn btn-primary mt-3 submit-mass-btn" 
                onClick={handleSubmitMass} 
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Mass Attendance'}
            </button>
        </div>
    );
};

export default MassForm;
