// src/components/confession/Confession.js

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../api/authHook';
import ConfessionHeader from './components/ConfessionHeader';
import ConfessionForm from './components/ConfessionForm';
import ConfessionPrayers from './components/ConfessionPrayers';
import ConfessionResponses from './components/ConfessionResponses';
import ConfessionSettings from './ConfessionSettings';
import BackIcon from '../utils/BackIcon';
import { fetchNearbyChurches } from '../../api/googleMaps'; 
import { getAllChurches } from '../../api/church';
import { createConfession } from '../../api/confession';

const Confession = () => {
    const { user, token } = useAuth();
    const userId = user?._id;

    // Inside Confession component
    const hasFetchedUserChurches = useRef(false);

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
        fetchChurchesNearby();
    }, [userId]);


    const fetchChurchesNearby = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const churches = await fetchNearbyChurches(latitude, longitude, 5, userId);
                        setNearbyChurches(churches || []);
                    } catch (error) {
                        console.error('Error fetching nearby churches:', error);
                        setNearbyChurches([]);
                    }
                },
                (error) => {
                    console.error('Error fetching location:', error);
                }
            );
        }
    };

    const handleSubmitConfession = async () => {
        try {
            // Automatically set confessionTime to current time if not set
            let timeToSubmit = confessionTime;
            if (!timeToSubmit) {
                timeToSubmit = new Date().toISOString(); // Set to current time if not specified
                setConfessionTime(timeToSubmit);
            }
    
            if (!selectedChurch || !timeToSubmit) {
                alert("Please select a church and set a confession time.");
                return;
            }
    
            // Prepare confession data for submission
            const confessionData = { 
                user: userId, 
                userId, 
                church: selectedChurch._id, // Only send the church ID
                confessionTime: timeToSubmit 
            };
    
            setIsSubmitting(true);
    
            // Submit the confession via the API call
            const response = await createConfession(confessionData);
    
            // Handle response (assuming response will have success message or data)
            if (response && response._id) {
                // console.log("Confession successfully submitted:", response);
                alert("Confession successfully submitted!");
                // Optionally reset form fields
                setSelectedChurch(null);
                setConfessionTime("");
            } else {
                console.error("Unexpected response:", response);
                alert("Failed to submit confession. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting confession:", error);
            alert("An error occurred while submitting confession. Please try again.");
        } finally {
            setIsSubmitting(false); // Ensure submission state is reset
        }
    };

    return (
        <div className="confession-component container">
            <BackIcon />
            <ConfessionHeader activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="p-1">
                {activeTab === 'Form' && (
                    <ConfessionForm
                        userId={userId}               
                        token={token}                 
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
