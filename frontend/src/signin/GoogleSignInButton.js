import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { authenticate } from '../api/auth';

export const GoogleSignInButton = ({ responseGoogleSuccess, responseGoogleFailure }) => {
    const navigate = useNavigate();

    const handleSuccess = async (response) => {
        console.log('Google credential:', response.credential);
        try {
            const res = await fetch(`${process.env.REACT_APP_API}/google-login`, {
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
                responseGoogleFailure(data.error);
            } else {
                console.log('GOOGLE SIGNIN SUCCESS', data);
                authenticate(data, () => {
                    responseGoogleSuccess(data);
                    const { user } = data;
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
