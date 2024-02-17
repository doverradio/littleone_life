import React, { useState, useEffect } from 'react';
// import { getAllIntentions, createIntention, updateIntention, deleteIntention } from '../../api/intentions';
// import { createMassAttendance, countMassesByUser } from '../../api/massAttendance'; 
import { createConfession, getAllConfessions } from '../../api/confession';
import { isAuthenticated } from '../../api/auth';
import { MdOutlineModeEdit } from "react-icons/md";
import confessionIcon from './confession_icon.png'
import confessionImage from './confession_image.png'
import ToggleSlider from '../utils/ToggleSlider';
import { useModal } from '../../context/ModalContext';
import './styles.css'
import { createChurch, getAllChurches } from '../../api/church';

const Confession = () => {
    
    const { toggleModal } = useModal();

    const [lastConfessionDate, setLastConfessionDate] = useState('');
    const [daysSinceLastConfession, setDaysSinceLastConfession] = useState(0);
    const [activeTab, setActiveTab] = useState('Questions');
    const [hasConfessions, setHasConfessions] = useState(true);


    const [userChurches, setUserChurches] = useState([]);
    const [selectedChurch, setSelectedChurch] = useState(null);
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
    const [isAddingChurch, setIsAddingChurch] = useState(false);
    const [confessionTime, setConfessionTime] = useState('');

    const handleDateChange = (event) => {
        setLastConfessionDate(event.target.value);
        calculateDaysSince(event.target.value);
    };

    const {
        user: { _id },
        token
    } = isAuthenticated();

    const userId = _id;

    const calculateDaysSince = (confessionTime) => {
        const lastConfession = new Date(confessionTime);
        const today = new Date();
        const diffTime = Math.abs(today - lastConfession);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysSinceLastConfession(diffDays);
    };
    
    const DEFAULT_FONT_SIZE = 11; // Default font size in px
    const MAX_FONT_SIZE = 33; // Max font size in px
    const MIN_FONT_SIZE = 11; // Min font size in px
    const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
    
    const increaseFontSize = () => {
        setFontSize(currentSize => Math.min(currentSize + 1, MAX_FONT_SIZE));
    };

    const decreaseFontSize = () => {
        setFontSize(currentSize => Math.max(currentSize - 1, MIN_FONT_SIZE));
    };

    const fetchUserConfessions = async () => {
        try {
            const response = await getAllConfessions(_id, token);
            if (response && response.length > 0) {
                const sortedConfessions = response.sort((a, b) => new Date(b.confessionTime) - new Date(a.confessionTime));
                const lastConfession = sortedConfessions[0];
                calculateDaysSince(lastConfession.confessionTime);
                setLastConfessionDate(lastConfession.confessionTime);
                setHasConfessions(true);
            } else {
                setHasConfessions(false);
            }
        } catch (error) {
            console.error("Error fetching confessions:", error);
        }
    };
    
    
    // Fetch user's churches
    const fetchUserChurches = async () => {
        try {
            const response = await getAllChurches(_id, token);
            if (response) {
                setUserChurches(response);
            } else {
                console.error("No churches found");
            }
        } catch (error) {
            console.error("Error fetching churches:", error);
        }
    };

    // Fetch user churches on component mount
    useEffect(() => {
        fetchUserChurches();
        fetchUserConfessions();
    }, []);

    // Handle church selection
    const handleChurchSelection = (e) => {
        setSelectedChurch(e.target.value);
    };

    // Handle new church form changes
    const handleChurchChange = (e) => {
        setNewChurch({ ...newChurch, [e.target.name]: e.target.value });
    };

    // Submit new church
    const submitNewChurch = async (e) => {
        e.preventDefault();
        try {
            const response = await createChurch({ ...newChurch, users: [_id] }, token);
            if (response) {
                setUserChurches([...userChurches, response]);
                setIsAddingChurch(false);
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

    // Submit confession
    const handleSubmitConfession = async () => {
        if (!selectedChurch) {
            alert("Please select a church");
            return;
        }

        const confessionData = {
            user: _id,
            church: selectedChurch,
            confessionTime: confessionTime
        };

        try {
            const response = await createConfession(confessionData, token);
            if (response) {
                console.log("Confession recorded:", response);
                // Reset state and update UI as needed
            }
        } catch (error) {
            console.error("Error recording confession:", error);
        }
        
        toggleModal('confession'); // Close modal after successful submission
    };
                  
    return (
        
        <div className="confession-component container">
            <div className="row">
                <div className="col-3">
                    <img 
                        src={confessionIcon} 
                        alt="Confession" 
                        className="confession-icon" 
                        style={{
                            height: '55px',
                            width: '55px',
                            cursor: 'pointer'
                        }}
                    />
                </div>
                <div className="col-9">
                    <h1 className="m-1 header-font">
                        Confession
                    </h1>
                </div>
            </div>
            <hr />

            {/* Tab Navigation */}
            <div className="tab-navigation">
                <a href="#!" className={activeTab === 'Questions' ? 'active' : ''} onClick={() => setActiveTab('Questions')}>Questions</a>
                <a href="#!" className={activeTab === 'Prayers' ? 'active' : ''} onClick={() => setActiveTab('Prayers')}>Prayers</a>
                <a href="#!" className={activeTab === 'Responses' ? 'active' : ''} onClick={() => setActiveTab('Responses')}>Responses</a>
                <a href="#!" className={activeTab === 'Settings' ? 'active' : ''} onClick={() => setActiveTab('Settings')}>Settings</a>

            </div>

            <hr />

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'Questions' && (
                    <div className='container'>
                        {/* Content for Questions tab */}
                        
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
                                                        <button className='btn btn-primary btn-sm m-1' type="submit">Create Church</button>
                                                        <button className='btn btn-danger btn-sm m-1' onClick={() => setShowChurchForm(false)}>Cancel</button>
                                                    </form>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4">
                                <img 
                                    src={confessionImage} 
                                    alt={`Confession Image`} 
                                    style={{ width: '220px', height: '220px' }} 
                                />
                            </div>
                        </div>
                        <hr />
                        <form>
                            <div className="row form-group">
                                <div className="col-md-4">
                                    <label htmlFor="confessionTime" className="col-form-label">Confession Time:</label>
                                </div>
                                <div className="col-md-8">
                                    <input 
                                        type="datetime-local" 
                                        className="form-control" 
                                        id="confessionTime" 
                                        value={confessionTime} 
                                        onChange={(e) => setConfessionTime(e.target.value)}
                                    />
                                </div>
                            </div>
                                
                            <div className="text-center" style={{ marginBottom: '20px' }}>
                                <button 
                                    type="button" 
                                    className="btn btn-primary btn-block"
                                    onClick={handleSubmitConfession}
                                >
                                    Submit Confession
                                </button>
                            </div>
                            
                        </form>
                        
                        <div className="confession-count">
                            {hasConfessions ? (
                                <p>Days since last confession: {daysSinceLastConfession}</p>
                            ) : (
                                <p style={{ fontWeight: 'bold' }}>Please go to confession and enter your first one above.</p>
                            )}
                        </div>
                    </div>
                )}
                {activeTab === 'Prayers' && (
                    <div>
                        {/* Content for Prayers tab */}
                            {/* Font Size Controls */}
                            <div className="text-size-controls">
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
                                        Guide to a Catholic Confession
                                    </h2>
                                    <p style={{ fontSize: `${fontSize}px` }}>
                                        Churches typically provide a designated weekly schedule for members of the congregation to participate in the sacrament of confession.
                                    </p>
                                    <div className='mb-3'>
                                        <img 
                                            src={confessionImage}
                                            alt="confession image" 
                                            style={{
                                                height: '250px',
                                                width: '250px'
                                            }}
                                        />
                                    </div>
                                    <div className='' style={{ textAlign: 'left', fontSize: `${fontSize}px` }}>
                                        <p>
                                            1. <strong>Entering the Confessional and Greeting the Priest.</strong> <br />
                                            Start by entering the confessional booth and greeting the priest. Initiate the sacrament by making the sign of the cross and saying<br />
                                            <span style={{ color: 'blue' }}>    
                                                Forgive me Father, for I have sinned. My sins are...
                                            </span>
                                        </p>
                                        <p>
                                            2. <strong>Confessing Your Sins.</strong> Openly confess both venial (minor) sins and mortal (grave) sins.  An example confession could be something like this:<br /> <br />
                                            <span style={{ color: 'blue', fontWeight: 'bold' }}>    
                                                My sins are lust, wrath, sloth, gluttony, and my venial sins are selfishness, pride, and things I haven't done for Christ.  And all my 
                                                sins of <span style={{ textDecoration: 'underline'}} title='Omission: a failure to do something, especially something that one has a moral or legal obligation to do.'>Omission</span>.
                                            </span>
                                            <br /><br />
                                            Of course, you would custom tailor this to your own version.  The point here is do not elaborate it to the point where you take up all the priest's time because
                                            you must be mindful of the limited time you and the priest have.  Other parishioners will need to take their turn too.
                                        </p>
                                        <p>
                                            For reference, here are the 7 deadly sins:
                                        </p>
                                            <ul style={{ fontWeight: 'bold' }}>
                                                <li>Lust</li>
                                                <li>Gluttony</li>
                                                <li>Greed</li>
                                                <li>Sloth</li>
                                                <li>Wrath</li>
                                                <li>Envy</li>
                                                <li>Pride</li>
                                            </ul>
                                        <p>
                                            3. <strong>Listening to the Priest's Guidance.</strong> After your confession, the priest might provide spiritual advice and suggest 
                                            ways to avoid sin in the future. He will assign you a penance, which could be prayers, an act of service, or a work of mercy, 
                                            often achievable within the church premises. <br />
                                        </p>
                                        <p>
                                            4. <strong>Praying the Act of Contrition.</strong> You will then be expected to recite this brief prayer:<br />
                                            <span style={{ color: 'blue' }}>    
                                            O my God, I am heartily sorry for having offended Thee, and I detest all my sins because I dread the loss of Heaven and the Pains of Hell, but most of all because I have offend Thee, my God, 
                                            who art most good and deserving of all my love. And I firmly resolve, with the help of Thy grace, to confess my sins, to do penance, and to amend my life. Amen.
                                            </span>
                                        </p>
                                        <p>
                                            5. <strong>Receiving Absolution from God through the Priest.</strong> The priest will recite a prayer of absolution: <br />
                                            <span style={{ color: 'blue' }}>    
                                            God, the Father of mercies, through the death and resurrection of His Son, has reconciled the world to Himself and sent the Holy Spirit for the forgiveness of sins. Through the Church’s ministry, 
                                            may God grant you pardon and peace. I absolve you of your sins in the name of the Father, the Son, and the Holy Spirit.
                                            </span>
                                            <br /> <br />
                                            Respond with the sign of the cross and say “<span style={{ color: 'blue' }}>Amen.</span>”

                                        </p>
                                        <p>
                                            6. <strong>Completing Your Penance and Deepening Your Faith.</strong> <br /> 
                                            Fulfill the penance assigned to you. Embrace this opportunity to deepen your spiritual journey and draw closer to God.   <br />
                                        </p>
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </div>
                    </div>
                )}
                {activeTab === 'Responses' && (
                    <div>
                        {/* Content for Responses tab */}
                    </div>
                )}
                {activeTab === 'Settings' && (
                    <div>
                        {/* Content for Settings tab */}
                        <ToggleSlider isDisabled={true} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Confession;
