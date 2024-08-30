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
        console.log(`1. Google Login Button Click`);
        console.log(`2. Google OAuth Flow`);
        const googleToken = response?.credential;
        console.log(`3. OAuth Token Received: `, googleToken);
        console.log(`4. Handle Success Callback`);

        if (!googleToken) {
            toast.error("Google sign-in failed: No token received.");
            return;
        }

        const result = await googleSignIn(googleToken);
        console.log(`9. Backend Response - result: `, result);

        if (result.error) {
            toast.error(result.error);
        } else {
            console.log(`10. Handle Backend Response - setUser(result.user): `, result.user);

            // Set the user in context
            setUser(result.user);

            // Ensure that this log is executed
            console.log(`Supposed to navigate to the proper dashboard (result.user.role): `, result.user.role);
            
            // Adding more logs around the navigate call
            try {
                console.log("About to navigate...");
                navigate(result.user.role === 1 ? '/admin/dashboard' : '/user/dashboard');
                console.log("Navigation should have occurred.");
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
