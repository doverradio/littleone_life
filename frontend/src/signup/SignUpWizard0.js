import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { checkUsernameAvailability } from '../api/auth';

const SignUpWizard = () => {
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: ''
    });


    // Check username availability
    const checkUsername = async () => {
        if (userData.username.length > 0) {
            try {
                const result = await checkUsernameAvailability(userData.username);
                setUserData({ 
                    ...userData, 
                    usernameAvailable: result.isAvailable,
                    canProceed: result.isAvailable
                });
            } catch (error) {
                console.error('Error checking username:', error);
                setUserData({ ...userData, canProceed: false });
            }
        } else {
            setUserData({ ...userData, usernameAvailable: null, canProceed: false });
        }
    };
    
    // Debounce function to delay the execution
    const debouncedCheckUsername = debounce(checkUsername, 1000);

    useEffect(() => {
        if (userData.username.length > 0) {
            debouncedCheckUsername();
        }
        // Cancel the debounce on unmount
        return () => {
            debouncedCheckUsername.cancel();
        };
    }, [userData.username]);

    // Function to render the username availability message
    const renderUsernameAvailabilityMessage = () => {
        if (userData.username.length > 0) {
            if (userData.usernameAvailable === false) {
                return <p style={{ color: 'red' }}>{userData.username} is not available</p>;
            } else if (userData.usernameAvailable === true) {
                return <p style={{ color: 'green' }}>{userData.username} is available</p>;
            }
        }
        // Return an empty paragraph with the same height to maintain layout
        return <p style={{ height: '1rem' }}>&nbsp;</p>;
    };

    const nextStep0 = () => {
        if (userData.username.trim() !== '') {
            setStep(step + 1);
        } else {
            // Optionally, set an error message indicating that the username field is required
            // e.g., setUserData({ ...userData, usernameError: 'Username is required' });
        }
    };

    const nextStep = () => {
        if (userData.canProceed) {
            setStep(step + 1);
        } else {
            // Optionally, set an error message indicating that the current step's input is required or invalid
            // e.g., setUserData({ ...userData, currentStepError: 'This field is required' });
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleChange = input => e => {
        setUserData({ ...userData, [input]: e.target.value });
    };

    const handleSubmit = () => {
        console.log('User Data:', userData);
        // Submit the data to the server
    };

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            if (step === 1 && userData.username.trim() !== '') {
                nextStep0();
            } else if (step !== 1) {
                nextStep();
            }
        }
    }

    // Function to determine if the Next button should be disabled
    const isNextButtonDisabled = () => {
        // Disable if no username is entered or if the username is not available
        return userData.username.trim() === '' || userData.usernameAvailable === false;
    };

    switch(step) {
        case 1:
            return (
                <div className="row">
                    <div className="col-12">
                        {renderUsernameAvailabilityMessage()}
                        <input 
                            type="text" 
                            value={userData.username} 
                            onChange={handleChange('username')} 
                            className='form-control'
                            placeholder="Username"
                            onKeyPress={handleKeyPress}
                        />
                        {userData.usernameError && <p style={{ color: 'red' }}>{userData.usernameError}</p>}
                        
                        <button 
                            className="btn btn-primary btn-block m-1" 
                            onClick={nextStep0}
                            disabled={isNextButtonDisabled()} // Disable based on condition
                        >
                            Next
                        </button>
                    </div>
                </div>
            );
        case 2:
            return (
                <div>
                    <input 
                        type="email" 
                        value={userData.email} 
                        onChange={handleChange('email')} 
                        placeholder="Email"
                        className='form-control'
                        onKeyPress={handleKeyPress}
                    />
                    <div className="row">
                        <div className="col">
                            <button className="btn btn-secondary btn-sm w-100" onClick={prevStep}>Back</button>
                        </div>
                        <div className="col">
                            <button className="btn btn-primary btn-sm w-100" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                </div>
            );
        case 3:
            return (
                <div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <input 
                                type="text" 
                                value={userData.firstName} 
                                onChange={handleChange('firstName')} 
                                placeholder="First Name"
                                className='form-control mb-2 mb-md-0' // Margin bottom on small screens only
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <input 
                                type="text" 
                                value={userData.lastName} 
                                onChange={handleChange('lastName')} 
                                placeholder="Last Name"
                                className='form-control'
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                    </div>
                    <div className="row mt-3"> {/* Margin top for spacing between inputs and buttons */}
                        <div className="col">
                            <button className="btn btn-secondary btn-sm w-100" onClick={prevStep}>Back</button>
                        </div>
                        <div className="col">
                            <button className="btn btn-primary btn-sm w-100" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                </div>
            );
            
        // Repeat for other steps
        case 5: // Summary and Submission
            return (
                <div>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    {/* Display other data */}
                    <div className="row">
                        <div className="col">
                            <button className="btn btn-secondary btn-sm w-100" onClick={prevStep}>Back</button>
                        </div>
                        <div className="col">
                            <button className="btn btn-primary btn-sm w-100" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                </div>
            );
        default:
            return <div>Unknown step</div>;
    }
};

export default SignUpWizard;
