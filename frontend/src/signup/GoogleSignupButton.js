import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';

const GoogleSignupButton = ({ informParent = f => f }) => {
    const responseGoogleSuccess = async (response) => {
        console.log('Google credential:', response.credential);
        try {
            const res = await fetch(`${process.env.REACT_APP_API}/google-signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idToken: response.credential })
            });
            const data = await res.json();
            if (data.error) {
                console.log('GOOGLE SIGNUP ERROR', data.error);
                toast.error('Google sign-up failed. Please try again.');
            } else {
                console.log('GOOGLE SIGNUP SUCCESS', data);
                informParent(data);
                toast.success('Google sign-up successful! Please complete the signup process.');
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
