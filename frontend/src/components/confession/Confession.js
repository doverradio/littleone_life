// src/components/confession/Confession.js

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../api/authHook';
import ConfessionHeader from './components/ConfessionHeader';
import ConfessionForm from './components/ConfessionForm';
import ConfessionPrayers from './components/ConfessionPrayers';
import ConfessionResponses from './components/ConfessionResponses';
import ConfessionSettings from './ConfessionSettings';
import './styles.css';
import BackIcon from '../utils/BackIcon';

const Confession = () => {
    const { user, token } = useAuth();
    const { _id } = user || {};
    const userId = _id;

    const [confessions, setConfessions] = useState([]);
    const [activeTab, setActiveTab] = useState('Form');
    const [selectedChurch, setSelectedChurch] = useState(null);
    const [nearbyChurches, setNearbyChurches] = useState([]);
    const [userChurches, setUserChurches] = useState([]);
    const [confessionTime, setConfessionTime] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showChurchForm, setShowChurchForm] = useState(false);
    const [newChurch, setNewChurch] = useState({ name: '', address: '', city: '', state: '', country: '', zipCode: '', phone: '', website: '', additionalInfo: '' });

    useEffect(() => {
        fetchUserChurches();
        fetchNearbyChurches();
    }, []);

    const fetchUserChurches = async () => {
        // Logic to fetch user's churches
    };

    const fetchNearbyChurches = async () => {
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
    };

    const handleSubmitConfession = async () => {
        if (!selectedChurch || !confessionTime) {
            alert("Please select a church and set a confession time");
            return;
        }

        const confessionData = {
            user: userId,
            church: selectedChurch,
            confessionTime: confessionTime
        };

        try {
            setIsSubmitting(true);
            // Add your API call to submit the confession here
            console.log("Confession submitted:", confessionData);
            // Reset state and update UI as needed
        } catch (error) {
            console.error("Error submitting confession:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="confession-component container">
            <BackIcon />
            <ConfessionHeader activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className='p-1'>
                {activeTab === 'Form' && (
                    <ConfessionForm
                        userChurches={userChurches}
                        nearbyChurches={nearbyChurches}
                        setUserChurches={setUserChurches}
                        setNearbyChurches={setNearbyChurches}
                        showChurchForm={showChurchForm}
                        setShowChurchForm={setShowChurchForm}
                        newChurch={newChurch}
                        selectedChurch={selectedChurch}
                        setSelectedChurch={setSelectedChurch}
                        confessionTime={confessionTime}
                        setConfessionTime={setConfessionTime}
                        handleSubmitConfession={handleSubmitConfession}
                        isSubmitting={isSubmitting}
                    />
                )}
                {activeTab === 'Prayers' && (
                    <ConfessionPrayers />
                )}
                {activeTab === 'Responses' && (
                    <ConfessionResponses />
                )}
                {activeTab === 'Settings' && (
                    <ConfessionSettings />
                )}
            </div>
        </div>
    );
};

export default Confession;
