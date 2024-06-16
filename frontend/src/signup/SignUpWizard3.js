import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { useNavigate } from 'react-router-dom';
import { checkUsernameAvailability, signup, googleSignup } from '../api/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v1 as uuidv1 } from 'uuid';  // Import uuidv1

const SignUpWizard = ({ googleProfile }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({
        username: '',
        email: googleProfile ? googleProfile.email : '',
        firstName: googleProfile ? googleProfile.givenName : '',
        lastName: googleProfile ? googleProfile.familyName : '',
        phone: '',
        password: googleProfile ? uuidv1() : '',
        confirmPassword: googleProfile ? uuidv1() : '' // New state for confirming password
    });
    const [usernameEmpty, setUsernameEmpty] = useState(false); // State to track if username is empty
    const [emailEmpty, setEmailEmpty] = useState(false); // State to track if email is empty

    useEffect(() => {
        if (googleProfile) {
            setStep(1);
        }
    }, [googleProfile]);

    // Calculate progress percentage
    const progress = step === 1 ? 1 : (step - 1) * (100 / 4);

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

    // Helper function to format phone number
    const formatPhoneNumber = (value) => {
        if (!value) return value;

        // Remove all non-digits
        const phoneNumber = value.replace(/[^\d]/g, '');

        // Format based on length
        if (phoneNumber.length < 4) {
            return phoneNumber;
        } else if (phoneNumber.length < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        } else {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
        }
    };

    const nextStep0 = () => {
        if (userData.username.trim() !== '') {
            setStep(step + 1);
        } else {
            setUsernameEmpty(true); // Set usernameEmpty state to true if username is empty
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

    const handleNextStep = () => {
        // Validation to ensure passwords match
        if (userData.password !== userData.confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        // Proceed to next step if passwords match
        setStep(step + 1);
    };

    const handleChange = input => e => {
        let value = e.target.value;
        if (input === 'username' && usernameEmpty) {
            setUsernameEmpty(false); // Reset usernameEmpty state to false when user starts typing
        }
        if (input === 'phone') {
            // Format phone number
            if (!value) return value;

            // Remove all non-digits
            const phoneNumber = value.replace(/[^\d]/g, '');

            // Format based on length
            if (phoneNumber.length < 4) {
                value = phoneNumber;
            } else if (phoneNumber.length < 7) {
                value = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
            } else {
                value = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
            }
        }

        setUserData({ ...userData, [input]: value });
    };

    const handleSubmit = async () => {
        try {
            let response;
            if (googleProfile) {
                response = await googleSignup({ ...userData, tokenId: googleProfile.tokenId });
            } else {
                response = await signup(userData);
            }

            // Optionally, you can handle success response here
            // Show success toast
            toast.success("Signup successful! Redirecting to Sign In...", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Redirect to Sign In page after successful signup
            navigate('/signin');
        } catch (error) {
            // Optionally, you can handle error response here
            // Show error toast
            toast.error("Signup failed. Please try again.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    // Function to handle key press event
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (step === 1) {
                nextStep0(); // Handle username validation in the first step
            } else if (step === 2) {
                handleNextStep(); // Use handleNextStep to ensure password validation in step 2
            } else {
                nextStep(); // Proceed to the next step for other steps
            }
        }
    };

    // Check if the Next button should be disabled
    const isNextButtonDisabled = () => {
        if (step === 1) {
            return userData.username.trim() === '';
        } else if (step === 2) {
            return userData.password.trim() === '' || userData.confirmPassword.trim() === '';
        } else if (step === 3) {
            return userData.firstName.trim() === '' || userData.lastName.trim() === '';
        } else if (step === 4) {
            return userData.phone.trim() === '';
        }
        return false;
    };

    return (
        <div>
            <ToastContainer /> {/* Toast container for notifications */}
            <div className="progress mb-4">
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                />
            </div>
            {step === 1 && (
                <>
                    <div>
                        <input 
                            type="text" 
                            value={userData.username} 
                            onChange={handleChange('username')} 
                            placeholder="Enter Username"
                            className='form-control'
                            onKeyPress={handleKeyPress}
                        />
                        {renderUsernameAvailabilityMessage()}
                        <div className="row">
                            <div className="col">
                                <button 
                                    className="btn btn-primary btn-sm w-100 m-1" 
                                    onClick={nextStep0}
                                    disabled={isNextButtonDisabled()} // Disable based on condition
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {step === 2 && (
                <>
                    <div>
                        <input 
                            type="text" 
                            value={userData.email} 
                            onChange={handleChange('email')} 
                            placeholder="Enter Email"
                            className='form-control'
                            onKeyPress={handleKeyPress}
                        />
                        {!googleProfile && (
                            <>
                                <input 
                                    type="password" 
                                    value={userData.password} 
                                    onChange={handleChange('password')} 
                                    placeholder="Password"
                                    className='form-control mb-3'
                                />
                                <input 
                                    type="password" 
                                    value={userData.confirmPassword} 
                                    onChange={handleChange('confirmPassword')} 
                                    placeholder="Confirm Password"
                                    className='form-control mb-3'
                                />
                            </>
                        )}
                        <div className="row">
                            <div className="col">
                                <button className="btn btn-secondary btn-sm w-100 m-1" onClick={prevStep}>Back</button>
                            </div>
                            <div className="col">
                                <button className="btn btn-primary btn-sm w-100 m-1" onClick={nextStep}>Next</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {step === 3 && (
                <>
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
                </>
            )}
            
            {step === 4 && (
                <>
                    <div>
                        <input 
                            type="tel" 
                            value={userData.phone} 
                            onChange={handleChange('phone')} 
                            placeholder="Enter Phone Number (XXX) XXX-XXXX"
                            className='form-control'
                            maxLength={14}
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
                </>
            )}
            {step === 5 && (
                <>
                    <div>
                        <p>Username: {userData.username}</p>
                        <p>Email: {userData.email}</p>
                        <p>First Name: {userData.firstName}</p>
                        <p>Last Name: {userData.lastName}</p>
                        <p>Phone: {userData.phone}</p>
                        <div className="row">
                            <div className="col">
                                <button 
                                    className="btn btn-primary btn-block m-1" 
                                    onClick={handleSubmit}
                                    disabled={isNextButtonDisabled()} // Disable based on condition
                                >
                                    Sign up
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );

};

export default SignUpWizard;
