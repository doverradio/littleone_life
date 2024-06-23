import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Step1Username from "./wizard/Step1Username";
import Step2EmailPassword from "./wizard/Step2EmailPassword";
import Step3Names from "./wizard/Step3Names";
import Step4Phone from "./wizard/Step4Phone";
import Step5Summary from "./wizard/Step5Summary";
import { checkUsernameAvailability, signup, googleSignup } from '../api/auth';

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
        confirmPassword: '',
        usernameAvailable: null,
        canProceed: false
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

    return (
        <div>
            <ToastContainer />
            <div className="progress mb-3">
                <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{ width: `${(step - 1) * (100 / 4)}%` }} 
                    aria-valuenow={(step - 1) * (100 / 4)} 
                    aria-valuemin="0" 
                    aria-valuemax="100">
                    Step {step} of 5
                </div>
            </div>
            {step === 1 && (
                <Step1Username 
                    userData={userData} 
                    setUserData={setUserData} 
                    nextStep0={nextStep0} 
                    usernameEmpty={usernameEmpty} 
                    setUsernameEmpty={setUsernameEmpty} 
                    handleKeyPress={handleKeyPress} 
                    checkUsername={checkUsername}
                />
            )}
            {step === 2 && (
                <Step2EmailPassword 
                    userData={userData} 
                    setUserData={setUserData} 
                    nextStep={nextStep} 
                    prevStep={prevStep} 
                    handleKeyPress={handleKeyPress} 
                    googleProfile={googleProfile}
                />
            )}
            {step === 3 && (
                <Step3Names 
                    userData={userData} 
                    setUserData={setUserData} 
                    nextStep={nextStep} 
                    prevStep={prevStep} 
                    handleKeyPress={handleKeyPress} 
                />
            )}
            {step === 4 && (
                <Step4Phone 
                    userData={userData} 
                    setUserData={setUserData} 
                    nextStep={nextStep} 
                    prevStep={prevStep} 
                    handleKeyPress={handleKeyPress} 
                />
            )}
            {step === 5 && (
                <Step5Summary 
                    userData={userData} 
                    handleSubmit={handleSubmit} 
                />
            )}
        </div>
    );
};

export default SignUpWizard;
