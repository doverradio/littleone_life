import React, { useState } from 'react';
import MassAttendance from './MassAttendance';
import ManualEntryForm from './ManualEntryForm';
import PrayerIntentions from './PrayerIntentions';
import Map from '../../map/Map';
import { handleManualChurchChange, handleManualChurchSubmit, handleZipCodeSearch, savePendingChurches } from '../helpers/massFormHelpers';
import { addChurchToUser } from '../helpers/massHelpers';
import { isAuthenticated } from '../../../api/auth';

const MassForm = ({
    userChurches,
    setUserChurches,
    nearbyChurches,
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
    specialIntentions,
    setNearbyChurches
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

    const toggleChurchForm = () => {
        setIsChurchFormVisible(!isChurchFormVisible);
    };

    const addChurchToMassOptions = async (church) => {
        try {
            const updatedChurch = await addChurchToUser(userId, church, token);
            setUserChurches(prevUserChurches => [...prevUserChurches, updatedChurch]);
            setNearbyChurches(prevNearbyChurches => prevNearbyChurches.filter(nearby => nearby.name !== church.name || nearby.address !== church.address));
        } catch (error) {
            console.error('Error adding church to user:', error);
        }
    };

    return (
        <div className="mass-questions d-flex flex-column align-items-center">
            <div className="row w-100 justify-content-center mb-3">
                <div className="col-md-12 text-center">
                    <MassAttendance 
                        userChurches={userChurches}
                        nearbyChurches={nearbyChurches}
                        handleChurchSelection={handleChurchSelection}
                        selectedMassTime={selectedMassTime}
                        handleMassTimeChange={handleMassTimeChange}
                        massTimesOptions={massTimesOptions}
                        selectedChurch={selectedChurch}
                        addChurchToMassOptions={addChurchToMassOptions}
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
                            handleManualChurchSubmit={(e) => handleManualChurchSubmit(e, addChurchToMassOptions, manualChurchData, setManualChurchData)}
                            zipCode={zipCode}
                            setZipCode={setZipCode}
                            handleZipCodeSearch={() => handleZipCodeSearch(zipCode, token, setZipCodeChurches)}
                            zipCodeChurches={zipCodeChurches}
                            addChurchToMassOptions={addChurchToMassOptions}
                        />
                    ) : (
                        <Map
                            addChurchToMassOptions={addChurchToMassOptions}
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
