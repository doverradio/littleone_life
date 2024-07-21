import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../api/auth';
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
    handleEmailToggle,
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
    formatDataForTable
} from './utils/rosaryUtils';
import { fetchRosaries, fetchMysteryCounts, fetchIntentions, fetchRosaryCount } from './utils/fetchFunctions';
import RosaryPrayerText from './RosaryPrayerText';
import RosaryResponses from './RosaryResponses';
import ToggleSlider from '../utils/ToggleSlider';
import RosaryHeader from './RosaryHeader';

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
    const [activeTab, setActiveTab] = useState('Questions');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEmailEnabled, setIsEmailEnabled] = useState(false);
    const DEFAULT_FONT_SIZE = 11;
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

    const {
        user: { _id },
        token
    } = isAuthenticated();

    const userId = _id;

    useEffect(() => {
        fetchIntentions(userId, token, setPrayerIntentions);
        fetchRosaryCount(userId, token, setCount);
        fetchRosaries(userId, token, currentPage, rosariesPerPage, setLoading, setRosaries, setTotalRosaries, setError);

        if (activeTab === 'Responses') {
            fetchMysteryCounts(userId, token, setChartData);
        }
    }, [userId, token, activeTab, currentPage]);

    const handleCloseForm = () => {
        setIsAddingIntention(false);
    };

    const handleAddIntentionClick = () => {
        setIsAddingIntention(true);
    };

    return (
        <div className="rosary-component container">
            <RosaryHeader
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                rosaryIcon={rosaryIcon}
            />
            <main className="rosary-main">
                {activeTab === 'Questions' && (
                    <div className="questions-tab">
                        <h2 className="text-center">{selectedMystery}</h2>
                        <Mysteries handleMysteryClick={(name) => handleMysteryClick(name, mysteriesDetails, setSelectedMystery, setSelectedMysteryDetails, setSelectedMysteryIcon, mysteries, setShowVirtualRosary)} />
                        {selectedMystery && (
                            <MysteryDetails selectedMysteryDetails={selectedMysteryDetails} />
                        )}
                        <PrayerIntentions 
                            prayerIntentions={prayerIntentions}
                            selectedIntentions={selectedIntentions}
                            handleIntentionCheckboxChange={handleIntentionCheckboxChange}
                            handleEditClick={handleEditClick}
                            handleUpdateIntention={handleUpdateIntention}
                            handleDeleteIntention={handleDeleteIntention}
                            editingIntentionId={editingIntentionId}
                            editContent={editContent}
                            setEditContent={setEditContent} 
                            isAddingIntention={isAddingIntention}
                            addPrayerIntention={handleAddIntentionClick}
                            handleNewIntentionSubmit={(e) => handleNewIntentionSubmit(e, newIntention, userId, token, setPrayerIntentions, setNewIntention, setIsAddingIntention)}
                            newIntention={newIntention}
                            setNewIntention={setNewIntention}
                            isSubmitting={isSubmitting}
                            handlePrayRosary={handlePrayRosary}
                            setEditingIntentionId={setEditingIntentionId} 
                            setSelectedIntentions={setSelectedIntentions} 
                            setPrayerIntentions={setPrayerIntentions} // Make sure this prop is passed
                        />
                        {isAddingIntention && (
                            <PrayerIntentionsForm
                                isAddingIntention={isAddingIntention}
                                newIntention={newIntention}
                                handleNewIntentionSubmit={(e) => handleNewIntentionSubmit(e, newIntention, userId, token, setPrayerIntentions, setNewIntention, setIsAddingIntention)}
                                setNewIntention={setNewIntention}
                                handleCloseForm={handleCloseForm} 
                            />
                        )}
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
                        <div className="row mt-5">
                            <div className="col-12 text-center">
                                <button 
                                    onClick={handlePrayRosary} 
                                    className="btn btn-primary"
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
                                isDisabled={true} // Disable the toggle
                            />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Rosary;
