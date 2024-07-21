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
import PrayerButton from '../prayerbutton/PrayerButton';

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
            <header className="rosary-header">
                <img src={rosaryIcon} alt="Rosary" className="rosary-icon" />
                <h1>Rosary</h1>
            </header>
            <nav className="rosary-nav">
                <a href="#questions" className={activeTab === 'Questions' ? 'active' : ''} onClick={() => setActiveTab('Questions')}>Questions</a>
                <a href="#prayers" className={activeTab === 'Prayers' ? 'active' : ''} onClick={() => setActiveTab('Prayers')}>Prayers</a>
                <a href="#responses" className={activeTab === 'Responses' ? 'active' : ''} onClick={() => setActiveTab('Responses')}>Responses</a>
                <a href="#settings" className={activeTab === 'Settings' ? 'active' : ''} onClick={() => setActiveTab('Settings')}>Settings</a>
            </nav>
            <main className="rosary-main">
                {activeTab === 'Questions' && (
                    <div className="questions-tab">
                        <h2 className="text-center">{selectedMystery}</h2>
                        <div className="mysteries-row">
                            {mysteries.map((mystery, index) => (
                                <div key={index} onClick={() => handleMysteryClick(mystery.name)} className="mystery-item">
                                    <img src={mystery.image} alt={mystery.name} className="mystery-image" />
                                    <p>{mystery.name}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mystery-details-section">
                            <ol className="mystery-details centered-list">
                                {selectedMysteryDetails.map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ol>
                            {selectedMysteryIcon && <img src={selectedMysteryIcon} alt={selectedMystery} className="selected-mystery-icon" />}
                        </div>
                        <h2>Prayer Intentions</h2>
                        {prayerIntentions.length > 0 ? (
                            <ul className="prayer-intentions-list">
                                {prayerIntentions.map(intention => (
                                    <li key={intention._id} className="prayer-intention-item">
                                        <input type="checkbox" checked={selectedIntentions.includes(intention._id)} onChange={() => handleIntentionCheckboxChange(intention._id)} />
                                        <p>{intention.content}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No intentions added yet.</p>
                        )}
                        <button onClick={handlePrayRosary} className="submit-rosary-btn">
                            {isSubmitting ? <ButtonLoader /> : 'Submit Rosary'}
                        </button>
                    </div>
                )}
            </main>
        </div>
    );

};

export default Rosary;
