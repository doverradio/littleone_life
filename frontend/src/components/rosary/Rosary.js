import React, { useState, useEffect } from 'react';
import { useAuth } from '../../api/authHook';
import rosaryIcon from './rosary_icon.png';
import './styles.css';
import { useModal } from '../../context/ModalContext';
import { getUserNotificationPreferences } from '../../api/notification'; // Add this import
import Mysteries, { mysteries } from './mysteries/Mysteries';
import mysteriesDetails from './mysteries/mysteriesDetails';
import MysteryDetails from './mysteries/MysteryDetails';
import PrayerIntentions from './intentions/PrayerIntentions';
import { sendNotificationEmail } from '../../api/email';
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
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toast styles

const Rosary = () => {
    const { toggleModal } = useModal();
    const [count, setCount] = useState(0);
    const [selectedMystery, setSelectedMystery] = useState('');
    const [prayerIntentions, setPrayerIntentions] = useState([]);
    const [selectedIntentions, setSelectedIntentions] = useState([]);
    const [isAddingIntention, setIsAddingIntention] = useState(false);
    const [newIntention, setNewIntention] = useState('');
    const [editingIntentionId, setEditingIntentionId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [selectedMysteryDetails, setSelectedMysteryDetails] = useState([]);
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

    const { user, token } = useAuth();
    const { _id } = user || {};
    const userId = _id;

    useEffect(() => {
        fetchIntentions(userId, token, setPrayerIntentions);
        fetchRosaryCount(userId, token, setCount);
        fetchRosaries(userId, token, currentPage, rosariesPerPage, setLoading, setRosaries, setTotalRosaries, setError);

        if (activeTab === 'Responses') {
            fetchMysteryCounts(userId, token, setChartData);
        }

        // Fetch the user data to get the notification preferences
        const fetchUser = async () => {
            try {
                const userData = await getUser(userId, token);
                setIsEmailEnabled(userData.notificationPreferences?.Rosary || false);
            } catch (err) {
                console.error('Failed to fetch user data:', err);
            }
        };

        fetchUser();

        // Fetch the notification preferences when the component loads
        const fetchNotificationPreferences = async () => {
            try {
                const preferences = await getUserNotificationPreferences(userId, token);
                const rosaryNotificationEnabled = preferences?.Rosary || false;
                setIsEmailEnabled(rosaryNotificationEnabled); // Set initial state
            } catch (error) {
                console.error('Failed to fetch notification preferences:', error);
            }
        };

        if (userId && token) {
            fetchNotificationPreferences();
        }

    }, [userId, token, activeTab, currentPage, refreshTrigger]);

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
                token,
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

                const emailData = {
                    to: user.email,
                    subject: 'Rosary Prayer Submitted',
                    message: `Dear ${user.username || 'User'},

You have successfully submitted a Rosary prayer. If you wish to turn off these notifications, please click the link below:

${DOMAIN}/disable-notifications?userId=${user._id}&component=Rosary

Blessings,
Your Prayer Team`,
                };

                await sendNotificationEmail(emailData, token);
                console.log('Notification email sent successfully.');
            }
        } catch (error) {
            console.error('Failed to submit Rosary or send notification email:', error);
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

    return (
        <div className="rosary-component container">
            <BackIcon /> {/* Add the BackIcon component */}
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
                                    handleSaveClick={(id, updatedContent) => handleSaveClick(id, updatedContent, token, fetchIntentions, userId, setPrayerIntentions, setEditingIntentionId, setEditContent)}
                                    handleCancelClick={() => handleCancelClick(setEditingIntentionId, setEditContent)}
                                    handleDeleteIntention={(id) => handleDeleteIntention(id, token, fetchIntentions, userId, setPrayerIntentions)}
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
                                        handleNewIntentionSubmit={(e) => handleNewIntentionSubmit(e, newIntention, userId, token, setPrayerIntentions, setNewIntention, setIsAddingIntention, 'Rosary')}
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
                        <div className="row mt-5">
                            <div className="col-12 text-center">
                                <button 
                                    onClick={handlePrayRosaryWrapper} 
                                    className="btn btn-primary"
                                    disabled={!selectedMystery} // Disable button if no mystery is selected
                                >
                                    {
                                        isSubmitting ? 'Submitting...' : 'Submit Rosary'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'Prayers' && (
                    <>
                        <div className="container">
                            <div className="text-size-controls">
                                Text Size
                                <button onClick={() => decreaseFontSize(setFontSize, MIN_FONT_SIZE)} className='btn btn-outline-secondary btn-sm m-1'>-</button>
                                <button onClick={() => increaseFontSize(setFontSize, MAX_FONT_SIZE)} className='btn btn-outline-secondary btn-sm m-1'>+</button>
                            </div>
                            <RosaryPrayerText fontSize={fontSize} />
                        </div>
                    </>
                )}
                {activeTab === 'Responses' && (
                    <RosaryResponses 
                        rosaries={rosaries}
                        chartData={chartData}
                        columns={columns}
                        handleRowSelect={handleRowSelect}
                        handleDelete={handleDelete}
                        refreshTrigger={refreshTrigger}
                    />
                )}
                {activeTab === 'Settings' && (
                    <div>
                        <div className="email-toggle">
                            <ToggleSlider 
                                isEnabled={isEmailEnabled} 
                                toggleFunction={handleEmailToggle} 
                                componentName="Rosary"
                                token={token}
                                userId={userId}
                            />
                        </div>
                    </div>
                )}
            </main>
            <ToastContainer /> {/* Add ToastContainer for the toast notifications */}
        </div>
    );
};

export default Rosary;
