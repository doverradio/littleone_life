import React, { useState, useEffect } from 'react';
import { getAllIntentions, createIntention, updateIntention, deleteIntention } from '../../api/intentions';
import { createMassAttendance, countMassesByUser, getAllMassAttendances, getMassAttendances, deleteMassAttendances } from '../../api/massAttendance'; 
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
import MassQuestions from './MassQuestions';
import MassPrayers from './MassPrayers';
import PieChart from '../utils/piechart/PieChart';
import ReusableDatatable from '../utils/datatable/ReusableDatatable';
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

    const userId = _id;
    
    const [massAttendances, setMassAttendances] = useState([]);

    // For ReusableDatatable
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [masses, setMasses] = useState([]);
    const [totalMasses, setTotalMasses] = useState(0);

    const massesPerPage = 30; // Or any other number you prefer

    const pageSize = 10; // Adjust as needed

    // For PieChart
    const [pieChartData, setPieChartData] = useState([]);
    const [error, setError] = useState('');

    const processMassAttendanceDataForPieChart = (massAttendances) => {
        const countByMassTime = {};
    
        massAttendances.forEach(mass => {
            const { massTime } = mass;
            if (countByMassTime[massTime]) {
                countByMassTime[massTime] += 1;
            } else {
                countByMassTime[massTime] = 1;
            }
        });
    
        return Object.keys(countByMassTime).map(massTime => {
            return {
                label: massTime,
                value: countByMassTime[massTime]
            };
        });
    };
    

    const fetchMassAttendances = async () => {
        try {
            const data = await getAllMassAttendances(userId, token);
            if (data.error) {
                setError(data.error);
            } else {
                setMassAttendances(data);
                const pieChartData = processMassAttendanceDataForPieChart(data);
                setPieChartData(pieChartData);
            }
        } catch (err) {
            setError('Error fetching data');
        }
    };
    
    
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

    
    const fetchData = async () => {
        const data = await getMassAttendances(userId, currentPage, pageSize, token);
        if (data) {
            setMassAttendances(data.masses);
            // setMasses(data.masses);
            setTotalPages(Math.ceil(data.total / pageSize));
        }
    };
    
    useEffect(() => {
        fetchIntentions();
        fetchMassCount();
        fetchUserChurches(); // Fetch user churches
        fetchMassAttendances();
        fetchData();
    }, [userId, currentPage, pageSize, token]);

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

    const columns = [
        {
            header: 'Mass Time',
            accessor: 'massTime'
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
    
    const onRowSelect = (rowData) => {
        // rowData contains the data of the clicked row
        // console.log('Selected Row Data:', rowData);
        // You can then use this data to show details, redirect to another page, or open a modal for editing, etc.
    };

    const handleDelete = async (selectedIds) => {
        if (window.confirm('Are you sure you want to delete the selected masses?')) {
            try {
                const response = await deleteMassAttendances(selectedIds, token);
                if (response) {
                    console.log('Deleted successfully');

                    // Update your state or UI here
                    setRefreshTrigger(prev => prev + 1); // Increment to trigger refresh

                    // Fetch the updated list of masses
                    const data = await getMassAttendances(userId, currentPage, massesPerPage, token);
                    // Update state with the new data
                    setMassAttendances(data.masses);
                    // setMasses(data.masses);
                    // log(`data.total: `, data.total)
                    setTotalMasses(data.total);
                }
            } catch (error) {
                console.error('Delete operation failed:', error);
                // Show error message to user if needed
            }
        }
    };
    
    
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
            {/* <div className="row">
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
            </div> */}
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
                    <>
                        <MassQuestions
                            userChurches={ userChurches }
                            showChurchForm={ showChurchForm }
                            setShowChurchForm={ setShowChurchForm }
                            submitNewChurch={ submitNewChurch }
                            handleChurchChange={ handleChurchChange }
                            newChurch={ newChurch }
                            massImage={ massImage }
                            selectedMassTime={ selectedMassTime }
                            handleMassTimeChange={ handleMassTimeChange }
                            massTimesOptions={ massTimesOptions }
                            prayerIntentions={ prayerIntentions }
                            editingIntentionId={ editingIntentionId }
                            handleUpdateIntention={ handleUpdateIntention }
                            setEditContent={ setEditContent }
                            setEditingIntentionId={ setEditingIntentionId }
                            handleDeleteIntention={ handleDeleteIntention }
                            selectedIntentions={ selectedIntentions }
                            handleIntentionCheckboxChange={ handleIntentionCheckboxChange }
                            handleEditClick={ handleEditClick }
                            isAddingIntention={ isAddingIntention }
                            handleNewIntentionSubmit={ handleNewIntentionSubmit }
                            newIntention={ newIntention }
                            setNewIntention={ setNewIntention }
                            setIsAddingIntention={ setIsAddingIntention }
                            setSpecialIntentions={ setSpecialIntentions }
                            handleSubmitMass={ handleSubmitMass }
                            isSubmitting={ isSubmitting }
                            count={ massAttendances.length }
                            handleChurchSelection={ handleChurchSelection }
                            editContent={ editContent }
                        />
                    </>
                )}
                {activeTab === 'Prayers' && (
                    <MassPrayers
                        decreaseFontSize={ decreaseFontSize }
                        increaseFontSize={ increaseFontSize }
                        fontSize={ fontSize }
                        novusOrdoImage={ novusOrdoImage }
                        latinMassImage={ latinMassImage }
                    />
                )}
                {activeTab === 'Responses' && (
                    <div>
                        <div className="container mt-5">
                            <div className="row my-3">
                                <div className="col-12">
                                    <p style={{ fontWeight: 'bold' }}>Total: {massAttendances.length} Masses</p>
                                </div>
                            </div>
                        </div>
                        
                        <PieChart data={pieChartData} />

                        <ReusableDatatable 
                            data={massAttendances}
                            columns={columns}
                            pageSize={massesPerPage}
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
                )}
            </div>


        </div>
    );
};

export default Mass;
