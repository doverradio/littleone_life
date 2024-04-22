import React, { useState, useEffect } from 'react';
// import { getAllIntentions, createIntention, updateIntention, deleteIntention } from '../../api/intentions';
// import { createMassAttendance, countMassesByUser } from '../../api/massAttendance'; 
import { createConfession, getAllConfessions, getUserConfessions, deleteConfessions } from '../../api/confession';
import { isAuthenticated } from '../../api/auth';
import { MdOutlineModeEdit } from "react-icons/md";
import confessionIcon from './confession_icon.png'
import confessionImage from './confession_image.png'
import ToggleSlider from '../utils/ToggleSlider';
import { useModal } from '../../context/ModalContext';
import './styles.css'
import { createChurch, getAllChurches } from '../../api/church';
import ConfessionPrayers from './ConfessionPrayers';
import ConfessionQuestions from './ConfessionQuestions';
import PieChart from '../utils/piechart/PieChart';
import ReusableDatatable from '../utils/datatable/ReusableDatatable';

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
    const [totalConfessions, setTotalConfessions] = useState(0);

    const handleDateChange = (event) => {
        setLastConfessionDate(event.target.value);
        calculateDaysSince(event.target.value);
    };

    const {
        user: { _id },
        token
    } = isAuthenticated();

    const userId = _id;

    
    const [confessions, setConfessions] = useState([]);

    const confessionsPerPage = 30; // Or any other number you prefer

    // For 

    
    // For ReusableDatatable
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const pageSize = 10; // Adjust as needed

    // For PieChart
    const [pieChartData, setPieChartData] = useState([]);
    const [error, setError] = useState('')

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
                
                const pieChartData = processConfessionDataForPieChart(response);
                setPieChartData(pieChartData);

            } else {
                setHasConfessions(false);
            }
        } catch (error) {
            console.error("Error fetching confessions:", error);
        }
    };
    
    const processConfessionDataForPieChart = (confessions) => {
        const countByChurch = {};
    
        confessions.forEach(confession => {
            const churchName = confession.church.name;
            if (countByChurch[churchName]) {
                countByChurch[churchName] += 1;
            } else {
                countByChurch[churchName] = 1;
            }
        });
    
        return Object.keys(countByChurch).map(churchName => {
            return {
                label: churchName,
                value: countByChurch[churchName]
            };
        });
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

    const fetchData = async () => {
        const data = await getUserConfessions(userId, currentPage, pageSize, token);

        if (data) {
            setConfessions(data.confessions);
            // setMasses(data.masses);
            setTotalPages(Math.ceil(data.total / pageSize));
        }
    };
    

    // Fetch user churches on component mount
    useEffect(() => {
        fetchUserChurches();
        fetchUserConfessions();
        fetchData();
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

    
    const onRowSelect = (rowData) => {
        // rowData contains the data of the clicked row
        // console.log('Selected Row Data:', rowData);
        // You can then use this data to show details, redirect to another page, or open a modal for editing, etc.
    };

    
    const handleDelete = async (selectedIds) => {
        if (window.confirm('Are you sure you want to delete the selected masses?')) {
            try {
                const response = await deleteConfessions(selectedIds, token);
                if (response) {
                    console.log('Deleted successfully');

                    // Update your state or UI here
                    setRefreshTrigger(prev => prev + 1); // Increment to trigger refresh

                    // Fetch the updated list of masses
                    const data = await getUserConfessions(userId, currentPage, confessionsPerPage, token);
                    // Update state with the new data
                    setConfessions(data.confessions);
                    // setMasses(data.masses);
                    // log(`data.total: `, data.total)
                    setTotalConfessions(data.total);
                }
            } catch (error) {
                console.error('Delete operation failed:', error);
                // Show error message to user if needed
            }
        }
    };

    
    const columns = [
        {
            header: 'Confession Time',
            accessor: 'confessionTime'
        },
        {
            header: 'Church',
            accessor: 'church',
            // If church is an object with more details, you might want to format it differently
        },
        // {
        //     header: 'Special Intentions',
        //     accessor: 'specialIntentions'
        // },
        // {
        //     header: 'Intention Content',
        //     accessor: 'i',
        //     // Assuming 'i' is an array of intentions. You might need to customize the rendering.
        //     customRender: (rowData) => {
        //         // Join multiple intentions' content into a single string
        //         return rowData.i.map(intention => intention.content).join(', ');
        //     }
        // },
        {
            header: 'Created At',
            accessor: 'createdAt',
            isDate: true // Assuming you have date formatting logic in your table
        },
        // {
        //     header: 'Updated At',
        //     accessor: 'updatedAt',
        //     isDate: true // Assuming you have date formatting logic in your table
        // }
        // Add more columns as needed
    ];
    

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
                    <ConfessionQuestions
                        userChurches={ userChurches }
                        showChurchForm={ showChurchForm }
                        setShowChurchForm={ setShowChurchForm }
                        submitNewChurch={ submitNewChurch }
                        handleChurchChange={ handleChurchChange }
                        newChurch={ newChurch }
                        confessionImage={ confessionImage }
                        confessionTime={ confessionTime }
                        setConfessionTime={ setConfessionTime }
                        handleChurchSelection={ handleChurchSelection }
                        handleSubmitConfession={ handleSubmitConfession }
                        hasConfessions={ hasConfessions }
                        daysSinceLastConfession={ daysSinceLastConfession }
                    />
                )}
                {activeTab === 'Prayers' && (
                    <ConfessionPrayers
                        decreaseFontSize={ decreaseFontSize }
                        increaseFontSize={ increaseFontSize }
                        fontSize={ fontSize }
                        confessionImage={ confessionImage }
                    />
                )}
                {activeTab === 'Responses' && (
                    <div>
                        <div className="container mt-5">
                            <div className="row my-3">
                                <div className="col-12">
                                    <p style={{ fontWeight: 'bold' }}>Total: {confessions.length} {confessions.length > 1 ? `Confessions` : `Confession`} </p>
                                </div>
                            </div>
                        </div>


                        <PieChart data={pieChartData} />

                        <ReusableDatatable
                            data={confessions}
                            columns={columns}
                            pageSize={confessionsPerPage}
                            checkbox={true}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onRowSelect={onRowSelect}
                            onDelete={handleDelete}
                            refreshTrigger={refreshTrigger}
                        />


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
