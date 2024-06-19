import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { useNavigate } from 'react-router-dom';
import { checkUsernameAvailability, signup, googleSignup } from '../api/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const log = console.log;

const SignUpWizard = ({ googleProfile, googleToken }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({
        username: googleProfile ? googleProfile.given_name : '',
        email: googleProfile ? googleProfile.email : '',
        firstName: googleProfile ? googleProfile.given_name : '',
        lastName: googleProfile ? googleProfile.family_name : '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [usernameEmpty, setUsernameEmpty] = useState(false);

    useEffect(() => {
        if (googleProfile) {
            setUserData(prevData => ({
                ...prevData,
                username: googleProfile.given_name,
                email: googleProfile.email,
                firstName: googleProfile.given_name,
                lastName: googleProfile.family_name
            }));
            setStep(2); // Skip username step if Google Profile is available
        }
    }, [googleProfile]);

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
    
    const debouncedCheckUsername = debounce(checkUsername, 1000);

    useEffect(() => {
        if (userData.username.length > 0) {
            debouncedCheckUsername();
        }
        return () => {
            debouncedCheckUsername.cancel();
        };
    }, [userData.username, debouncedCheckUsername]);

    const renderUsernameAvailabilityMessage = () => {
        if (userData.username.length > 0) {
            if (userData.usernameAvailable === false) {
                return <p style={{ color: 'red' }}>{userData.username} is not available</p>;
            } else if (userData.usernameAvailable === true) {
                return <p style={{ color: 'green' }}>{userData.username} is available</p>;
            }
        }
        return <p style={{ height: '1rem' }}>&nbsp;</p>;
    };

    const formatPhoneNumber = (value) => {
        if (!value) return value;

        const phoneNumber = value.replace(/[^\d]/g, '');

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
            setUsernameEmpty(true);
        }
    };

    const nextStep = () => {
        if (userData.canProceed) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleChange = input => e => {
        let value = e.target.value;
        if (input === 'username' && usernameEmpty) {
            setUsernameEmpty(false);
        }
        if (input === 'phone') {
            value = formatPhoneNumber(value);
        }

        setUserData({ ...userData, [input]: value });
    };

    const handleSubmit = async () => {
        try {
            if (googleProfile) {
                const response = await googleSignup({ ...userData, tokenId: googleToken });
                console.log('Google signup response:', response);
            } else {
                const response = await signup(userData);
                console.log('Normal signup response:', response);
            }
            toast.success("Signup successful! Redirecting to Sign In...", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                navigate('/signin');
            }, 2000);
        } catch (error) {
            console.error('Error signing up user:', error);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (step === 1 && userData.username.trim() === '') {
                setUsernameEmpty(true);
            } else {
                nextStep();
            }
        }
    };

    const isNextButtonDisabled = () => {
        return userData.username.trim() === '' || userData.usernameAvailable === false;
    };

    return (
        <div>
            <ToastContainer />
            <div className="progress mb-3">
                <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{ width: `${(step - 1) * (100 / 4)}%` }} // Ensure progress is defined
                    aria-valuenow={(step - 1) * (100 / 4)} 
                    aria-valuemin="0" 
                    aria-valuemax="100">
                    Step {step} of 5
                </div>
            </div>
            {step === 1 && (
                <>
                    <div className="row">
                        <div className="col-12">
                            {renderUsernameAvailabilityMessage()}
                            {usernameEmpty && <p style={{ color: 'red' }}>Please enter a username to proceed</p>}
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
                                disabled={isNextButtonDisabled()}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </>
            )}
            {step === 2 && (
                <>
                    <div>
                        <input 
                            type="email" 
                            value={userData.email} 
                            onChange={handleChange('email')} 
                            placeholder="Email"
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
                                    className='form-control mb-2 mb-md-0'
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
                        <div className="row mt-3">
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
                                    disabled={isNextButtonDisabled()}
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
