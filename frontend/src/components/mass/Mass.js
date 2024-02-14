import React, { useState, useEffect } from 'react';
import { getAllIntentions, createIntention, updateIntention, deleteIntention } from '../../api/intentions';
import { createMassAttendance, countMassesByUser } from '../../api/massAttendance'; 
import { createChurch, getAllChurches } from '../../api/church';
import { isAuthenticated } from '../../api/auth';
import { MdOutlineModeEdit } from "react-icons/md";
import massIcon from './mass_icon.png'
import massImage from './mass_image.png'
import './styles.css'

const Mass = () => {
    // State and functions for the Mass component
    const [count, setCount] = useState(0);
    const [prayerIntentions, setPrayerIntentions] = useState([]);
    const [selectedIntentions, setSelectedIntentions] = useState([]);
    const [userChurches, setUserChurches] = useState([]);
    const [isAddingIntention, setIsAddingIntention] = useState(false);
    const [newIntention, setNewIntention] = useState('')

    const [editingIntentionId, setEditingIntentionId] = useState(null); // new state
    const [editContent, setEditContent] = useState(''); // new state to hold the edited content
    const [showChurchForm, setShowChurchForm] = useState(false);
    const [newChurch, setNewChurch] = useState({
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
    const [selectedChurch, setSelectedChurch] = useState(null);
    const [massTime, setMassTime] = useState(new Date()); // You can format this as needed    
    const [specialIntentions, setSpecialIntentions] = useState('')
    const [selectedMassTime, setSelectedMassTime] = useState('');

    const {
        user: { _id },
        token
    } = isAuthenticated();

    const userId = _id;

    const fetchUserChurches = async () => {
        try {
            const response = await getAllChurches(userId, token);
            if (response) {
                setUserChurches(response);
            } else {
                console.error("No churches found");
            }
        } catch (error) {
            console.error("Error fetching churches:", error);
        }
    };

    const fetchIntentions = async () => {
        try {
            const response = await getAllIntentions(userId, "Mass", token);
            if (response) {
                setPrayerIntentions(response);
            } else {
                // Handle case where intentions might not be in the expected format
                setPrayerIntentions([]);
            }
        } catch (error) {
            console.error("Error fetching intentions: ", error);
            setPrayerIntentions([]);
        }
    };
    
    const fetchMassCount = async () => {
        const response = await countMassesByUser(userId);
        if (response) {
            setCount(response.massAttendanceCount);
        }
    };
    
    useEffect(() => {
        fetchIntentions();
        fetchMassCount();
        fetchUserChurches(); // Fetch user churches
    }, [userId]);

    const massTimesOptions = [
        '6:00 A.M.', '6:30 A.M.', '7:00 A.M.', '7:30 A.M.',
        '8:00 A.M.', '8:30 A.M.', '9:00 A.M.', '9:30 A.M.',
        '10:00 A.M.', '10:30 A.M.', '11:00 A.M.', '11:30 A.M.',
        '12:00 P.M.', '12:10 P.M.', '12:30 P.M.', '1:00 P.M.', '1:30 P.M.',
        '2:00 P.M.', '2:30 P.M.', '3:00 P.M.', '3:30 P.M.',
        '4:00 P.M.', '4:30 P.M.', '5:00 P.M.', '5:30 P.M.',
        '6:00 P.M.', '6:30 P.M.', '7:00 P.M.', '7:30 P.M.',
        '8:00 P.M.', '8:30 P.M.', '9:00 P.M.', '9:30 P.M.',
        '10:00 P.M.', '10:30 P.M.', '11:00 P.M.', '11:30 P.M.'
    ];
    
    const handleMassTimeChange = (e) => {
        setSelectedMassTime(e.target.value);
    };
    

    const handleChurchSelection = (e) => {
        setSelectedChurch(e.target.value);
    };
    
    const handleChurchChange = (e) => {
        setNewChurch({ ...newChurch, [e.target.name]: e.target.value });
    };
    
    const submitNewChurch = async (e) => {
        e.preventDefault();
        try {
            const response = await createChurch({ ...newChurch, users: [userId] }, token);
            if (response) {
                setUserChurches([...userChurches, response]);
                setShowChurchForm(false);
                // Reset form fields
                setNewChurch({
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
            }
        } catch (error) {
            console.error("Error creating church:", error);
        }
    };
    
    const submitMassAttendance = async (e) => {
        e.preventDefault();
        if (!selectedChurch) {
            console.error("Please select a church");
            return;
        }
        const attendanceData = {
            user: userId,
            church: selectedChurch,
            massTime: massTime,
            // Add other fields as necessary
        };
        try {
            const response = await createMassAttendance(attendanceData);
            if (response) {
                // Handle successful submission
                console.log("Mass attendance recorded:", response);
            }
        } catch (error) {
            console.error("Error recording mass attendance:", error);
        }
    };

    // const handleNewIntentionSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!newIntention) return;
    
    //     try {
    //         const response = await createIntention({ user: userId, content: newIntention, type: 'Mass' });
    //         if (response) {
    //             // Assuming response contains the newly added intention
    //             setPrayerIntentions([...prayerIntentions, response]);
    //             alert("Intention added successfully"); // Replace with a more user-friendly message or UI element
    //         }
    //         setNewIntention('');
    //         setIsAddingIntention(false);
    //     } catch (error) {
    //         console.error('Error adding new intention:', error);
    //         alert("Failed to add intention"); // Replace with a user-friendly error message in your UI
    //     }
    // };
    
    
    const handleNewIntentionSubmit = async (e) => {
        e.preventDefault();
        if (!newIntention) return;
        try {
            await createIntention({ user: userId, content: newIntention, type: 'Mass' }, token);
            fetchIntentions(); // Re-fetch the intentions
            setNewIntention('');
            setIsAddingIntention(false);
        } catch (error) {
            console.error('Error adding new intention:', error);
        }
    };
    
    const handleIntentionCheckboxChange = (intentionId) => {
        setSelectedIntentions(prevSelected => {
            // Check if the intentionId is already in the selectedIntentions array
            if (prevSelected.includes(intentionId)) {
                // If it is, remove it (uncheck)
                return prevSelected.filter(id => id !== intentionId);
            } else {
                // If it's not, add it (check)
                return [...prevSelected, intentionId];
            }
        });
    };
    

    const handleDeleteIntention = async (intentionId) => {
        // ... delete intention and update state
    };

    const handleUpdateIntention = async (e) => {
        e.preventDefault();
        try {
            await updateIntention(editingIntentionId, { content: editContent }, token);
            fetchIntentions(); // Re-fetch intentions to update the list
            setEditingIntentionId(null); // Reset the editing state
        } catch (error) {
            console.error('Error updating intention:', error);
        }
    };

    const handleEditClick = (intentionId, content) => {
        setEditingIntentionId(intentionId); // Set the currently editing intention's ID
        setEditContent(content); // Set the initial content for editing
    };

    
    const handleSubmitMass = async () => {
        const massData = {
            user: userId,
            church: selectedChurch,
            massTime: selectedMassTime,
            i: selectedIntentions,
            specialIntentions
        };
    
        try {
            const response = await createMassAttendance(massData);
            console.log('Mass created successfully:', response);
            // Handle successful submission (e.g., show a success message, reset the form)
            setSelectedIntentions([])
            setSelectedChurch(null)
            setSelectedMassTime('')
        } catch (error) {
            console.error('Error creating rosary:', error);
            // Handle errors (e.g., show an error message)
        }
    
        setCount(prevCount => prevCount + 1);
    };
    
    return (
        <div className="mass-component container">
            <div className="row">
                <div className="col-3">
                    <img 
                        src={massIcon} 
                        alt="Mass" 
                        className="mass-icon" 
                        style={{
                            height: '55px',
                            width: '55px',
                            cursor: 'pointer'
                        }}
                    />
                </div>
                <div className="col-9">
                    <h1 className="m-1 header-font">
                        Mass
                    </h1>
                </div>
            </div>
            <hr />
            {/* Content of the Mass component */}            
            <div className="row justify-content-center">
                <div className="col-12 col-lg-4">
                    <form onSubmit={submitMassAttendance}>
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
                                        <form onSubmit={submitNewChurch}>
                                            <textarea
                                                rows={ 3 }
                                                name="name" 
                                                placeholder="Church Name" 
                                                className='form-control m-1'
                                                onChange={handleChurchChange}
                                                value={newChurch.name} 
                                                required 
                                            />
                                            <input
                                                type="text"
                                                name="address" 
                                                placeholder="Address" 
                                                className='form-control m-1'
                                                onChange={handleChurchChange}
                                                value={newChurch.address} 
                                            />
                                            <input
                                                type="text"
                                                name="city" 
                                                placeholder="City" 
                                                className='form-control m-1'
                                                onChange={handleChurchChange}
                                                value={newChurch.city} 
                                            />
                                            <input
                                                type="text"
                                                name="state" 
                                                placeholder="State" 
                                                className='form-control m-1'
                                                onChange={handleChurchChange}
                                                value={newChurch.state} 
                                            />
                                            <input
                                                type="text"
                                                name="zipCode" 
                                                placeholder="Zip" 
                                                className='form-control m-1'
                                                onChange={handleChurchChange}
                                                value={newChurch.zipCode} 
                                            />
                                            <input
                                                type="text"
                                                name="phone" 
                                                placeholder="Phone" 
                                                className='form-control m-1'
                                                onChange={handleChurchChange}
                                                value={newChurch.phone} 
                                            />
                                            <input
                                                type="text"
                                                name="website" 
                                                placeholder="Website" 
                                                className='form-control m-1'
                                                onChange={handleChurchChange}
                                                value={newChurch.website} 
                                            />
                                            {/* Add other fields similarly */}
                                            <button className='btn btn-primary btn-sm m-1' type="submit">Create Church</button>
                                            <button className='btn btn-danger btn-sm m-1' onClick={() => setShowChurchForm(false)}>Cancel</button>
                                        </form>
                                    // <div className="form-container">
                                    // </div>
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
                                                                        // className='btn btn-light btn-sm'
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
                        Submit Mass
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

export default Mass;
