import React, { useState } from 'react';
import ChurchForm from './form/ChurchForm';
import MapSection from './form/MapSection';
import { MdOutlineModeEdit } from 'react-icons/md';
import ButtonLoader from '../../loaders/ButtonLoader';
import { addChurchesToUser, getChurchesByZipCode, createChurch } from '../../api/church';
import { isAuthenticated } from '../../api/auth';
import massImage from '../mass_image.png'; // Ensure the path is correct

const MassQuestions = ({
    userChurches,
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
    showMap,
    setShowMap,
    selectedChurch,
    specialIntentions,
    setUserChurches,
}) => {
    const [distance, setDistance] = useState(8046.72); // default 5 miles in meters
    const [nearbyChurches, setNearbyChurches] = useState([]);
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

    const { user, token } = isAuthenticated();

    const addChurchToMassOptions = (church) => {
        setPendingChurches([...pendingChurches, church]);
    };

    const savePendingChurches = async () => {
        try {
            const response = await addChurchesToUser(user._id, pendingChurches, token);
            if (response.error) {
                console.error('Failed to add churches:', response.error);
                return;
            }

            setPendingChurches([]);
            setUserChurches((prevUserChurchList) => [
                ...prevUserChurchList,
                ...response.churches,
            ]);

            setShowChurchForm(false);
        } catch (error) {
            console.error('Error saving pending churches:', error);
        }
    };

    const handleZipCodeSearch = async () => {
        try {
            const churches = await getChurchesByZipCode(zipCode, token);
            setZipCodeChurches(churches);
        } catch (error) {
            console.error('Error fetching churches by zip code:', error);
        }
    };

    const handleManualChurchChange = (e) => {
        setManualChurchData({
            ...manualChurchData,
            [e.target.name]: e.target.value,
        });
    };

    const handleManualChurchSubmit = async (e) => {
        e.preventDefault();
        try {
            const newChurch = await createChurch(manualChurchData, token);
            addChurchToMassOptions(newChurch);
            setManualChurchData({
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
        } catch (error) {
            console.error('Error creating church:', error);
        }
    };

    return (
        <div className="mass-questions">
            <div className="row">
                <div className="col-md-6">
                    <h3>Mass Attendance</h3>
                    <div className="form-group">
                        <form>
                            {userChurches.map(church => (
                                <div key={church._id} className="radio-button-container">
                                    <input 
                                        type="radio" 
                                        id={church._id} 
                                        name="churchSelection" 
                                        value={church._id} 
                                        onChange={handleChurchSelection} 
                                    />
                                    <label htmlFor={church._id}>&nbsp;&nbsp;{church.name}</label>
                                </div>
                            ))}
                        </form>
                        <button 
                            className='btn btn-outline-secondary btn-sm m-1' 
                            onClick={() => setShowChurchForm(true)}
                            title='Add new church'
                        >
                            Add New Church
                        </button>
                        {showChurchForm && (
                            <ChurchForm
                                newChurch={newChurch}
                                handleChurchChange={handleChurchChange}
                                submitNewChurch={submitNewChurch}
                                setShowChurchForm={setShowChurchForm}
                            />
                        )}
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
                    <div className="form-group">
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
                        className="btn btn-primary mt-2" 
                        onClick={handleSubmitMass} 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Mass Attendance'}
                    </button>
                </div>
                <div className="col-md-6">
                    <img src={massImage} alt="Mass" className="mass-image" />
                </div>
            </div>
            <hr />
            <div className="prayer-intentions">
                <h3>Prayer Intentions</h3>
                <button 
                    className="btn btn-outline-secondary mb-3" 
                    onClick={() => setIsAddingIntention(true)}
                >
                    Add New Intention
                </button>
                {isAddingIntention && (
                    <form onSubmit={handleNewIntentionSubmit}>
                        <div className="form-group">
                            <label htmlFor="newIntention">New Intention</label>
                            <textarea
                                id="newIntention"
                                className="form-control"
                                rows="3"
                                value={newIntention}
                                onChange={(e) => setNewIntention(e.target.value)}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary mt-2">Add Intention</button>
                        <button 
                            type="button" 
                            className="btn btn-secondary mt-2 ml-2" 
                            onClick={() => setIsAddingIntention(false)}
                        >
                            Cancel
                        </button>
                    </form>
                )}
                <div className="intention-list mt-3">
                    {prayerIntentions.map((intention) => (
                        <div key={intention._id} className="card mb-2">
                            <div className="card-body">
                                <p>{intention.content}</p>
                                <button 
                                    className="btn btn-outline-primary btn-sm mr-2"
                                    onClick={() => handleEditClick(intention._id, intention.content)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => handleDeleteIntention(intention._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {editingIntentionId && (
                    <form onSubmit={handleUpdateIntention}>
                        <div className="form-group">
                            <label htmlFor="editIntention">Edit Intention</label>
                            <textarea
                                id="editIntention"
                                className="form-control"
                                rows="3"
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary mt-2">Update Intention</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default MassQuestions;
