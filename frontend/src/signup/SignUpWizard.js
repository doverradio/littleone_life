import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import SignUpOptions from './SignUpOptions';
import CombinedEmailSignUp from './wizard/CombinedEmailSignUp';
import Step1Username from './wizard/Step1Username';  // For Google signup after getting username
import Step5Summary from './wizard/Step5Summary';
import { checkUsernameAvailability, signup, googleSignup } from '../api/auth';
import ProgressBar from './wizard/ProgressBar';
import GoogleSignupButton from './GoogleSignupButton';

const SignUpWizard = ({ googleProfile, googleToken, informParent }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [signUpMethod, setSignUpMethod] = useState(null);
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

    const checkUsername = async (value) => {
        if (value && value.length > 0) {
            try {
                const result = await checkUsernameAvailability(value);
                setUserData(prevData => ({ 
                    ...prevData, 
                    username: value,
                    usernameAvailable: result.isAvailable,
                    canProceed: result.isAvailable
                }));
            } catch (error) {
                console.error('Error checking username:', error);
                setUserData(prevData => ({ ...prevData, canProceed: false }));
            }
        } else {
            setUserData(prevData => ({ ...prevData, usernameAvailable: null, canProceed: false }));
        }
    };

    const nextStep = () => {
        if (userData.canProceed || step === 1) { // Allow initial step to proceed
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleChange = input => e => {
        let value = e.target.value;
        if (input === 'username') {
            checkUsername(value); // Check username availability when user types
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

    return (
        <div>
            <ToastContainer />
            {step > 1 && <ProgressBar step={step} totalSteps={3} />} {/* Conditionally render ProgressBar */}
            {signUpMethod ? (
                <>
                    {step === 1 && signUpMethod === 'email' && (
                        <CombinedEmailSignUp
                            userData={userData}
                            setUserData={setUserData}
                            nextStep={nextStep}
                            prevStep={prevStep}
                            handleKeyPress={() => {}}
                            checkUsername={checkUsername}
                        />
                    )}
                    {step === 1 && signUpMethod === 'google-signup' && (
                        <div className="google-signup-form">
                            <GoogleSignupButton informParent={informParent} />
                        </div>
                    )}
                    {step === 2 && signUpMethod === 'google-signup' && (
                        <Step1Username 
                            userData={userData} 
                            setUserData={setUserData} 
                            nextStep={nextStep} 
                            prevStep={prevStep}
                            handleKeyPress={() => {}} 
                            checkUsername={checkUsername}
                        />
                    )}
                    {step === 3 && (
                        <Step5Summary 
                            userData={userData} 
                            handleSubmit={handleSubmit} 
                        />
                    )}
                </>
            ) : (
                <SignUpOptions setSignUpMethod={setSignUpMethod} informParent={informParent} setStep={setStep} step={step} />
            )}
        </div>
    );
};

export default SignUpWizard;
