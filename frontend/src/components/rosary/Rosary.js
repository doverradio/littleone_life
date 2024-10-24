// src/components/rosary/Rosary.js

import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import rosaryIcon from './rosary_icon.png';
import './styles.css';
import { useModal } from '../../context/ModalContext';
import Mysteries, { mysteries } from './mysteries/Mysteries';
import mysteriesDetails from './mysteries/mysteriesDetails';
import MysteryDetails from './mysteries/MysteryDetails';
import PrayerIntentions from './intentions/PrayerIntentions';
import PrayerIntentionsForm from './PrayerIntentionsForm';
import {
    increaseFontSize,
    decreaseFontSize,
    handleDelete,
    columns,
    toggleVirtualRosary,
    handleIntentionCheckboxChange,
    handleDeleteIntention,
    handlePrayRosary,
    addPrayerIntention,
    handleNewIntentionSubmit,
    handleMysteryClick,
    handleEditClick,
    handleUpdateIntention,
    handleRowSelect,
    formatDataForTable,
    handleSaveClick,
    handleCancelClick
} from './utils/rosaryUtils';
import { fetchRosaries, fetchMysteryCounts, fetchIntentions, fetchRosaryCount } from './utils/fetchFunctions';
import RosaryPrayerText from './RosaryPrayerText';
import RosaryResponses from './RosaryResponses';
import ToggleSlider from '../utils/ToggleSlider';
import RosaryHeader from './RosaryHeader';
import BackIcon from '../utils/BackIcon';
import { getUser } from '../../api/user';
import { sendNotificationEmail } from '../../api/email'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Ensure correct component import
import SpeechRecognitionComponent from '../speechrecognition/SpeechRecognition';
import VirtualRosary from './virtualrosary/VirtualRosary'; 
import PrayerTextKaraoke from '../prayertextkaraoke/PrayerTextKaraoke';

const Rosary = () => {
    const { toggleModal } = useModal();
    const { user } = useUser();
    const userId = user?._id;

    const [count, setCount] = useState(0);
    const [selectedMystery, setSelectedMystery] = useState('');
    const [prayerIntentions, setPrayerIntentions] = useState([]);
    const [selectedIntentions, setSelectedIntentions] = useState([]);
    const [isAddingIntention, setIsAddingIntention] = useState(false);
    const [newIntention, setNewIntention] = useState('');
    const [editingIntentionId, setEditingIntentionId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [selectedMysteryDetails, setSelectedMysteryDetails] = useState([]);
    const [selectedMysteryName, setSelectedMysteryName] = useState(''); // Store the mystery name
    const [selectedMysteryIcon, setSelectedMysteryIcon] = useState(null);
    const [activeTab, setActiveTab] = useState('Form');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEmailEnabled, setIsEmailEnabled] = useState(false);
    const DEFAULT_FONT_SIZE = 18;
    const MAX_FONT_SIZE = 33;
    const MIN_FONT_SIZE = 11;
    const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
    const [mysteryCounts, setMysteryCounts] = useState(null);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [
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
    const [rosaries, setRosaries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRosaries, setTotalRosaries] = useState(0);
    const rosariesPerPage = 30;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [showVirtualRosary, setShowVirtualRosary] = useState(false);
    const [currentTranscript, setCurrentTranscript] = useState(""); // To store the current transcript


    // This is the full prayer text (Hail Mary example)
    const hailMaryText = "Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.";

    let hailMaryIndex = 0;  // To track Hail Mary bead index


    // Function to update transcript (this will come from the speech recognition)
    const handleTranscriptUpdate = (transcript) => {
        setCurrentTranscript(transcript); // Update state when new words are recognized
    };

    useEffect(() => {
        fetchIntentions(userId, setPrayerIntentions);
        fetchRosaryCount(userId, setCount);
        fetchRosaries(userId, currentPage, rosariesPerPage, setLoading, setRosaries, setTotalRosaries, setError);

        if (activeTab === 'Responses') {
            fetchMysteryCounts(userId, setChartData);
        }

        const fetchUser = async () => {
            try {
                const userData = await getUser(userId);
                setIsEmailEnabled(userData.notificationPreferences?.Rosary || false);
            } catch (err) {
                console.error('Failed to fetch user data:', err);
            }
        };

        fetchUser();
    }, [userId, activeTab, currentPage, refreshTrigger]);

    const handleCloseForm = () => {
        setIsAddingIntention(false);
    };

    const handleAddIntentionClick = () => {
        setIsAddingIntention(true);
    };

    const handlePrayRosaryWrapper = async () => {
        if (!selectedMystery) {
            toast.error('Please select a Rosary mystery before submitting.');
            return;
        }
    
        try {
            await handlePrayRosary(
                userId,
                selectedMystery,
                selectedIntentions,
                toggleModal,
                setSelectedIntentions,
                setSelectedMystery,
                setIsSubmitting,
                setCount
            );
    
            if (isEmailEnabled) {
                const DOMAIN = process.env.REACT_APP_API.includes('localhost') 
                    ? process.env.REACT_APP_API
                    : 'https://www.littleone.life';
    
                const currentTime = new Date().toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                });
    
                const emailData = {
                    to: user.email,
                    subject: `${selectedMystery} Mystery Rosary Submitted on ${currentTime}`,
                    message: `<p>Hello ${user.username || ''},</p>
    <p>You submitted a ${selectedMystery} Rosary at ${currentTime}.</p> 
    <p>May the Lord hear and answer your prayer according to His Will.</p> 
    <p>Amen,</p>
    <p>littleone</p>
    <p><a href="https://littleone.life/notify/disable-notifications?userId=${user._id}&component=Rosary">Turn off notifications</a>.</p>`,
                };
    
                await sendNotificationEmail(emailData, userId);
            }
        } catch (error) {
            console.error('Failed to submit Rosary or send notification email:', error);
            toast.error('There was an error submitting the Rosary. Please try again later.');
        }
    };

    const handleEmailToggle = async () => {
        setIsEmailEnabled(!isEmailEnabled);

        if (!isEmailEnabled) {
            console.log('Email notifications enabled.');
        } else {
            console.log('Email notifications disabled.');
        }
    };

    // Function to animate rosary beads when prayers are spoken
    const animateBead = (beadId) => {
        console.log(`Animating bead: ${beadId}`);
        if (beadId === 'hail-mary') {
            hailMaryIndex = (hailMaryIndex % 10) + 1;  // Cycle through Hail Mary beads
            return `hail-mary-${hailMaryIndex}`;
        }
        return beadId;
    };

    return (
        <div className="rosary-component container">
            <BackIcon />
            <RosaryHeader
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                rosaryIcon={rosaryIcon}
            />
            <main className="rosary-main">
                {activeTab === 'Form' && (
                    
                    <div className="questions-tab">
                        <Mysteries handleMysteryClick={(name) => handleMysteryClick(name, mysteriesDetails, setSelectedMystery, setSelectedMysteryDetails, setSelectedMysteryIcon, mysteries, setShowVirtualRosary)} />
                        {selectedMystery && (
                            <MysteryDetails selectedMysteryDetails={selectedMysteryDetails} />
                        )}
                        <div className="prayer-intentions-container">
                            <div className="card mx-auto my-4">
                                <PrayerIntentions 
                                    prayerIntentions={prayerIntentions}
                                    selectedIntentions={selectedIntentions}
                                    handleIntentionCheckboxChange={handleIntentionCheckboxChange}
                                    handleEditClick={handleEditClick}
                                    handleSaveClick={(id, updatedContent) => handleSaveClick(id, updatedContent, fetchIntentions, userId, setPrayerIntentions, setEditingIntentionId, setEditContent)}
                                    handleCancelClick={() => handleCancelClick(setEditingIntentionId, setEditContent)}
                                    handleDeleteIntention={(id) => handleDeleteIntention(id, fetchIntentions, userId, setPrayerIntentions)}
                                    editingIntentionId={editingIntentionId}
                                    editContent={editContent}
                                    setEditContent={setEditContent}
                                    setEditingIntentionId={setEditingIntentionId}
                                    setSelectedIntentions={setSelectedIntentions}
                                />
                                {isAddingIntention && (
                                    <PrayerIntentionsForm
                                        isAddingIntention={isAddingIntention}
                                        newIntention={newIntention}
                                        handleNewIntentionSubmit={(e) => handleNewIntentionSubmit(e, newIntention, userId, setPrayerIntentions, setNewIntention, setIsAddingIntention, 'Rosary')}
                                        setNewIntention={setNewIntention}
                                        handleCloseForm={handleCloseForm}
                                    />
                                )}
                            </div>
                            {!isAddingIntention && (
                                <div className="row mt-3">
                                    <div className="col-12 text-center">
                                        <button 
                                            className="btn btn-outline-secondary btn-sm" 
                                            onClick={handleAddIntentionClick}
                                        >
                                            Add intention
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>









                        {/* Pass the transcript and the full prayer to PrayerTextKaraoke */}
                        <PrayerTextKaraoke transcript={currentTranscript} prayerText={hailMaryText} />

                        

                        
                        {/* Add the SpeechRecognitionComponent for prayer listening */}
                        <div className="speech-recognition-section">
                            {/* <h3>Begin Praying the Rosary</h3> */}
                            <SpeechRecognitionComponent 
                                animateBead={animateBead}
                                updateTranscript={handleTranscriptUpdate}
                            />
                        </div>


                        {/* Render the virtual rosary */}
                        <VirtualRosary animateBead={animateBead} />
                        


                        <div className="row mt-4">
                            <div className="col-12 text-center">
                                <button 
                                    onClick={handlePrayRosaryWrapper} 
                                    className="btn btn-primary"
                                    disabled={!selectedMystery}
                                >
                                    {
                                        isSubmitting ? 'Submitting...' : 'Submit Rosary'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Other tabs logic */}
                
            </main>
            <ToastContainer />
        </div>
    );
};

export default Rosary;
