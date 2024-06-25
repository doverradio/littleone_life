import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import SignUpOptions from './SignUpOptions';
import CombinedEmailSignUp from './wizard/CombinedEmailSignUp';
import Step1Username from './wizard/Step1Username';
import Step5Summary from './wizard/Step5Summary';
import { checkUsernameAvailability, signup, googleSignup } from '../api/auth';
import ProgressBar from './wizard/ProgressBar';

const SignUpWizard = ({ googleProfile, googleToken, informParent }) => {
    const navigate = useNavigate();
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

    const handleChange = (input) => (e) => {
        let value = e.target.value;
        if (input === 'username' && usernameEmpty) {
            setUsernameEmpty(false);
        }
        setUserData({ ...userData, [input]: value });
    };

    const handleSubmit = async () => {
        try {
            if (googleProfile) {
                const response = await googleSignup({ idToken: googleToken });
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
            } else {
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
                        <Step1Username
                            userData={userData}
                            setUserData={setUserData}
                            nextStep0={nextStep}
                            usernameEmpty={usernameEmpty}
                            setUsernameEmpty={setUsernameEmpty}
                            handleKeyPress={handleKeyPress}
                            checkUsername={checkUsername}
                        />
                    )}
                    {step === 5 && (
                        <Step5Summary
                            userData={userData}
                            handleSubmit={handleSubmit}
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
