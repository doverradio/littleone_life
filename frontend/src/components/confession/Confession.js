// src/components/confession/Confession.js

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../api/authHook';
import ConfessionHeader from './components/ConfessionHeader';
import ConfessionForm from './components/ConfessionForm';
import ConfessionPrayers from './components/ConfessionPrayers';
import ConfessionResponses from './components/ConfessionResponses';
import ConfessionSettings from './ConfessionSettings';
import BackIcon from '../utils/BackIcon';
import { fetchNearbyChurches } from '../../api/googleMaps'; // Assuming you have this function

const Confession = () => {
    const { user, token } = useAuth();
    const userId = user?._id;

    const [confessions, setConfessions] = useState([]);
    const [activeTab, setActiveTab] = useState('Form');
    const [selectedChurch, setSelectedChurch] = useState(null);
    const [nearbyChurches, setNearbyChurches] = useState([]);
    const [favoriteChurches, setFavoriteChurches] = useState([]);
    const [userChurches, setUserChurches] = useState([]);
    const [confessionTime, setConfessionTime] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showChurchForm, setShowChurchForm] = useState(false);
    const [newChurch, setNewChurch] = useState({});

    useEffect(() => {
        fetchUserChurches();
        fetchChurchesNearby();
    }, [userId, token]);

    const fetchUserChurches = async () => {
        // Logic to fetch user's churches
    };

    const fetchChurchesNearby = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        // Ensure that userId is being passed
                        const churches = await fetchNearbyChurches(latitude, longitude, 5, userId);
                        setNearbyChurches(churches || []); // Fallback in case of an error
                    } catch (error) {
                        console.error('Error fetching nearby churches:', error);
                        setNearbyChurches([]); // Fallback in case of an error
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
            alert("Please select a church and set a confession time.");
            return;
        }

        const confessionData = { user: userId, church: selectedChurch, confessionTime };

        try {
            setIsSubmitting(true);
            // API call to submit confession
            console.log("Confession submitted:", confessionData);
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
            <div className="p-1">
                {activeTab === 'Form' && (
                    <ConfessionForm
                        userId={userId}               // <-- Pass userId to the form
                        token={token}                 // <-- Pass token to the form
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
                        setFavoriteChurches={setFavoriteChurches}
                    />
                )}
                {activeTab === 'Prayers' && <ConfessionPrayers />}
                {activeTab === 'Responses' && <ConfessionResponses />}
                {activeTab === 'Settings' && <ConfessionSettings />}
            </div>
        </div>
    );
};

export default Confession;
