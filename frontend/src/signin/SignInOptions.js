import React from 'react';
import { GoogleSignInButton } from './GoogleSignInButton';
import UsernamePasswordSignInForm from './UsernamePasswordSignInForm';

const SignInOptions = ({ signInMethod, setSignInMethod, responseGoogleSuccess, responseGoogleFailure, navigate }) => {
    return (
        <div className="signin-options-container">
            <ul className="signin-options-list" style={{ listStyle: "none" }}>
                <li style={{ border: '0.1px solid black' }} className={`m-1 p-2 signin-option ${signInMethod === 'username' ? 'selected' : ''}`} onClick={() => setSignInMethod('username')}>
                    
                    {
                        signInMethod === 'username' ? <strong>Sign in with Username</strong> : `Sign in with Username`
                    }
                </li>
                <li style={{ border: '0.1px solid black' }} className={`m-1 p-2 signin-option ${signInMethod === 'google-signin' ? 'selected' : ''}`} onClick={() => setSignInMethod('google-signin')}>
                    {
                        signInMethod === 'google-signin' ? <strong>Sign in with Google</strong> : `Sign in with Google`
                    }
                </li>
                {/* Add more options here */}
            </ul>
            {signInMethod === 'username' && <UsernamePasswordSignInForm navigate={navigate} />}
            {signInMethod === 'google-signin' && (
                <div className="google-signin-form">
                    <GoogleSignInButton 
                        responseGoogleSuccess={responseGoogleSuccess}
                        responseGoogleFailure={responseGoogleFailure}
                    />
                </div>
            )}
        </div>
    );
};

export default SignInOptions;
