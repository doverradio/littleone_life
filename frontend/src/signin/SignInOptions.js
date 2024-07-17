import React from 'react';
import { GoogleSignInButton } from './GoogleSignInButton';
import UsernamePasswordSignInForm from './UsernamePasswordSignInForm';
import background from '../assets/background.jpg';
import './SignInOptions.css';

const SignInOptions = ({ signInMethod, setSignInMethod, responseGoogleSuccess, responseGoogleFailure, navigate }) => {
    return (
        <div 
            className="signin-options-container"
            style={{ '--background-image': `url(${background})` }}
        >
            <ul className="signin-options-list">
                <li className={`signin-option ${signInMethod === 'username' ? 'selected' : ''}`} onClick={() => setSignInMethod('username')}>
                    {signInMethod === 'username' ? <strong>Sign in with Username</strong> : 'Sign in with Username'}
                </li>
                <li className={`signin-option ${signInMethod === 'google-signin' ? 'selected' : ''}`} onClick={() => setSignInMethod('google-signin')}>
                    {signInMethod === 'google-signin' ? <strong>Sign in with Google</strong> : 'Sign in with Google'}
                </li>
            </ul>
            {signInMethod && (
                <div className="signin-form">
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
            )}
        </div>
    );
};

export default SignInOptions;
