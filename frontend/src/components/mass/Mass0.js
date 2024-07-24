import React, { useState, useEffect } from 'react';
import { countMassesByUser, getAllMassAttendances, createMassAttendance, deleteMassAttendances } from '../../api/massAttendance';
import { getAllIntentions, createIntention, updateIntention, deleteIntention } from '../../api/intentions';
import { createChurch, getAllChurches } from '../../api/church';
import { isAuthenticated } from '../../api/auth';
import massIcon from './mass_icon.png';
import massImage from './mass_image.png';
import novusOrdoImage from './novus_ordo.jpg';
import latinMassImage from './latin_mass.jpg';
import './styles.css';
import { useModal } from '../../context/ModalContext';
import MassQuestions from './MassQuestions0';
import MassPrayers from './MassPrayers';
import MassResponses from './MassResponses';
import MassSettings from './MassSettings';

const Mass = () => {
    const { toggleModal } = useModal();

    // State for tracking the total count of masses
    const [count, setCount] = useState(0);
    // State for storing mass attendances data
    const [massAttendances, setMassAttendances] = useState([]);
    // State for managing the active tab
    const [activeTab, setActiveTab] = useState('Questions');
    // State for controlling the visibility of the map
    const [showMap, setShowMap] = useState(false);
    // State for the selected church
    const [selectedChurch, setSelectedChurch] = useState(null);
    // State for pie chart data
    const [pieChartData, setPieChartData] = useState([]);
    // State for handling errors
    const [error, setError] = useState('');
    // State for the email toggle
    const [isEmailEnabled, setIsEmailEnabled] = useState(false);
    // Other necessary states
    const [isAddingIntention, setIsAddingIntention] = useState(false);
    const [newIntention, setNewIntention] = useState('');
    const [editingIntentionId, setEditingIntentionId] = useState(null);
    const [editContent, setEditContent] = useState('');
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
    const [selectedMassTime, setSelectedMassTime] = useState('');
    const [specialIntentions, setSpecialIntentions] = useState('');
    const [selectedIntentions, setSelectedIntentions] = useState([]);
    const [userChurches, setUserChurches] = useState([]);
    const [prayerIntentions, setPrayerIntentions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const DEFAULT_FONT_SIZE = 11; // Default font size in px
    const MAX_FONT_SIZE = 33; // Max font size in px
    const MIN_FONT_SIZE = 11; // Min font size in px
    const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);

    const {
        user: { _id },
        token
    } = isAuthenticated();

    const userId = _id;
    const massesPerPage = 30;

    useEffect(() => {
        fetchMassCount();
        fetchMassAttendances();
        fetchUserChurches();
        fetchIntentions();
    }, [userId, token]);

    // Fetch the count of masses attended by the user
    const fetchMassCount = async () => {
        const response = await countMassesByUser(userId, token);
        if (response) {
            setCount(response.massAttendanceCount);
        }
    };

    // Fetch all mass attendances of the user
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

    // Process the mass attendance data for pie chart visualization
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

    // Handle the click event for adding a new church, triggering the map display
    const handleAddNewChurchClick = () => {
        setShowMap(true);
    };

    // Fetch user churches
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

    // Fetch prayer intentions
    const fetchIntentions = async () => {
        try {
            const response = await getAllIntentions(userId, "Mass", token);
            if (response) {
                setPrayerIntentions(response);
            } else {
                setPrayerIntentions([]);
            }
        } catch (error) {
            console.error("Error fetching intentions: ", error);
            setPrayerIntentions([]);
        }
    };

    // Handle the form submission for adding a new church
    const submitNewChurch = async (e) => {
        e.preventDefault();
        try {
            const response = await createChurch({ ...newChurch, users: [userId] }, token);
            if (response) {
                setUserChurches([...userChurches, response]);
                setShowChurchForm(false);
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

    // Handle the form submission for adding a new intention
    const handleNewIntentionSubmit = async (e) => {
        e.preventDefault();
        if (!newIntention) return;
        try {
            await createIntention({ user: userId, content: newIntention, type: 'Mass' }, token);
            fetchIntentions();
            setNewIntention('');
            setIsAddingIntention(false);
        } catch (error) {
            console.error('Error adding new intention:', error);
        }
    };

    // Handle mass time change
    const handleMassTimeChange = (e) => {
        setSelectedMassTime(e.target.value);
    };

    // Handle church selection change
    const handleChurchSelection = (e) => {
        setSelectedChurch(e.target.value);
    };

    // Handle the form submission for mass attendance
    const handleSubmitMass = async () => {
        setIsSubmitting(true);
        const massData = {
            user: userId,
            church: selectedChurch,
            massTime: selectedMassTime,
            i: selectedIntentions,
            specialIntentions
        };

        try {
            await createMassAttendance(massData, token);
            setSelectedIntentions([]);
            setSelectedChurch(null);
            setSelectedMassTime('');
            toggleModal('mass');
        } catch (error) {
            console.error('Error creating mass attendance:', error);
        }

        setIsSubmitting(false);
        setCount(prevCount => prevCount + 1);
    };

    // Handle church form input change
    const handleChurchChange = (e) => {
        setNewChurch({ ...newChurch, [e.target.name]: e.target.value });
    };

    // Handle updating an intention
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

    // Handle deleting an intention
    const handleDeleteIntention = async (intentionId) => {
        try {
            await deleteIntention(intentionId, token);
            fetchIntentions(); // Re-fetch intentions to update the list
        } catch (error) {
            console.error('Error deleting intention:', error);
        }
    };

    // Handle intention checkbox change
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

    // Handle edit click for intentions
    const handleEditClick = (intentionId, content) => {
        setEditingIntentionId(intentionId); // Set the currently editing intention's ID
        setEditContent(content); // Set the initial content for editing
    };

    return (
        <div className="mass-component container">
            {/* Header section with Mass icon and title */}
            <div className="row">
                <div className="col-3">
                    <img
                        src={massIcon}
                        alt="Mass"
                        className="mass-icon"
                        style={{ height: '55px', width: '55px', cursor: 'pointer' }}
                    />
                </div>
                <div className="col-9">
                    <h1 className="m-1 header-font">
                        Mass
                    </h1>
                </div>
            </div>
            <hr />
            {/* Navigation tabs */}
            <div className="tab-navigation">
                <a href="#!" className={activeTab === 'Questions' ? 'active' : ''} onClick={() => setActiveTab('Questions')}>Questions</a>
                <a href="#!" className={activeTab === 'Prayers' ? 'active' : ''} onClick={() => setActiveTab('Prayers')}>Prayers</a>
                <a href="#!" className={activeTab === 'Responses' ? 'active' : ''} onClick={() => setActiveTab('Responses')}>Responses</a>
                <a href="#!" className={activeTab === 'Settings' ? 'active' : ''} onClick={() => setActiveTab('Settings')}>Settings</a>
            </div>
            <hr />
            {/* Tab content rendering based on the active tab */}
            <div>
                {activeTab === 'Questions' && (
                    <MassQuestions
                        userChurches={userChurches}
                        showChurchForm={showChurchForm}
                        setShowChurchForm={setShowChurchForm}
                        submitNewChurch={submitNewChurch}
                        handleChurchChange={handleChurchChange}
                        newChurch={newChurch}
                        massImage={massImage}
                        selectedMassTime={selectedMassTime}
                        handleMassTimeChange={handleMassTimeChange}
                        massTimesOptions={[
                            '6:00 A.M.', '6:30 A.M.', '7:00 A.M.', '7:30 A.M.',
                            '8:00 A.M.', '8:30 A.M.', '9:00 A.M.', '9:30 A.M.',
                            '10:00 A.M.', '10:30 A.M.', '11:00 A.M.', '11:30 A.M.',
                            '12:00 P.M.', '12:10 P.M.', '12:30 P.M.', '1:00 P.M.', '1:30 P.M.',
                            '2:00 P.M.', '2:30 P.M.', '3:00 P.M.', '3:30 P.M.',
                            '4:00 P.M.', '4:30 P.M.', '5:00 P.M.', '5:30 P.M.',
                            '6:00 P.M.', '6:30 P.M.', '7:00 P.M.', '7:30 P.M.',
                            '8:00 P.M.', '8:30 P.M.', '9:00 P.M.', '9:30 P.M.',
                            '10:00 P.M.', '10:30 P.M.', '11:00 P.M.', '11:30 P.M.'
                        ]}
                        prayerIntentions={prayerIntentions}
                        editingIntentionId={editingIntentionId}
                        handleUpdateIntention={handleUpdateIntention}
                        setEditContent={setEditContent}
                        setEditingIntentionId={setEditingIntentionId}
                        handleDeleteIntention={handleDeleteIntention}
                        selectedIntentions={selectedIntentions}
                        handleIntentionCheckboxChange={handleIntentionCheckboxChange}
                        handleEditClick={handleEditClick}
                        isAddingIntention={isAddingIntention}
                        handleNewIntentionSubmit={handleNewIntentionSubmit}
                        newIntention={newIntention}
                        setNewIntention={setNewIntention}
                        setIsAddingIntention={setIsAddingIntention}
                        setSpecialIntentions={setSpecialIntentions}
                        handleSubmitMass={handleSubmitMass}
                        isSubmitting={isSubmitting}
                        count={massAttendances.length}
                        handleChurchSelection={handleChurchSelection}
                        editContent={editContent}
                        showMap={showMap}
                        setShowMap={setShowMap}
                    />
                )}
                {activeTab === 'Prayers' && (
                    <MassPrayers
                        decreaseFontSize={() => setFontSize(currentSize => Math.max(currentSize - 1, MIN_FONT_SIZE))}
                        increaseFontSize={() => setFontSize(currentSize => Math.min(currentSize + 1, MAX_FONT_SIZE))}
                        fontSize={fontSize}
                        novusOrdoImage={novusOrdoImage}
                        latinMassImage={latinMassImage}
                    />
                )}
                {activeTab === 'Responses' && (
                    <MassResponses
                        massAttendances={massAttendances}
                        pieChartData={pieChartData}
                        massesPerPage={massesPerPage}
                        fetchMassAttendances={fetchMassAttendances}
                        setMassAttendances={setMassAttendances}
                        userId={userId}
                        token={token}
                    />
                )}
                {activeTab === 'Settings' && (
                    <MassSettings
                        isEmailEnabled={isEmailEnabled}
                        handleEmailToggle={() => setIsEmailEnabled(!isEmailEnabled)}
                    />
                )}
            </div>
        </div>
    );
};

export default Mass;
