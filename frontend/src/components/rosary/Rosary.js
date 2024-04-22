import React, { useState, useEffect } from 'react';
import { getAllIntentions, createIntention, updateIntention, deleteIntention } from '../../api/intentions';
import { createRosary, getRosaryCountByUser, getMysteryCount, getUserRosaries, deleteRosaries } from '../../api/rosary';
import { isAuthenticated } from '../../api/auth';
import { MdOutlineModeEdit } from "react-icons/md";
import rosaryIcon from './rosary_icon.png'; // Adjust the path to where your icon is stored
import luminousImage from './luminous.jpg';
import sorrowfulImage from './sorrowful.jpg';
import gloriousImage from './glorious.jpg';
import joyfulImage from './joyful.jpg';
import rosaryImage from './rosary_howto.jpg';
import './styles.css'
import ButtonLoader from '../../loaders/ButtonLoader';
import { useModal } from '../../context/ModalContext';
import PieChartMysteries from './PieChartMysteries';
import ToggleSlider from '../utils/ToggleSlider';
import ReusableDatatable from '../utils/datatable/ReusableDatatable';
import VirtualRosary from './virtualrosary/VirtualRosary';

// Define the Rosary component
const Rosary = () => {

    const { toggleModal } = useModal();

    // State to keep track of the number of rosaries prayed
    const [count, setCount] = useState(0);
    const [selectedMystery, setSelectedMystery] = useState('Luminous');
    const [prayerIntentions, setPrayerIntentions] = useState([]);
    const [selectedIntentions, setSelectedIntentions] = useState([]);
    const [isAddingIntention, setIsAddingIntention] = useState(false);
    const [newIntention, setNewIntention] = useState('')

    const [editingIntentionId, setEditingIntentionId] = useState(null); // new state
    const [editContent, setEditContent] = useState(''); // new state to hold the edited content

    // New state to keep track of selected mystery details
    const [selectedMysteryDetails, setSelectedMysteryDetails] = useState([]);
    const [selectedMysteryIcon, setSelectedMysteryIcon] = useState(null);
    const [activeTab, setActiveTab] = useState('Questions');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEmailEnabled, setIsEmailEnabled] = useState(false);

    const DEFAULT_FONT_SIZE = 11; // Default font size in px
    const MAX_FONT_SIZE = 33; // Max font size in px
    const MIN_FONT_SIZE = 11; // Min font size in px
    const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);

    const [mysteryCounts, setMysteryCounts] = useState(null); // hold mystery counts for pie chart
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [
            // Define colors for each mystery
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0'
          ]
        }]
      });
      
    // State for storing the list of rosaries
    const [rosaries, setRosaries] = useState([]);

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRosaries, setTotalRosaries] = useState(0);
    const rosariesPerPage = 30; // Or any other number you prefer

    // State for loading and error handling
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // State to trigger refresh
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    
    const [showVirtualRosary, setShowVirtualRosary] = useState(false); // for controlling virtual rosary visibility

    
    const toggleVirtualRosary = () => {
        setShowVirtualRosary(prev => !prev);
    };
    

    // Function to fetch rosaries
    const fetchRosaries = async () => {
        setLoading(true);
        try {
            const data = await getUserRosaries(userId, token, currentPage, rosariesPerPage);
            setRosaries(data.rosaries);
            setTotalRosaries(data.total);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    
    const handleDelete = async (selectedIds) => {
        if (window.confirm('Are you sure you want to delete the selected rosaries?')) {
            try {
                const response = await deleteRosaries(selectedIds, token);
                if (response) {
                    console.log('Deleted successfully');

                    // Update your state or UI here
                    setRefreshTrigger(prev => prev + 1); // Increment to trigger refresh
                    
                    const data = await getUserRosaries(userId, token, currentPage, rosariesPerPage);
                    setRosaries(data.rosaries);
                    setTotalRosaries(data.total);
                }
            } catch (error) {
                console.error('Delete operation failed:', error);
                // Show error message to user if needed
            }
        }
    };

    
    // Define the columns for the datatable
    const columns = [
        { header: 'Date', accessor: 'createdAt', isDate: true },
        { header: 'Mystery', accessor: 'm' },
        // Add other columns as needed
    ];

    // Define the mysteries details
    const mysteriesDetails = {
        Luminous: [
            "Jesus' Baptism in the Jordan",
            "The Wedding Feast at Cana",
            "The Proclamation of the Kingdom",
            "The Transfiguration",
            "The Institution of the Eucharist"
        ],
        Sorrowful: [
            "The Agony of Jesus in the Garden of Gethsemane",
            "The Scourging of Jesus at the Pillar",
            "The Crowning of Jesus with Thorns",
            "The Carrying of the Cross",
            "The Crucifixion and Death of Jesus"
        ],
        Glorious: [
            "The Resurrection of Jesus",
            "The Ascension of Jesus into Heaven",
            "The Descent of the Holy Spirit at Pentecost",
            "The Assumption of Mary into Heaven",
            "The Coronation of Our Lady in Heaven"
        ],
        Joyful: [
            "The Annunciation of the Angel Gabriel to Mary",
            "The Visitation of Mary to Elizabeth",
            "The Birth of Jesus in Bethlehem of Judea",
            "The Presentation of Jesus in the Temple",
            "The Finding of Jesus in the Temple"
        ]
    };

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

    // You can remove the handleEmailToggle function or leave it for future implementation
    const handleEmailToggle = () => {
        // Future email functionality logic
    };

    const fetchMysteryCounts = async () => {
        try {
            const response = await getMysteryCount(userId, token);
            if(response) {
                const labels = response.map(item => item._id);
                const data = response.map(item => item.count);
                setChartData(prevChartData => ({
                    ...prevChartData,
                    labels: labels,
                    datasets: [{ ...prevChartData.datasets[0], data: data }]
                }));
            }
        } catch (error) {
            console.error('Error fetching mystery counts:', error);
        }
    };
    
    const fetchIntentions = async () => {
        try {
            const response = await getAllIntentions(userId, "Rosary", token);
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
        const response = await getRosaryCountByUser(userId, token);
        if (response) {
            setCount(response.rosaryCount);
        }
    };
    
    useEffect(() => {
        fetchIntentions();
        fetchRosaryCount();
        fetchRosaries();
        
        if (activeTab === 'Responses') {
            fetchMysteryCounts();
        }
    }, [userId, token, activeTab, currentPage]);

    
    // Pagination handlers
    const handleNextPage = () => {
        if (currentPage * rosariesPerPage < totalRosaries) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    const formattedChartData = chartData.labels.map((label, index) => {
        return { label: label, value: chartData.datasets[0].data[index] };
      });
      

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
    
    const handleDeleteIntention = async (intentionId) => {
        // ... delete intention and update state
    };

    const handlePrayRosary = async () => {
        setIsSubmitting(true); // Set submitting to true
        const rosaryData = {
            userId,
            mystery: selectedMystery,
            intentions: selectedIntentions,
            // Include 'recording' if you have implemented this feature
        };
    
        try {
            await createRosary(rosaryData.userId, rosaryData.mystery, rosaryData.intentions, rosaryData.recording, token);
            // console.log('Rosary created successfully:', response);
            
            
            // Reset the form here
            setSelectedIntentions([]); // Clear the selected intentions
            setSelectedMystery('Luminous'); // Reset to default mystery or leave as is based on your UI logic
            // Reset any other states used in the form if needed
            
            toggleModal('rosary'); // Close modal after successful submission
        } catch (error) {
            console.error('Error creating rosary:', error);
            // Handle errors (e.g., show an error message)
        }
    
        setIsSubmitting(false); // Set submitting to false after response is received
        setCount(prevCount => prevCount + 1);
    };
    
    const addPrayerIntention = () => {
        setIsAddingIntention(true); // Show the form for adding a new intention
    };

    const handleNewIntentionSubmit = async (e) => {
        e.preventDefault();
        if (!newIntention) return;
        try {
            await createIntention({ user: userId, content: newIntention, type: 'Rosary' }, token);
            fetchIntentions(); // Re-fetch the intentions
            setNewIntention('');
            setIsAddingIntention(false);
        } catch (error) {
            console.error('Error adding new intention:', error);
        }
    };
    
    const handleMysteryClick = (mysteryName) => {
        setSelectedMystery(mysteryName);
        setSelectedMysteryDetails(mysteriesDetails[mysteryName]);
        const selectedMystery = mysteries.find(mystery => mystery.name === mysteryName);
        setSelectedMysteryIcon(selectedMystery ? selectedMystery.image : null);
        
        // Toggle Virtual Rosary display
        toggleVirtualRosary();
    };

    const handleEditClick = (intentionId, content) => {
        setEditingIntentionId(intentionId); // Set the currently editing intention's ID
        setEditContent(content); // Set the initial content for editing
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

        
    const handleRowSelect = (selectedRows) => {
        // Implement what should happen when rows are selected
        // console.log(selectedRows);
    };

    // Function to format data for the datatable
    const formatDataForTable = (rosaries) => {
        // Format your rosary data here to match the columns' structure
        return rosaries.map(rosary => {
            return {
                createdAt: rosary.createdAt, // Format date as needed
                m: rosary.m,
                _id: rosary._id
                // Map other fields as needed
            };
        });
    };

    // Render the component
    return (
        <div className="rosary-component container">
            <div className="row rosary-header">
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
                    <h1 className="m-1 header-font">
                        Rosary
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
                        {/* Current content for Questions */}
                        
                        <div className="row">
                            <div className="col-12">
                                <h2 className='text-center header-font'>{selectedMystery ? selectedMystery : 'Select Mystery'}</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div 
                                    className="mysteries-row" 
                                    style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-around', // Adjust to 'space-around' for better spacing
                                        flexWrap: 'nowrap', // Prevent wrapping
                                    }}
                                >
                                    {mysteries.map((mystery, index) => (
                                        <div 
                                            key={index}
                                            onClick={() => handleMysteryClick(mystery.name)}
                                            style={{ 
                                                cursor: 'pointer',
                                                // border: selectedMystery === mystery.name ? '2px solid lightgrey' : 'none',
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
                            </div>
                        </div>
                        
                    {/* Conditionally render Virtual Rosary */}
                    {showVirtualRosary && <VirtualRosary selectedMystery={selectedMystery} />}

                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-4">
                                <ol className="mystery-details">
                                    {selectedMysteryDetails.map((detail, index) => (
                                        <li key={index}>{detail}</li>
                                    ))}
                                </ol>
                            </div>
                            <div className="col-12 col-lg-4">
                                {selectedMysteryIcon && (
                                    <img 
                                        src={selectedMysteryIcon} 
                                        alt={selectedMystery} 
                                        style={{ width: '250px', height: '250px' }} 
                                    />
                                )}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-12">
                                <h2 className='header-font'>Prayer Intentions</h2>
                            </div>
                        </div>
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
                        <div className="row">
                            <div className="col-12">
                                {
                                    isAddingIntention ? (
                                        <form onSubmit={handleNewIntentionSubmit}>
                                            <textarea 
                                                className='form-control m-1'
                                                value={newIntention}
                                                onChange={(e) => setNewIntention(e.target.value)} 
                                            />
                                            <button type="submit" className='btn btn-outline-secondary btn-sm'>Add</button>
                                        </form>
                                        ) 
                                        : 
                                        (
                                            <button className="btn btn-outline-secondary btn-sm" onClick={addPrayerIntention}>
                                                Add intention
                                            </button>
                                        )
                                }
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-12">
                                <button 
                                    onClick={handlePrayRosary} 
                                    className="pray-rosary-btn btn btn-primary btn-block"
                                >
                                    {
                                        isSubmitting ?
                                        <ButtonLoader />
                                        : `Submit`
                                    }
                                </button>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-12">
                                <p>You have prayed {count} rosaries.</p>
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
                                        How to Pray the Rosary
                                    </h2>
                                    <p style={{ fontSize: `${fontSize}px` }}>
                                        Engaging in the Rosary involves a series of prayers that offer deep reflection on the 
                                        life events of Jesus and Mary. Here’s a simple guide to follow:
                                    </p>
                                    <div className='mb-3'>
                                        <img 
                                            src={rosaryImage}
                                            alt="rosary image" 
                                        />
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
                                            <span style={{ color: 'blue' }}>    
                                                {/* Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen. */}
                                            </span>
                                        </p>
                                        <p>
                                            7. <strong>Glory be to the Father and Fatima Prayer:</strong> After each decade say the Glory Be and Fatima prayer, requested by the Blessed Virgin Mary at Fatima.  <br />
                                            <span style={{ color: 'blue' }}>    
                                                {/* Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen. */}
                                            </span>
                                        </p>
                                        <p>
                                            8. <strong>Announce the Second Mystery:</strong> Then say the Our Father. Repeat 6 and 7 and continue with the Third, Fourth, and Fifth Mysteries in the same manner. <br />
                                            <span style={{ color: 'blue' }}>    
                                                {/* Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen. */}
                                            </span>
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
                                    </div>
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
                                    <p style={{ fontWeight: 'bold' }}>Total: {rosaries.length} Rosaries</p>
                                </div>
                            </div>
                        </div>
                        
                        <PieChartMysteries data={formattedChartData} />

                        <ReusableDatatable
                            data={formatDataForTable(rosaries)} 
                            columns={columns} 
                            pageSize={30} 
                            checkbox={true}
                            onRowSelect={handleRowSelect} 
                            onDelete={handleDelete}
                            refreshTrigger={refreshTrigger}
                        />

                    </div>
                )}
                {activeTab === 'Settings' && (
                    <div>
                        {/* Content for Settings */}
                        <div className="email-toggle">
                            <ToggleSlider 
                            isEnabled={isEmailEnabled} 
                            toggleFunction={handleEmailToggle} 
                            componentName="Rosary"
                            isDisabled={true} // Disable the toggle
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Rosary;
