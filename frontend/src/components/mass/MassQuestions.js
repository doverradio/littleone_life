import React, { useState } from 'react';
import ChurchForm from './form/ChurchForm';
import MapSection from './form/MapSection';
import { MdOutlineModeEdit } from 'react-icons/md';
import ButtonLoader from '../../loaders/ButtonLoader';
import { addChurchesToUser, getChurchesByZipCode, createChurch } from '../../api/church';
import { useAuth } from '../../api/authHook';

const MassQuestions = ({
    userChurches,
    showChurchForm,
    setShowChurchForm,
    submitNewChurch,
    handleChurchChange,
    newChurch,
    massImage,
    selectedMassTime,
    handleMassTimeChange,
    massTimesOptions,
    prayerIntentions,
    editingIntentionId,
    handleUpdateIntention,
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
    const [editContent, setEditContent] = useState(''); // Ensure editContent is defined

    const { user, token } = useAuth();

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
        <div>
            {/* Content of the Mass component */}
            <div className="row justify-content-center">
                <div className="col-12 col-lg-4">
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
                    <div className="row">
                        <div className="col-12">
                            <button 
                                className='btn btn-outline-secondary btn-sm m-1' 
                                onClick={() => setShowChurchForm(true)}
                                title='Add new church'
                            >
                                <span style={{ fontSize: '10px' }}>Add New Church</span>
                            </button>
                            <div className="form-container">
                                {showChurchForm && (
                                    <ChurchForm
                                        newChurch={newChurch}
                                        handleChurchChange={handleChurchChange}
                                        submitNewChurch={submitNewChurch}
                                        setShowChurchForm={setShowChurchForm}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4">
                    <img 
                        src={massImage} 
                        alt={`Mass Image`} 
                        style={{ width: '250px', height: '250px' }} 
                    />
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-md-5 offset-md-2">
                    <select value={selectedMassTime} onChange={handleMassTimeChange} className="form-control">
                        <option value="">Select Mass Time</option>
                        {massTimesOptions.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-12">
                    <div className="btn-group" role="group">
                        <button 
                            className={`btn ${manualMode ? 'btn-primary' : 'btn-secondary'}`}
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
                        <div className="mt-3">
                            <form onSubmit={handleManualChurchSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control mb-2"
                                    placeholder="Church Name"
                                    value={manualChurchData.name}
                                    onChange={handleManualChurchChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control mb-2"
                                    placeholder="Address"
                                    value={manualChurchData.address}
                                    onChange={handleManualChurchChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="city"
                                    className="form-control mb-2"
                                    placeholder="City"
                                    value={manualChurchData.city}
                                    onChange={handleManualChurchChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="state"
                                    className="form-control mb-2"
                                    placeholder="State"
                                    value={manualChurchData.state}
                                    onChange={handleManualChurchChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="country"
                                    className="form-control mb-2"
                                    placeholder="Country"
                                    value={manualChurchData.country}
                                    onChange={handleManualChurchChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="zipCode"
                                    className="form-control mb-2"
                                    placeholder="Zip Code"
                                    value={manualChurchData.zipCode}
                                    onChange={handleManualChurchChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control mb-2"
                                    placeholder="Phone"
                                    value={manualChurchData.phone}
                                    onChange={handleManualChurchChange}
                                />
                                <input
                                    type="text"
                                    name="website"
                                    className="form-control mb-2"
                                    placeholder="Website"
                                    value={manualChurchData.website}
                                    onChange={handleManualChurchChange}
                                />
                                <textarea
                                    name="additionalInfo"
                                    className="form-control mb-2"
                                    placeholder="Additional Info"
                                    value={manualChurchData.additionalInfo}
                                    onChange={handleManualChurchChange}
                                />
                                <button type="submit" className="btn btn-primary">Add Church</button>
                            </form>
                            <div className="mt-3">
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Zip Code"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                />
                                <button 
                                    className="btn btn-primary mt-2"
                                    onClick={handleZipCodeSearch}
                                >
                                    Search Churches by Zip Code
                                </button>
                            </div>
                            <div className="mt-3">
                                <select 
                                    className="form-control"
                                    onChange={(e) => {
                                        const selectedChurch = zipCodeChurches.find(church => church._id === e.target.value);
                                        if (selectedChurch) addChurchToMassOptions(selectedChurch);
                                    }}
                                >
                                    <option value="">Select Church</option>
                                    {zipCodeChurches.map(church => (
                                        <option key={church._id} value={church._id}>{church.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ) : (
                        <MapSection
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
            </div>
            <hr />
            {/* Intentions Section */}
            <div className="row">
                <div className="col-12">
                    {
                        prayerIntentions.length > 0 ? (
                            <ul style={{ listStyle: 'none' }}>
                                {
                                    prayerIntentions.map(intention => (
                                        <li key={intention._id}>
                                            {
                                                editingIntentionId === intention._id ? (
                                                    <form onSubmit={handleUpdateIntention}>
                                                        <textarea
                                                            rows={5}
                                                            className="form-control"
                                                            value={editContent}
                                                            onChange={(e) => setEditContent(e.target.value)}
                                                        />
                                                        <div className="row my-2">
                                                            <div className="col-12">
                                                                <button type="submit" className="btn btn-primary btn-sm m-1">Save</button>
                                                                <button 
                                                                    className="btn btn-secondary btn-sm m-1" 
                                                                    onClick={() => setEditingIntentionId(null)}
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <button 
                                                                    className='btn btn-danger btn-sm m-1'
                                                                    onClick={() => handleDeleteIntention(intention._id)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                ) : (
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-1">
                                                                <input 
                                                                    type="checkbox" 
                                                                    checked={selectedIntentions.includes(intention._id)}
                                                                    onChange={() => handleIntentionCheckboxChange(intention._id)}
                                                                />
                                                            </div>
                                                            <div className="col-9">
                                                                <p style={{ fontSize: '12px', textAlign: 'left', wordBreak: 'break-word' }}>
                                                                    {intention.content}
                                                                </p>
                                                            </div>
                                                            <div className="col-1">
                                                                <span 
                                                                    onClick={() => handleEditClick(intention._id, intention.content)}
                                                                    style={{ fontSize: '9px'}}
                                                                >
                                                                    <MdOutlineModeEdit />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                        ) 
                        : 
                        <p>
                            No intentions added yet.
                        </p>
                    }
                </div>
            </div>
            {/* Form to Add New Intention */}
            <div className="row">
                <div className="col-12">
                    {isAddingIntention ? (
                        <form onSubmit={handleNewIntentionSubmit}>
                            <textarea 
                                className='form-control m-1'
                                value={newIntention}
                                onChange={(e) => setNewIntention(e.target.value)} 
                            />
                            <button type="submit" className='btn btn-outline-secondary btn-sm'>Add</button>
                        </form>
                    ) : (
                        <button className="btn btn-outline-secondary btn-sm" onClick={() => setIsAddingIntention(true)}>
                            Add intention
                        </button>
                    )}
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <textarea 
                        rows={ 3 }
                        className="form-control m-1"
                        placeholder='Special Intentions'
                        onChange={ e => setSpecialIntentions( e.target.value ) }
                    />
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-12">
                    <button 
                        className='btn btn-primary btn-block m-1' 
                        type="submit"
                        onClick={ e => {
                            e.preventDefault()
                            handleSubmitMass()
                        }}
                    >
                        {isSubmitting ? <ButtonLoader /> : `Submit Mass`}
                    </button>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12">
                    <p>You have attended {count} masses.</p>
                </div>
            </div>
        </div>
    );
};

export default MassQuestions;