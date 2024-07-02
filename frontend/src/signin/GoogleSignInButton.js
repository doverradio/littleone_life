import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { googleSignIn, authenticate } from '../api/auth';

export const GoogleSignInButton = ({ responseGoogleSuccess, responseGoogleFailure }) => {
    const [isRequestPending, setIsRequestPending] = useState(false); // To prevent multiple requests
    const navigate = useNavigate();

    // Log to check if the component re-renders
    useEffect(() => {
        console.log('GoogleSignInButton component mounted');

        return () => {
            console.log('GoogleSignInButton component unmounted');
        };
    }, []);


    const handleSuccess = async (response) => {
        if (isRequestPending) {
            console.log('Request already pending, skipping this call');
            return; // Prevent multiple requests
        }

        setIsRequestPending(true);

        console.log('Google credential (GoogleSignInButton):', response.credential);
        try {
            const result = await googleSignIn(response.credential);
            if (result.error) {
                console.log('GOOGLE SIGNIN ERROR', result.error);
                toast.error('Google sign-in failed. Please try again.');
                responseGoogleFailure(result.error);
                setIsRequestPending(false);
            } else {
                console.log('GOOGLE SIGNIN SUCCESS', result);
                authenticate(result, () => {
                    responseGoogleSuccess(result);
                    const { user } = result;
                    if (user && user.role === 1) {
                        navigate('/admin/dashboard');
                    } else {
                        navigate('/user/dashboard');
                    }
                });
                toast.success('Google sign-in successful!');
            }
        } catch (error) {
            console.error('GOOGLE SIGNIN ERROR', error);
            toast.error('Google sign-in failed. Please try again.');
            responseGoogleFailure(error);
            setIsRequestPending(false);
        }
    };

    return (
        <div className="pb-3">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={responseGoogleFailure}
                text="Sign in with Google"
            />
        </div>
    );
};
