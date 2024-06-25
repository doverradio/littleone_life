import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { googleSignup } from '../api/auth'; // Import the googleSignup function

const GoogleSignupButton = ({ informParent = f => f }) => {
    const responseGoogleSuccess = async (response) => {
        try {
            const googleToken = response.credential; // Extract the token directly
            const result = await googleSignup({ idToken: googleToken });
            if (result.error) {
                toast.error(result.error);
            } else {
                informParent(result);
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
