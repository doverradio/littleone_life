import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { googleSignup } from '../api/auth'; // Import googleSignup only
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext'; // Using useUser from the context

const log = console.log;

const GoogleSignupButton = ({ informParent = f => f }) => {
    const navigate = useNavigate();
    const { setUser } = useUser(); // Get setUser from UserContext

    const responseGoogleSuccess = async (response) => {
        try {
            const googleToken = response.credential; // Extract the token directly
            const result = await googleSignup(googleToken);
            log(`result: `, result);
            if (result.error) {
                toast.error(result.error);
            } else {
                // No need for authenticate, simply handle session data and navigation
                setUser(result.user); // Store the user in the context (session-based)
                informParent(result); // Inform parent of the successful signup
                const { user } = result;
                if (user && user.role === 1) {
                    navigate('/admin/dashboard'); // Redirect based on role
                } else {
                    navigate('/user/dashboard');
                }
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

    return (
        <div className="pb-3">
            <GoogleLogin
                onSuccess={responseGoogleSuccess}
                onError={responseGoogleFailure}
                text="Sign up with Google"
            />
        </div>
    );
};

export default GoogleSignupButton;
