import React, { useState, useEffect } from 'react';
import { getAllIntentions, createIntention, updateIntention, deleteIntention } from '../../api/intentions';
import { createRosary, getRosaryCountByUser } from '../../api/rosary';
import { isAuthenticated } from '../../api/auth';
import { MdOutlineModeEdit } from "react-icons/md";
import rosaryIcon from './rosary_icon.png'; // Adjust the path to where your icon is stored
import luminousImage from './luminous.jpg';
import sorrowfulImage from './sorrowful.jpg';
import gloriousImage from './glorious.jpg';
import joyfulImage from './joyful.jpg';
import './styles.css'

// Define the Rosary component
const Rosary = () => {
    // State to keep track of the number of rosaries prayed
    const [count, setCount] = useState(0);
    const [selectedMystery, setSelectedMystery] = useState('Luminous');
    const [prayerIntentions, setPrayerIntentions] = useState([]);
    const [selectedIntentions, setSelectedIntentions] = useState([]);
    const [isAddingIntention, setIsAddingIntention] = useState(false);
    const [newIntention, setNewIntention] = useState('')

    const [editingIntentionId, setEditingIntentionId] = useState(null); // new state
    const [editContent, setEditContent] = useState(''); // new state to hold the edited content

    const {
        user: { _id }
    } = isAuthenticated();

    const userId = _id;
    
    const fetchIntentions = async () => {
        try {
            const response = await getAllIntentions(userId);
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

    
    const fetchRosaryCount = async () => {
        const response = await getRosaryCountByUser(userId);
        if (response) {
            setCount(response.rosaryCount);
        }
    };
    
    useEffect(() => {
        fetchIntentions();
        fetchRosaryCount();
    }, [userId]);

    // Define the mysteries and their associated images
    const mysteries = [
        { name: 'Luminous', image: luminousImage },
        { name: 'Sorrowful', image: sorrowfulImage },
        { name: 'Glorious', image: gloriousImage },
        { name: 'Joyful', image: joyfulImage }
    ];

    
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
    

    const handleSubmitNewIntention = async () => {
        // ... submit new intention to the backend
        try {
            const response = await createIntention({ user: userId, content: newIntention, type: 'Rosary' });
            setNewIntention(''); // Reset the new intention input
            setIsAddingIntention(false); // Close the add intention input field
    
            // Re-fetch intentions to update the list with the newly added intention
            fetchIntentions();
        } catch (error) {
            console.error('Error adding new intention:', error);
            // Optionally, handle the error (e.g., show an error message)
        }
    };

    const handleEditIntention = async (intentionId, newContent) => {
        // ... submit edited intention to the backend
    };

    const handleDeleteIntention = async (intentionId) => {
        // ... delete intention and update state
    };

    const handlePrayRosary = async () => {
        const rosaryData = {
            userId,
            mystery: selectedMystery,
            intentions: selectedIntentions,
            // Include 'recording' if you have implemented this feature
        };
    
        try {
            const response = await createRosary(rosaryData.userId, rosaryData.mystery, rosaryData.intentions, rosaryData.recording);
            console.log('Rosary created successfully:', response);
            // Handle successful submission (e.g., show a success message, reset the form)
        } catch (error) {
            console.error('Error creating rosary:', error);
            // Handle errors (e.g., show an error message)
        }
    
        setCount(prevCount => prevCount + 1);
    };
    
    
    const handleMysteryChange = (event) => {
        setSelectedMystery(event.target.value);
    };

    const addPrayerIntention = () => {
        setIsAddingIntention(true); // Show the form for adding a new intention
    };

    const handleNewIntentionChange = (e) => {
        setNewIntention(e.target.value);
    };

    
    const handleNewIntentionSubmit = async (e) => {
        e.preventDefault();
        if (!newIntention) return;
        try {
            await createIntention({ user: userId, content: newIntention, type: 'Rosary' });
            fetchIntentions(); // Re-fetch the intentions
            setNewIntention('');
            setIsAddingIntention(false);
        } catch (error) {
            console.error('Error adding new intention:', error);
        }
    };
    
    const handleMysteryDivClick = (mysteryName) => {
        setSelectedMystery(mysteryName);
    };
    
    const handleMysteryClick = (mysteryName) => {
        setSelectedMystery(mysteryName);
    };

    
    const handleEditClick = (intentionId, content) => {
        setEditingIntentionId(intentionId); // Set the currently editing intention's ID
        setEditContent(content); // Set the initial content for editing
    };

    const handleUpdateIntention = async (e) => {
        e.preventDefault();
        try {
            await updateIntention(editingIntentionId, { content: editContent });
            fetchIntentions(); // Re-fetch intentions to update the list
            setEditingIntentionId(null); // Reset the editing state
        } catch (error) {
            console.error('Error updating intention:', error);
        }
    };

    // Render the component
    return (
        <div className="rosary-component">
            <div className="row">
                <div className="col-3">
                    <img 
                        src={rosaryIcon} 
                        alt="Rosary" 
                        className="rosary-icon" 
                        style={{
                            height: '55px',
                            width: '55px',
                            cursor: 'pointer'
                        }}
                    />
                </div>
                <div className="col-9">
                    <h1 className="m-1">
                        Rosary
                    </h1>
                </div>
            </div>
            <hr />
            
            <h2 className='text-center fancy-font'>{selectedMystery ? selectedMystery : 'Select Mystery'}</h2>

            <div className="mysteries-row" style={{ 
                display: 'flex', 
                justifyContent: 'space-around', // Adjust to 'space-around' for better spacing
                flexWrap: 'nowrap', // Prevent wrapping
            }}>
                {mysteries.map((mystery, index) => (
                    <div 
                        key={index}
                        onClick={() => handleMysteryClick(mystery.name)}
                        style={{ 
                            cursor: 'pointer',
                            border: selectedMystery === mystery.name ? '2px solid blue' : 'none',
                            textAlign: 'center',
                            margin: '5px',
                            flex: '1 0 20%', // Adjust the flex grow, shrink, and basis
                            borderRadius: '15%'
                        }}
                    >
                        <img 
                            src={mystery.image} 
                            alt={mystery.name} 
                            style={{ height: '50px', width: '50px', borderRadius: '15%' }}
                        />
                        <p className="fancy-font">{mystery.name}</p>
                    </div>
                ))}
            </div>
            <hr />
            <h2>Prayer Intentions</h2>
            {prayerIntentions.length > 0 ? (
                <ul style={{ listStyle: 'none' }}>
                    {prayerIntentions.map(intention => (
                        <li key={intention._id}>
                            {editingIntentionId === intention._id ? (
                                <form onSubmit={handleUpdateIntention}>
                                    <textarea
                                        rows={5}
                                        className="form-control"
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                    />
                                    <button type="submit" className="btn btn-primary btn-sm">Save</button>
                                    <button 
                                        className="btn btn-secondary btn-sm" 
                                        onClick={() => setEditingIntentionId(null)}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        className='btn btn-danger btn-sm'
                                        onClick={() => handleDeleteIntention(intention._id)}
                                    >
                                        Delete
                                    </button>
                                </form>
                            ) : (
                                <div className="container">
                                    <div className="row">
                                        <div className="col-2">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedIntentions.includes(intention._id)}
                                                onChange={() => handleIntentionCheckboxChange(intention._id)}
                                            />
                                        </div>
                                        <div className="col-9">
                                            <p style={{ fontSize: '12px' }}>
                                                {intention.content}
                                            </p>
                                        </div>
                                        <div className="col-1">
                                            <span 
                                                className='btn btn-light btn-sm'
                                                onClick={() => handleEditClick(intention._id, intention.content)}
                                            >
                                                <MdOutlineModeEdit />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : <p>No intentions added yet.</p>}


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
                <button className="btn btn-outline-secondary btn-sm" onClick={addPrayerIntention}>
                    Add intention
                </button>
            )}
            <hr />
            <button 
                onClick={handlePrayRosary} 
                className="pray-rosary-btn btn btn-primary btn-block"
            >
                Submit
            </button>
            <p>You have prayed {count} rosaries.</p>
        </div>
    );
};

export default Rosary;
