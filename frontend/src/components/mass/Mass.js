import React, { useState, useEffect } from 'react';
import { getAllIntentions, createIntention, updateIntention, deleteIntention } from '../../api/intentions';
import { createMassAttendance, countMassesByUser } from '../../api/massAttendance'; 
import { createChurch, getAllChurches } from '../../api/church';
import { isAuthenticated } from '../../api/auth';
import { MdOutlineModeEdit } from "react-icons/md";
import massIcon from './mass_icon.png'
import massImage from './mass_image.png'
import novusOrdoImage from './novus_ordo.jpg'
import latinMassImage from './latin_mass.jpg'
import './styles.css'
import ToggleSlider from '../utils/ToggleSlider';
import { useModal } from '../../context/ModalContext';
import ButtonLoader from '../../loaders/ButtonLoader';
const log = console.log;

const Mass = () => {
    const { toggleModal } = useModal();

    // State and functions for the Mass component
    const [count, setCount] = useState(0);
    const [prayerIntentions, setPrayerIntentions] = useState([]);
    const [selectedIntentions, setSelectedIntentions] = useState([]);
    const [userChurches, setUserChurches] = useState([]);
    const [isAddingIntention, setIsAddingIntention] = useState(false);
    const [newIntention, setNewIntention] = useState('')
    const [isEmailEnabled, setIsEmailEnabled] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
    const [activeTab, setActiveTab] = useState('Questions');

    const DEFAULT_FONT_SIZE = 11; // Default font size in px
    const MAX_FONT_SIZE = 33; // Max font size in px
    const MIN_FONT_SIZE = 11; // Min font size in px
    const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);

    const {
        user: { _id },
        token
    } = isAuthenticated();

    // log(`Mass.js token: `, token)

    const userId = _id;
    
    const increaseFontSize = () => {
        setFontSize(currentSize => Math.min(currentSize + 1, MAX_FONT_SIZE));
    };

    const decreaseFontSize = () => {
        setFontSize(currentSize => Math.max(currentSize - 1, MIN_FONT_SIZE));
    };
    
    // You can remove the handleEmailToggle function or leave it for future implementation
    const handleEmailToggle = () => {
        // Future email functionality logic
    };

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
        const response = await countMassesByUser(userId, token);
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
        setIsSubmitting(true); // Set submitting to true
        const massData = {
            user: userId,
            church: selectedChurch,
            massTime: selectedMassTime,
            i: selectedIntentions,
            specialIntentions
        };
    
        try {
            await createMassAttendance(massData, token);
            // console.log('Mass created successfully:', response);
            // Handle successful submission (e.g., show a success message, reset the form)
            setSelectedIntentions([])
            setSelectedChurch(null)
            setSelectedMassTime('')
            
            toggleModal('mass'); // Close modal after successful submission
        } catch (error) {
            console.error('Error creating rosary:', error);
            // Handle errors (e.g., show an error message)
        }
    
        setIsSubmitting(false); // Set submitting to false after response is received
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
            <div className="tab-navigation">
                <a href="#!" className={activeTab === 'Questions' ? 'active' : ''} onClick={() => setActiveTab('Questions')}>Questions</a>
                <a href="#!" className={activeTab === 'Prayers' ? 'active' : ''} onClick={() => setActiveTab('Prayers')}>Prayers</a>
                <a href="#!" className={activeTab === 'Responses' ? 'active' : ''} onClick={() => setActiveTab('Responses')}>Responses</a>
                <a href="#!" className={activeTab === 'Settings' ? 'active' : ''} onClick={() => setActiveTab('Settings')}>Settings</a>

            </div>

            <hr />
            
            <div>
                {activeTab === 'Questions' && (
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
                                    
                                    
                                    {
                                        isSubmitting ?
                                        <ButtonLoader />
                                        : `Submit Mass`
                                    }
                                </button>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-12">
                                <p>You have attended {count} masses.</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'Prayers' && (
                    <>
                        {/* Content for Prayers */}
                        <div className="container">
                                
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

                            <div className="row mb-5">
                                <div className="col-12">
                                    <h2 style={{ fontSize: '25px' }} className="text-center m-1">
                                        Guide to the Catholic Mass
                                    </h2>
                                    <p style={{ fontSize: `${fontSize}px` }}>
                                        Are you new to the Traditional Latin Mass or Novus Ordo? Our concise and straightforward beginner's guide 
                                        to the Catholic Mass offers an effortless way for you to engage in prayer during the service.
                                    </p>
                                    {/* <div className='mb-3'>
                                        <img 
                                            src={massImage}
                                            style={{ maxHeight: '300px', maxWidth: '300px' }}
                                            alt="mass image" 
                                        />
                                    </div>
                                     */}

                                    <div className='mb-3'>
                                        <div>
                                            <h2 className="text-center m-1">
                                                Novus Ordo
                                            </h2>
                                        </div>
                                        <img 
                                            src={novusOrdoImage}
                                            style={{ maxHeight: '80vh', maxWidth: '80vw' }}
                                            alt="novus ordo image" 
                                        />
                                    </div>
                                    <hr />
                                    <div className='mb-3'>
                                        <div>
                                            <h2 className="text-center m-1">
                                                Latin Mass
                                            </h2>
                                        </div>
                                        <img 
                                            src={latinMassImage}
                                            style={{ maxHeight: '80vh', maxWidth: '80vw' }}
                                            alt="latin mass image" 
                                        />
                                    </div>
                                    
                                    {/* <div>
                                        <h2 className="text-center m-1">
                                            Mass Prayers
                                        </h2>
                                    </div>
                                    <div className='' style={{ textAlign: 'left', fontSize: `${fontSize}px` }}>
                                        <p>
                                            1a. <strong>Begin with the Sign of the Cross:</strong><br />
                                            <span style={{ color: 'blue' }}>    
                                                In the name of the Father, and of the Son, and of the Holy Spirit. Amen.
                                            </span>
                                        </p>
                                        <p>
                                            1b. <strong>Holding the Crucifix:</strong> Start by reciting the Apostles' Creed, an affirmation of faith: <br />
                                            <span style={{ color: 'blue' }}>    
                                                I believe in God, the Father Almighty, Creator of Heaven and earth; and in Jesus Christ, 
                                                His only Son, Our Lord, Who was conceived by the Holy Ghost, born of the Virgin Mary, suffered under Pontius Pilate, 
                                                was crucified; died, and was buried. He descended into Hell; the third day He arose again from the dead; He ascended 
                                                into Heaven, sitteth at the right hand of God, the Father Almighty; from thence He shall come to judge the living and 
                                                the dead. I believe in the Holy Spirit, the holy Catholic Church, the communion of saints, the forgiveness of sins, 
                                                the resurrection of the body, and the life everlasting. Amen.
                                            </span>
                                        </p>
                                        <p>
                                            2. <strong>Our Father:</strong> Recite the 'Our Father' prayer:<br />
                                            <span style={{ color: 'blue' }}>    
                                                Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. 
                                                Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead 
                                                us not into temptation, but deliver us from evil, Amen.
                                            </span>
                                        </p>
                                        <p>
                                            3. <strong>Say 3 Hail Marys:</strong> For each bead of the next three beads, say the 'Hail Mary' prayer: <br />
                                            <span style={{ color: 'blue' }}>    
                                                Hail Mary, full of grace. The Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. 
                                                Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death, Amen.
                                            </span>
                                        </p>
                                        <p>
                                            4. <strong>Glory be to the Father and Fatima Prayer:</strong> Conclude this introductory portion with the 'Glory Be' prayer and 'Fatima' prayer. <br />
                                            <strong>Glory be:</strong>&nbsp;
                                            <span style={{ color: 'blue' }}>    
                                                Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.
                                            </span>
                                            <br />
                                            <br />
                                            <strong>Fatima Prayer:</strong>&nbsp;
                                            <span style={{ color: 'blue' }}>    
                                                O my Jesus, forgive us our sins, save us from the fires of hell; lead all souls to heaven especially those who are in most need of Your mercy. Amen.
                                            </span>
                                        </p>
                                        <p>
                                            5. <strong>Announce the First Mystery:</strong> Then say the Fatima prayer Our Father : <br />
                                            <span style={{ color: 'blue' }}>    
                                                Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.
                                            </span>
                                        </p>
                                        <p>
                                            6. <strong>On the Ten Small Beads of Each Decade:</strong> For each bead in the decade, contemplate the announced Mystery and recite the 'Hail Mary.'  <br />
                                            
                                        </p>
                                        <p>
                                            7. <strong>Glory be to the Father and Fatima Prayer:</strong> After each decade say the Glory Be and Fatima prayer, requested by the Blessed Virgin Mary at Fatima.  <br />
                                            
                                        </p>
                                        <p>
                                            8. <strong>Announce the Second Mystery:</strong> Then say the Our Father. Repeat 6 and 7 and continue with the Third, Fourth, and Fifth Mysteries in the same manner. <br />
                                            
                                        </p>
                                        <p>
                                            9. <strong>Hail, Holy Queen:</strong> After saying the five decades, say the Hail, Holy Queen, followed by this dialogue and prayer: <br />
                                            <span style={{ color: 'blue' }}>    
                                                Hail, Holy Queen, Mother of Mercy, our life, our sweetness and our hope, to thee do we cry, poor banished children of Eve; to thee do we send up our 
                                                sighs, mourning and weeping in this vale of tears; turn, then, most gracious Advocate, thine eyes of mercy toward us, and after this, our exile, show 
                                                unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary! Pray for us, O holy Mother of God, that we may be made worthy 
                                                of the promises of Christ.
                                            </span>
                                        </p>
                                        <p>
                                            <strong>Optional prayers:</strong> <br />
                                            After saying the the Hail, Holy Queen, you may optionally say these prayers before stating your prayer intentions: <br />
                                            <span style={{ color: 'blue' }}>    
                                                O God, whose Only Begotten Son, by his life, Death, and Resurrection, has purchased for us the rewards of eternal life, grant, we beseech thee, that while 
                                                meditating on these mysteries of the most holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise, through the 
                                                same Christ our Lord. Amen.
                                            </span>
                                            <br />
                                            <br />
                                            <strong>Prayer to the Holy Spirit:</strong><br />
                                            <span style={{ color: 'blue' }}>    
                                            Come, Holy Spirit, fill the hearts of your faithful
                                            and kindle in them the fire of your love.

                                            Send forth your Spirit and they shall be created,
                                            and you shall renew the face of the earth.

                                            Let us pray.

                                            O God, who have taught the hearts of the faithful
                                            by the light of the Holy Spirit,
                                            grant that in the same Spirit we may be truly wise
                                            and ever rejoice in his consolation.
                                            Through Christ our Lord. Amen.
                                            </span>


                                        </p>
                                        <h3 className='text-center mb-5' style={{ fontSize: '25px' }}>Conclude the Rosary with the Sign of the Cross.</h3>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 'Responses' && (
                    <div>
                        <div className="container mt-5">
                            <div className="row my-3">
                                <div className="col-12">
                                    <p style={{ fontWeight: 'bold' }}>Total: {count} Masses</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* <PieChartMysteries data={formattedChartData} /> */}


                        {/* Add your legend or additional components here */}
                        {/* Legend for Pie Chart */}
                    </div>
                )}
                {activeTab === 'Settings' && (
                    <div>
                        {/* Content for Settings */}
                        <div className="email-toggle">
                            <ToggleSlider 
                            isEnabled={isEmailEnabled} 
                            toggleFunction={handleEmailToggle} 
                            componentName="Mass"
                            isDisabled={true} // Disable the toggle
                            />
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
};

export default Mass;
