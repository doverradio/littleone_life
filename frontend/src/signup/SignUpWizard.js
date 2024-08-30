import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import SignUpOptions from './SignUpOptions';
import CombinedEmailSignUp from './wizard/CombinedEmailSignUp';
import Step1Username from './wizard/Step1Username';
import Step4Phone from './wizard/Step4Phone';
import Step5Summary from './wizard/Step5Summary';
import Step3Names from './wizard/Step3Names';
import { checkUsernameAvailability, signup, googleSignup } from '../api/auth'; // Removed authenticate
import ProgressBar from './wizard/ProgressBar';
import GoogleSignupButton from './GoogleSignupButton';
import { useToken } from '../context/TokenContext';

const SignUpWizard = ({ googleProfile, googleToken, informParent }) => {
    const navigate = useNavigate();
    const { setToken } = useToken(); 
    const [step, setStep] = useState(1);
    const [signUpMethod, setSignUpMethod] = useState(null);
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
        confirmPassword: '',
        usernameAvailable: null,
        canProceed: false,
        preferredLoginType: ''
    });

    const [usernameEmpty, setUsernameEmpty] = useState(false);

    useEffect(() => {
        if (googleProfile) {
            setUserData(prevData => ({
                ...prevData,
                username: googleProfile.given_name,
                email: googleProfile.email,
                firstName: googleProfile.given_name,
                lastName: googleProfile.family_name,
                preferredLoginType: 'google-account'
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

    const handleSubmit = async () => {
        try {
            const response = await signup(userData);
            if (response.error) {
                toast.error(response.error);
            } else {
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
            }
        } catch (error) {
            console.error('Error signing up user:', error);
            toast.error("Signup failed. Please try again.");
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

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (step === 1 && userData.username.trim() === '') {
                setUsernameEmpty(true);
            } else {
                nextStep();
            }
        }
    };

    const handleGoogleSignup = async (response) => {
        const googleToken = response.credential;
        try {
            const result = await googleSignup(googleToken);
            if (result.error) {
                toast.error(result.error);
            } else {
                setToken(result.token); // Store the token in the context
                setUserData({
                    ...userData,
                    username: result.user.username,
                    email: result.user.email,
                    firstName: result.user.firstName,
                    lastName: result.user.lastName,
                    preferredLoginType: 'google-account',
                });
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Google Signup Error:', error);
            toast.error('Google sign-up failed. Please try again.');
        }
    };

    return (
        <div>
            <ToastContainer />
            {step > 1 && <ProgressBar step={step} />}
            {signUpMethod ? (
                <>
                    {signUpMethod === 'email' && step === 1 && (
                        <CombinedEmailSignUp
                            userData={userData}
                            setUserData={setUserData}
                            nextStep={nextStep}
                            prevStep={prevStep}
                            checkUsername={checkUsername}
                            handleKeyPress={handleKeyPress}
                            setUsernameEmpty={setUsernameEmpty}
                            usernameEmpty={usernameEmpty}
                        />
                    )}
                    {signUpMethod === 'google-signup' && step === 1 && (
                        <GoogleSignupButton
                            informParent={(data) => {
                                setUserData({
                                    ...userData,
                                    username: data.user.username,
                                    email: data.user.email,
                                    firstName: data.user.firstName,
                                    lastName: data.user.lastName,
                                    preferredLoginType: 'google-account',
                                });
                                setStep(2);
                            }}
                        />
                    )}
                    {signUpMethod === 'google-signup' && step === 2 && (
                        <Step1Username
                            userData={userData}
                            setUserData={setUserData}
                            nextStep={nextStep}
                            usernameEmpty={usernameEmpty}
                            setUsernameEmpty={setUsernameEmpty}
                            handleKeyPress={handleKeyPress}
                            checkUsername={checkUsername}
                        />
                    )}
                    {signUpMethod === 'email' && step === 2 && (
                        <Step3Names
                            userData={userData}
                            setUserData={setUserData}
                            nextStep={nextStep}
                            usernameEmpty={usernameEmpty}
                            setUsernameEmpty={setUsernameEmpty}
                            handleKeyPress={handleKeyPress}
                            checkUsername={checkUsername}
                        />
                    )}
                    {signUpMethod === 'email' && step === 3 && (
                        <Step4Phone
                            userData={userData}
                            setUserData={setUserData}
                            nextStep={nextStep}
                            usernameEmpty={usernameEmpty}
                            setUsernameEmpty={setUsernameEmpty}
                            handleKeyPress={handleKeyPress}
                            checkUsername={checkUsername}
                        />
                    )}
                    {signUpMethod === 'email' && step === 4 && (
                        <Step5Summary
                            userData={userData}
                            handleSubmit={handleSubmit}
                            prevStep={prevStep} // Add prevStep here
                        />
                    )}
                </>
            ) : (
                <SignUpOptions setSignUpMethod={setSignUpMethod} setStep={setStep} informParent={informParent} />
            )}
        </div>
    );
};

export default SignUpWizard;
