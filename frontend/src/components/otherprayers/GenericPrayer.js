import React, { useState, useEffect } from 'react';
import { MdOutlineModeEdit } from 'react-icons/md';
import { isAuthenticated } from '../../api/auth';
import { createIntention, getAllIntentions, updateIntention } from '../../api/intentions';
import ToggleSlider from '../utils/ToggleSlider';
const log = console.log;

const GenericPrayer = ({ prayerTitle, prayerText, iconSrc, onIntentionChange, prayerType, showIntentions }) => {
    const [newIntention, setNewIntention] = useState('');
    const [localIntentions, setLocalIntentions] = useState( []);
    const [editingIntentionId, setEditingIntentionId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [isAddingIntention, setIsAddingIntention] = useState(false);
    const [intentions, setIntentions] = useState([]);
    const [selectedIntentions, setSelectedIntentions] = useState([]);
    const [isEmailEnabled, setIsEmailEnabled] = useState(false);
    
    const [activeTab, setActiveTab] = useState('Questions');

    const DEFAULT_FONT_SIZE = 13; // Default font size in px
    const MAX_FONT_SIZE = 33; // Max font size in px
    const MIN_FONT_SIZE = 11; // Min font size in px
    const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
    
    const {
        user: { _id },
        token
    } = isAuthenticated();

    const userId = _id;

    
    const increaseFontSize = () => {
        setFontSize(currentSize => Math.min(currentSize + 1, MAX_FONT_SIZE));
    };

    const decreaseFontSize = () => {
        setFontSize(currentSize => Math.max(currentSize - 1, MIN_FONT_SIZE));
    };
    
    const handleEmailToggle = () => {
        // Future email functionality logic
    };

    
    const handleIntentionInteraction = (intentionId, actionType) => {
        // Handle different actions like edit, delete, etc.
        // Call onIntentionChange to notify parent component about changes
    };

    
    // Intentions functions
    const fetchIntentions = async () => {
        try {
            const response = await getAllIntentions(userId, prayerType, token); // Adjust parameters as needed
            setIntentions(response);
        } catch (error) {
            console.error("Error fetching intentions:", error);
        }
    };


    useEffect(() => {
        // setLocalIntentions(intentions || []);
        fetchIntentions();
    }, []);

    
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

    const handleNewIntentionSubmit = async (e) => {
        e.preventDefault();
        if (!newIntention) return;
        try {
            await createIntention({ user: userId, content: newIntention, type: prayerType }, token);
            fetchIntentions(); // Re-fetch the intentions
            setNewIntention('');
            setIsAddingIntention(false);
        } catch (error) {
            console.error('Error adding new intention:', error);
        }
    };
    

    const renderIntentions = () => {
        if (!intentions || intentions.length === 0 && showIntentions === true ) {
            return <p>No intentions added yet.</p>;
        }
        else if ( intentions || intentions.length > 0 && showIntentions === true )
        {
            return (
                <ul style={{ listStyle: 'none' }}>
                    {intentions.map((intention, index) => (
                        <li key={intention.id || index}>
                            {editingIntentionId === intention.id ? (
                                // Edit Intention Form
                                <form onSubmit={() => handleUpdateIntention(intention.id)}>
                                    <textarea
                                        rows={5}
                                        className="form-control"
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                    />
                                    <button type="submit" className="btn btn-primary btn-sm m-1">Save</button>
                                    <button 
                                        className="btn btn-secondary btn-sm m-1" 
                                        onClick={() => setEditingIntentionId(null)}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        className='btn btn-danger btn-sm m-1'
                                        onClick={() => handleDeleteIntention(intention.id)}
                                    >
                                        Delete
                                    </button>
                                </form>
                            ) : (
                                // Display Intention
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
                            )}
                        </li>
                    ))}
                </ul>
            );
        }
        else if ( showIntentions === false ) {
            return null
        }

    };
    
    const handleEditClick = (id, content) => {
        setEditingIntentionId(id);
        setEditContent(content);
    };
    const handleDeleteIntention = async (intentionId) => {
        // ... delete intention and update state
    };

    const handleAddIntention = () => {
        if(newIntention.trim() !== '') {
            // Update the localIntentions state
            setLocalIntentions([...localIntentions, { content: newIntention }]);
            setNewIntention(''); // Reset the input field
    
            // Call onIntentionChange to notify parent component about changes
            onIntentionChange([...localIntentions, { content: newIntention }]);
        }
    };
    
    const renderContent = () => {
        switch (activeTab) {
            case 'Questions':
                return <>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                
                                {/* Form to Add New Intention */}
                                <div>
                                    {isAddingIntention && showIntentions === true? (
                                        <form onSubmit={handleNewIntentionSubmit}>
                                            <textarea 
                                                className='form-control m-1'
                                                value={newIntention}
                                                onChange={(e) => setNewIntention(e.target.value)} 
                                            />
                                            <button type="submit" className='btn btn-outline-secondary btn-sm'>Add</button>
                                        </form>
                                    ) : showIntentions === true ? (
                                        <button onClick={() => setIsAddingIntention(true)} className="btn btn-outline-secondary btn-sm m-2">
                                            Add Intention
                                        </button>
                                    ) : <div>After saying the prayer, click Submit Prayer below.</div>
                                }
                                </div>
                                {renderIntentions()}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-12">
                                <button 
                                    onClick={handleSubmitPrayer}
                                    className='btn btn-primary btn-block m-1'
                                >
                                    Submit Prayer
                                </button>
                            </div>
                        </div>
                    </div>
                </>;
            case 'Prayers':
                return <>
                    {/* Font Size Controls */}
                    <div className="text-size-controls">
                        {/* <div>
                            <p>Text Size</p>
                        </div> */}
                        Text Size
                        <button 
                            onClick={decreaseFontSize}
                            className='btn btn-outline-secondary btn-sm m-1'
                        >
                            -
                        </button>
                        <button 
                            onClick={increaseFontSize}
                            className='btn btn-outline-secondary btn-sm m-1'
                        >
                            +
                        </button>
                    </div>
                    {
                    prayerText({
                        fontSize: fontSize, 
                        increaseFontSize: increaseFontSize, 
                        decreaseFontSize: decreaseFontSize
                        })
                    }
                </>;
            case 'Responses':
                return <div>Responses Content</div>;
            case 'Settings':
                return <div>
                    
                    <div>
                        {/* Content for Settings */}
                        <div className="email-toggle">
                            <ToggleSlider 
                            isEnabled={isEmailEnabled} 
                            toggleFunction={handleEmailToggle} 
                            componentName="Mass"
                            isDisabled={true} 
                            />
                        </div>
                    </div>
                </div>;
            default:
                return null;
        }
    };


    const handleSubmitPrayer = async () => {
        // Logic to handle submission of the prayer session
        const prayerData = {
            // ... Data to be sent to backend
        };
        try {
            // await createPrayerSession(prayerData);
            log(`Clicked handleSubmitPrayer!`)
            // Handle success
        } catch (error) {
            log(`handleSubmitPrayer error: `, error)
        }
    };

    const classNames = `btn btn`

    return (
        <div className="generic-prayer-container">
            <img 
                src={iconSrc} 
                alt={prayerTitle} 
                className="prayer-icon"
                style={{
                    height: '220px',
                    width: '220px'
                }}
            />
            <h1>{prayerTitle}</h1>
            
            <hr />

            {/* Tab Navigation */}
            <div className="tab-navigation">
                <a href="#!" className={activeTab === 'Questions' ? 'active' : ''} onClick={() => setActiveTab('Questions')}>Questions</a>
                <a href="#!" className={activeTab === 'Prayers' ? 'active' : ''} onClick={() => setActiveTab('Prayers')}>Prayers</a>
                <a href="#!" className={activeTab === 'Responses' ? 'active' : ''} onClick={() => setActiveTab('Responses')}>Responses</a>
                <a href="#!" className={activeTab === 'Settings' ? 'active' : ''} onClick={() => setActiveTab('Settings')}>Settings</a>
            </div>
            
            <hr />
            
            <div className="tab-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default GenericPrayer;
