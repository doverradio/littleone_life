// src/components/mass/Mass.js

import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../api/auth';
import { fetchIntentions } from './utils/fetchFunctions';
import { useModal } from '../../context/ModalContext';
import massIcon from './mass_icon.png';
import './styles.css';
import MassHeader from './components/MassHeader';
import MassForm from './components/MassForm';
import MassPrayers from './MassPrayers';
import MassResponses from './MassResponses';
import MassSettings from './MassSettings';
import { fetchMassData, handleMassData, addChurchToUser } from './helpers/massHelpers';
import { fetchNearbyChurches } from '../../api/googleMaps';
import { DEFAULT_FONT_SIZE, MAX_FONT_SIZE, MIN_FONT_SIZE, initialChurchState, MASS_TIMES_OPTIONS } from './constants';
import BackIcon from '../utils/BackIcon';
import novusOrdoImage from './novus_ordo.jpg';
import latinMassImage from './latin_mass.jpg';

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
    const [selectedIntentions, setSelectedIntentions] = useState([]); // Ensure this is defined
    const [userChurches, setUserChurches] = useState([]);
    const [prayerIntentions, setPrayerIntentions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
    const [nearbyChurches, setNearbyChurches] = useState([]);

    useEffect(() => {
        fetchMassData(userId, token, setCount, setMassAttendances, setPieChartData, setUserChurches, setPrayerIntentions, setError);
        fetchIntentions(userId, token, setPrayerIntentions);
    }, [userId, token]);

    const handleSubmitMass = async () => {
        setIsSubmitting(true);
        await handleMassData(userId, selectedChurch, selectedMassTime, selectedIntentions, specialIntentions, token, toggleModal, setCount, setSelectedIntentions, setSelectedChurch, setSelectedMassTime);
        setIsSubmitting(false);
    };

    const handleChurchChange = (church) => {
        // Logic to handle church change
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const nearbyChurchesData = await fetchNearbyChurches(latitude, longitude, 5, token);
                        if (Array.isArray(nearbyChurchesData)) {
                            setNearbyChurches(nearbyChurchesData);
                        } else {
                            setNearbyChurches([]); // In case of error, set to an empty array
                            console.error('Error fetching nearby churches:', nearbyChurchesData);
                        }
                    } catch (error) {
                        console.error('Error fetching nearby churches:', error);
                        setNearbyChurches([]); // In case of error, set to an empty array
                    }
                },
                (error) => {
                    console.error('Error fetching location:', error);
                }
            );
        }
    }, [token, userId]);

    const handleChurchSelection = (church) => {
        setSelectedChurch(church);
    };

    const addChurchToMassOptions = async (church, token) => {
        try {
            const result = await addChurchToUser(userId, church, token);
            if (result.churches && result.churches.length > 0) {
                setUserChurches(prev => [...prev, ...result.churches]);
                setNearbyChurches(prev => prev.filter(c => c.placeId !== church.placeId));
            }
        } catch (error) {
            console.error('Error adding church to user:', error);
        }
    };

    const handleEditClick = (id, content) => {
        setEditingIntentionId(id);
        setEditContent(content);
    };

    const handleUpdateIntention = () => {
        // Logic for updating an intention
    };

    return (
        <div className="mass-component container">
            <BackIcon />
            <MassHeader activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className='p-1'>
                {activeTab === 'Form' && (
                    <MassForm
                        userChurches={userChurches}
                        setUserChurches={setUserChurches}
                        nearbyChurches={nearbyChurches}
                        setNearbyChurches={setNearbyChurches}
                        showChurchForm={showChurchForm}
                        setShowChurchForm={setShowChurchForm}
                        newChurch={newChurch}
                        selectedMassTime={selectedMassTime}
                        massTimesOptions={MASS_TIMES_OPTIONS}
                        prayerIntentions={prayerIntentions}
                        editingIntentionId={editingIntentionId}
                        handleUpdateIntention={handleUpdateIntention}
                        setEditContent={setEditContent}
                        setEditingIntentionId={setEditingIntentionId}
                        selectedIntentions={selectedIntentions}
                        setSelectedIntentions={setSelectedIntentions} // Pass this prop
                        handleEditClick={handleEditClick}
                        isAddingIntention={isAddingIntention}
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
                        selectedChurch={selectedChurch}
                        specialIntentions={specialIntentions}
                        fetchIntentions={fetchIntentions}
                        setPrayerIntentions={setPrayerIntentions}
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
