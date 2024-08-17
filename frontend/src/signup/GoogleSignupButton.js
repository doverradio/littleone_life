import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { googleSignup, authenticate } from '../api/auth'; // Import the googleSignup and authenticate functions
import { useNavigate } from "react-router-dom";
import { useToken } from '../context/TokenContext'; // Import useToken from the context

const log = console.log;

const GoogleSignupButton = ({ informParent = f => f }) => {
    const navigate = useNavigate();
    const { setToken } = useToken(); // Get setToken from TokenContext

    const responseGoogleSuccess = async (response) => {
        try {
            const googleToken = response.credential; // Extract the token directly
            const result = await googleSignup(googleToken);
            log(`result: `, result);
            if (result.error) {
                toast.error(result.error);
            } else {
                authenticate(result, setToken, () => { // Pass setToken to authenticate
                    informParent(result);
                    const { user } = result;
                    if (user && user.role === 1) {
                        navigate('/admin/dashboard');
                    } else {
                        navigate('/user/dashboard');
                    }
                });
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
