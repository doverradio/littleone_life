import React, { useState } from 'react';
import './MassForm.css';
import MassAttendance from './MassAttendance';
import PrayerIntentions from './PrayerIntentions';
import SuccessMessage from './SuccessMessage'; // Import the new SuccessMessage component
import { handleManualChurchChange, handleManualChurchSubmit, handleZipCodeSearch } from '../helpers/massFormHelpers';
import { addChurchToMassOptions, removeChurchFromUserOptions } from '../helpers/massHelpers';
import { isAuthenticated } from '../../../api/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChurchSearch from './ChurchSearch';
import MassTimeSelector from './MassTimeSelector';
import ChurchFormToggle from './ChurchFormToggle';
import { createMassAttendance } from '../../../api/massAttendance';
import PrayerIntentionsForm from './PrayerIntentionsForm';
import { handleCancelClick, handleDeleteIntention, handleIntentionCheckboxChange, handleNewIntentionSubmit, handleSaveClick } from '../utils/massUtils';

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
    setPrayerIntentions,
    editingIntentionId,
    setEditingIntentionId,
    handleUpdateIntention,
    setEditContent,
    editContent,
    isSubmitting,
    count,
    setSpecialIntentions,
    specialIntentions,
    handleEditClick,
    fetchIntentions
}) => {
    const { user: { _id }, token } = isAuthenticated();
    const userId = _id;

    const [isChurchFormVisible, setIsChurchFormVisible] = useState(false);
    const [filterQuery, setFilterQuery] = useState('');
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [massTime, setMassTime] = useState(selectedMassTime || '');
    const [selectedChurch, setSelectedChurch] = useState(null);
    const [isAddingIntention, setIsAddingIntention] = useState(false);
    const [newIntention, setNewIntention] = useState('');
    const [selectedIntentions, setSelectedIntentions] = useState([]);
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
    
    const [zipCode, setZipCode] = useState('');
    const [zipCodeChurches, setZipCodeChurches] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false); // New state to track form submission

    const [isSpecialIntentionVisible, setIsSpecialIntentionVisible] = useState(false);

    const toggleSpecialIntentionVisibility = () => {
        setIsSpecialIntentionVisible(!isSpecialIntentionVisible);
    };

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
            resetForm(); // Reset form after successful submission
        } catch (error) {
            console.error('Error recording mass attendance:', error);
            notify('Error recording mass attendance.', 'error');
        }
    };

    const resetForm = () => {
        setSelectedChurch(null);
        setMassTime('');
        setSelectedIntentions([]);
        setSpecialIntentions('');
        setIsSubmitted(true); // Set submitted state to true
    };

    const handleReturnToForm = () => {
        setIsSubmitted(false);
    };

    return (
        <div className="mass-questions d-flex flex-column align-items-center">
            <ToastContainer />
            {isSubmitted ? (
                <SuccessMessage onReturn={handleReturnToForm} />
            ) : (
                <>
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
                                selectedIntentions={selectedIntentions}
                                handleIntentionCheckboxChange={handleIntentionCheckboxChange}
                                handleEditClick={handleEditClick}
                                handleSaveClick={(id, updatedContent) => handleSaveClick(id, updatedContent, token, fetchIntentions, userId, setPrayerIntentions, setEditingIntentionId, setEditContent)}
                                handleCancelClick={() => handleCancelClick(setEditingIntentionId, setEditContent)}
                                handleDeleteIntention={(id) => handleDeleteIntention(id, token, fetchIntentions, userId, setPrayerIntentions)}
                                editingIntentionId={editingIntentionId}
                                editContent={editContent}
                                setEditContent={setEditContent}
                                setEditingIntentionId={setEditingIntentionId}
                                setSelectedIntentions={setSelectedIntentions}
                            />
                            {isAddingIntention && (
                                <PrayerIntentionsForm
                                    isAddingIntention={isAddingIntention}
                                    newIntention={newIntention}
                                    handleNewIntentionSubmit={handleNewIntentionSubmit}
                                    setNewIntention={setNewIntention}
                                    handleCloseForm={() => setIsAddingIntention(false)}
                                />
                            )}
                            {!isAddingIntention && (
                                <div className="row mt-3">
                                    <div className="col-12 text-center">
                                        <button 
                                            className="btn btn-outline-secondary btn-sm" 
                                            onClick={() => setIsAddingIntention(true)}
                                        >
                                            Add intention
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="form-group w-100 mt-3 text-center">
                        <label 
                            htmlFor="specialIntentions" 
                            title='Click here to add a "Special Intention", outside the regular intentions'
                            style={{ cursor: 'pointer', fontWeight: isSpecialIntentionVisible ? 'bold' : 'normal' }}
                            onClick={toggleSpecialIntentionVisibility}
                        >
                            Special Intention
                        </label>
                        {isSpecialIntentionVisible && (
                            <textarea
                                id="specialIntentions"
                                className="form-control mx-auto"
                                placeholder='Add a special intention here'
                                rows="3"
                                style={{ width: '70%', margin: '0 auto' }} // Center the textarea
                                value={specialIntentions}
                                onChange={(e) => setSpecialIntentions(e.target.value)}
                            ></textarea>
                        )}
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
                </>
            )}
        </div>
    );
};

export default MassForm;
