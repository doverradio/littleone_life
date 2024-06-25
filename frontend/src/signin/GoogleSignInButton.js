import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';

export const GoogleSignInButton = ({ responseGoogleSuccess, responseGoogleFailure }) => {
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
