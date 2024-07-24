import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../api/auth';
import { useModal } from '../../context/ModalContext';
import massIcon from './mass_icon.png';
import './styles.css';
import MassHeader from './components/MassHeader';
import MassForm from './components/MassForm';
import MassPrayers from './MassPrayers';
import MassResponses from './MassResponses';
import MassSettings from './MassSettings';
import { fetchMassData, handleMassData } from './helpers/massHelpers';
import { DEFAULT_FONT_SIZE, MAX_FONT_SIZE, MIN_FONT_SIZE, initialChurchState, MASS_TIMES_OPTIONS } from './constants';
import BackIcon from '../utils/BackIcon'; // Import the BackIcon component
import novusOrdoImage from './novus_ordo.jpg'
import latinMassImage from './latin_mass.jpg'

const Mass = () => {
    const { toggleModal } = useModal();
    const { user: { _id }, token } = isAuthenticated();
    const userId = _id;

    const [count, setCount] = useState(0);
    const [massAttendances, setMassAttendances] = useState([]);
    const [activeTab, setActiveTab] = useState('Form');
    const [showMap, setShowMap] = useState(false);
    const [selectedChurch, setSelectedChurch] = useState(null);
    const [pieChartData, setPieChartData] = useState([]);
    const [error, setError] = useState('');
    const [isEmailEnabled, setIsEmailEnabled] = useState(false);
    const [isAddingIntention, setIsAddingIntention] = useState(false);
    const [newIntention, setNewIntention] = useState('');
    const [editingIntentionId, setEditingIntentionId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [showChurchForm, setShowChurchForm] = useState(false);
    const [newChurch, setNewChurch] = useState(initialChurchState);
    const [selectedMassTime, setSelectedMassTime] = useState('');
    const [specialIntentions, setSpecialIntentions] = useState('');
    const [selectedIntentions, setSelectedIntentions] = useState([]);
    const [userChurches, setUserChurches] = useState([]);
    const [prayerIntentions, setPrayerIntentions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);

    useEffect(() => {
        fetchMassData(userId, token, setCount, setMassAttendances, setPieChartData, setUserChurches, setPrayerIntentions, setError);
    }, [userId, token]);

    const handleSubmitMass = async () => {
        setIsSubmitting(true);
        await handleMassData(userId, selectedChurch, selectedMassTime, selectedIntentions, specialIntentions, token, toggleModal, setCount, setSelectedIntentions, setSelectedChurch, setSelectedMassTime);
        setIsSubmitting(false);
    };

    return (
        <div className="mass-component container">
            <BackIcon /> {/* Add the BackIcon component */}
            <MassHeader activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className='p-1'>
                {activeTab === 'Form' && (
                    <MassForm
                        userChurches={userChurches}
                        showChurchForm={showChurchForm}
                        setShowChurchForm={setShowChurchForm}
                        submitNewChurch={handleSubmitMass}
                        handleChurchChange={handleSubmitMass}
                        newChurch={newChurch}
                        selectedMassTime={selectedMassTime}
                        handleMassTimeChange={handleSubmitMass}
                        massTimesOptions={MASS_TIMES_OPTIONS}
                        prayerIntentions={prayerIntentions}
                        editingIntentionId={editingIntentionId}
                        handleUpdateIntention={handleSubmitMass}
                        setEditContent={setEditContent}
                        setEditingIntentionId={setEditingIntentionId}
                        handleDeleteIntention={handleSubmitMass}
                        selectedIntentions={selectedIntentions}
                        handleIntentionCheckboxChange={handleSubmitMass}
                        handleEditClick={handleSubmitMass}
                        isAddingIntention={isAddingIntention}
                        handleNewIntentionSubmit={handleSubmitMass}
                        newIntention={newIntention}
                        setNewIntention={setNewIntention}
                        setIsAddingIntention={setIsAddingIntention}
                        setSpecialIntentions={setSpecialIntentions}
                        handleSubmitMass={handleSubmitMass}
                        isSubmitting={isSubmitting}
                        count={massAttendances.length}
                        handleChurchSelection={handleSubmitMass}
                        editContent={editContent}
                        showMap={showMap}
                        setShowMap={setShowMap}
                        selectedChurch={selectedChurch}
                        specialIntentions={specialIntentions}
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
