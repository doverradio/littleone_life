import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { googleSignIn } from '../api/auth';
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext'; // Import useUser hook

export const GoogleSignInButton = () => {
    const navigate = useNavigate();
    const { setUser } = useUser(); // Access the setUser function from UserContext

    const handleSuccess = async (response) => {

        const googleToken = response?.credential;
        
        if (!googleToken) {
            toast.error("Google sign-in failed: No token received.");
            return;
        }

        const result = await googleSignIn(googleToken);
        if (result.error) {
            toast.error(result.error);
        } else {
            
            setUser(result.user); // Set the user in context

            try {
                navigate(result.user.role === 1 ? '/admin/dashboard' : '/user/dashboard');
            } catch (err) {
                console.error("Navigation failed:", err);
            }
        }
    };

    const handleError = (error) => {
        console.error("Google Sign-In Error:", error);
        toast.error("Google sign-in failed. Please try again.");
    };

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            text="Sign in with Google"
        />
    );
};
