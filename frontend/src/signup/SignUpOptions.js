import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleSignupButton from './GoogleSignupButton';

const SignUpOptions = ({ setSignUpMethod, informParent }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setSignUpMethod(option);
    };

    return (
        <div>
            <div className="sign-up-options">
                <button className="btn btn-primary btn-sm m-1 option-button" onClick={() => handleOptionClick('email')}>
                    Sign up with Email
                </button>
                <button className="btn btn-primary btn-sm m-1 option-button" onClick={() => handleOptionClick('google-signup')}>
                    Sign up with Google
                </button>
            </div>
            {selectedOption === 'email' && (
                <div className="email-signup-form">
                    {/* Add your email signup form here */}
                </div>
            )}
            {selectedOption === 'google-signup' && (
                <div className="google-signup-form">
                    <GoogleSignupButton informParent={informParent} />
                </div>
            )}
            <div className="signin-message">
                <p>Already have an account? <Link to="/signin">Please click here to sign in</Link></p>
            </div>
        </div>
    );
};

export default SignUpOptions;
