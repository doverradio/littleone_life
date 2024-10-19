// src/signup/GoogleSignupButton.js

import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { googleSignup } from '../api/auth'; 
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import NewUserWizard from './newuserwizard/NewUserWizard'; // Import the wizard

const GoogleSignupButton = ({ informParent = f => f }) => {
    const [showWizard, setShowWizard] = useState(false); // To control when to show the wizard
    const { setUser, userPreferences } = useUser(); 
    const navigate = useNavigate();

    const responseGoogleSuccess = async (response) => {
        try {
            const googleToken = response.credential;
            const result = await googleSignup(googleToken, userPreferences);
            
            if (result.error) {
                toast.error(result.error);
            } else {
                setUser(result.user);
                informParent(result);
                
                // Instead of navigating directly, we show the wizard first
                setShowWizard(true); // Trigger the wizard
            }
        } catch (error) {
            console.error('GOOGLE SIGNUP ERROR', error);
            toast.error('Google sign-up failed. Please try again.');
        }
    };

    const responseGoogleFailure = (response) => {
        console.error("Google sign-up failed", response);
        toast.error("Google sign-up failed. Please try again.");
    };

    // Handle form submission from the wizard
    const handleWizardCompletion = () => {
        // Once the wizard is complete, navigate to the dashboard
        navigate('/user/dashboard');
    };

    return (
        <div className="pb-3">
            {!showWizard ? (
                <GoogleLogin
                    onSuccess={responseGoogleSuccess}
                    onError={responseGoogleFailure}
                    text="Sign up with Google"
                />
            ) : (
                <NewUserWizard informParent={handleWizardCompletion} />
            )}
        </div>
    );
};

export default GoogleSignupButton;
