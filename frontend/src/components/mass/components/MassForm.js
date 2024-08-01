import React, { useState, useEffect } from 'react';
import './MassForm.css';
import MassAttendance from './MassAttendance';
import PrayerIntentions from './PrayerIntentions';
import { handleManualChurchChange, handleManualChurchSubmit, handleZipCodeSearch } from '../helpers/massFormHelpers';
import { addChurchToMassOptions, removeChurchFromUserOptions } from '../helpers/massHelpers';
import { isAuthenticated } from '../../../api/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChurchSearch from './ChurchSearch';
import MassTimeSelector from './MassTimeSelector';
import ChurchFormToggle from './ChurchFormToggle';
import { createMassAttendance } from '../../../api/massAttendance';

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
    isSubmitting,
    count,
    editContent,
    specialIntentions
}) => {
    const { user: { _id }, token } = isAuthenticated();
    const userId = _id;

    const [distance, setDistance] = useState(8046.72); // default 5 miles in meters
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

    const [isChurchFormVisible, setIsChurchFormVisible] = useState(false);
    const [filterQuery, setFilterQuery] = useState('');
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [massTime, setMassTime] = useState(selectedMassTime || '');
    const [selectedChurch, setSelectedChurch] = useState(null);

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

    const handleMassTimeChange = (event) => {
        setMassTime(event.target.value);
    };

    const handleChurchSelection = (church) => {
        setSelectedChurch(church);
    };

    const handleSubmit = async () => {
        const massAttendanceData = {
            user: userId,
            church: selectedChurch._id,
            massTime: massTime,
            i: selectedIntentions,
            specialIntentions: specialIntentions,
        };

        try {
            await createMassAttendance(massAttendanceData, token);
            notify('Mass attendance recorded successfully!', 'success');
        } catch (error) {
            console.error('Error recording mass attendance:', error);
            notify('Error recording mass attendance.', 'error');
        }
    };

    return (
        <div className="mass-questions d-flex flex-column align-items-center">
            <ToastContainer />
            <div className="row w-100 justify-content-center mb-3">
                <div className="col-md-12 text-center">
                    <h3>Mass Attendance</h3>
                    <ChurchSearch
                        filterQuery={filterQuery}
                        setFilterQuery={setFilterQuery}
                        isFilterVisible={isFilterVisible}
                        toggleFilterVisibility={toggleFilterVisibility}
                    />
                    <MassAttendance 
                        userChurches={filteredUserChurches}
                        nearbyChurches={filteredNearbyChurches}
                        handleChurchSelection={handleChurchSelection}
                        selectedMassTime={massTime}
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
                    <div className="row w-100 justify-content-center my-3">
                        <div className="col-md-12 text-center">
                            <ChurchFormToggle
                                isChurchFormVisible={isChurchFormVisible}
                                toggleChurchForm={toggleChurchForm}
                                showChurchForm={showChurchForm}
                                setShowChurchForm={setShowChurchForm}
                                submitNewChurch={submitNewChurch}
                                handleChurchChange={handleChurchChange}
                                newChurch={newChurch}
                                manualChurchData={manualChurchData}
                                setManualChurchData={setManualChurchData}
                                handleManualChurchSubmit={handleManualChurchSubmit}
                                zipCode={zipCode}
                                setZipCode={setZipCode}
                                handleZipCodeSearch={handleZipCodeSearch}
                                zipCodeChurches={zipCodeChurches}
                                addChurchToMassOptions={addChurchToMassOptions}
                                userId={userId}
                                token={token}
                                setUserChurches={setUserChurches}
                                setNearbyChurches={setNearbyChurches}
                                handleManualChurchChange={handleManualChurchChange}
                                setZipCodeChurches={setZipCodeChurches}
                            />
                        </div>
                    </div>
                    <div className="row w-100 justify-content-center my-3">
                        <div className="col-md-12 text-center">
                            <MassTimeSelector
                                selectedMassTime={massTime}
                                handleMassTimeChange={handleMassTimeChange}
                                massTimesOptions={massTimesOptions}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <hr className="w-100"/>
            <div className="prayer-intentions w-100">
                <div className="col-md-12 text-center">
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
            </div>
            <div className="form-group w-100 mt-3 text-center">
                <label htmlFor="specialIntentions">Special Intentions</label>
                <textarea
                    id="specialIntentions"
                    className="form-control"
                    rows="3"
                    value={specialIntentions}
                    onChange={(e) => setSpecialIntentions(e.target.value)}
                ></textarea>
            </div>
            
            <div className="row w-100 justify-content-center my-3">
                <div className="col-md-12 text-center">
                    <button 
                        className="btn btn-primary mt-3 submit-mass-btn" 
                        onClick={handleSubmit} 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Mass'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MassForm;
