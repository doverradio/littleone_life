import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';

const GoogleSigninButton = ({ informParent = f => f }) => {
    const responseGoogleSuccess = async (response) => {
        console.log('Google credential:', response.credential);
        try {
            const res = await fetch(`${process.env.REACT_APP_API}/google-signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idToken: response.credential })
            });
            const data = await res.json();
            if (data.error) {
                console.log('GOOGLE SIGNIN ERROR', data.error);
                toast.error('Google sign-in failed. Please try again.');
            } else {
                console.log('GOOGLE SIGNIN SUCCESS', data);
                informParent(data);
                toast.success('Google sign-in successful!');
            }
        } catch (error) {
            console.error('GOOGLE SIGNIN ERROR', error);
            toast.error('Google sign-in failed. Please try again.');
        }
    };

    const responseGoogleFailure = (response) => {
        console.error("Google sign-in failed", response);
        toast.error("Google sign-in failed. Please try again.");
    };

    return (
        <div className="pb-3">
            <GoogleLogin
                onSuccess={responseGoogleSuccess}
                onError={responseGoogleFailure}
                text="Sign in with Google"
            />
        </div>
    );
};

export default GoogleSigninButton;
