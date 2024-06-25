import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleSignupButton from './GoogleSignupButton';
import './styles.css';

const SignUpOptions = ({ setSignUpMethod, informParent, setStep, step }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setSignUpMethod(option);
        setStep(1); // Ensure we reset to step 1 for email sign-up
        if (option === 'google-signup') {
            setStep(1); // Show the Google sign-up button first
        }
    };

    return (
        <div className="signup-options-container">
            <ul className="signup-options-list">
                <li className={`signup-option ${selectedOption === 'email' ? 'selected' : ''} m-1`} onClick={() => handleOptionClick('email')}>
                    Sign up with Email
                </li>
                <li className={`signup-option ${selectedOption === 'google-signup' ? 'selected' : ''} m-1`} onClick={() => handleOptionClick('google-signup')}>
                    Sign up with Google
                </li>
                {/* Add more options here */}
            </ul>
            <div className="signin-message">
                <p>Already have an account? <Link to="/signin">Please click here to sign in</Link></p>
            </div>
        </div>
    );
};

export default SignUpOptions;
