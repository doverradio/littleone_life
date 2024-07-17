import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarMain from "../NavbarMain";
import Footer from "../Footer";
import { isAuthenticated, googleSignIn, authenticate } from '../api/auth';
import { toast, ToastContainer } from 'react-toastify';
import SignInOptions from './SignInOptions';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
    const [signInMethod, setSignInMethod] = useState(null);
    const navigate = useNavigate();
    const { user } = isAuthenticated();

    const handleGoogleSignin = async (response) => {
        const googleToken = response.credential;
        const result = await googleSignIn(googleToken);
        if (result.error) {
            toast.error(result.error);
        } else {
            authenticate(result, () => {
                navigate(result.user.role === 1 ? '/admin/dashboard' : '/user/dashboard');
            });
        }
    };

    const responseGoogleSuccess = async (response) => {
        try {
            await handleGoogleSignin(response);
        } catch (error) {
            console.error('Error processing Google sign in:', error);
            toast.error('Google sign in failed');
        }
    };

    const responseGoogleFailure = (response) => {
        console.log("Google sign in failed", response);
        toast.error('Google sign-in failed. Please try again.');
    };

    return (
        <>
            <NavbarMain />
            <ToastContainer />
            <div className="container-fluid" style={{ padding: '0' }}>
                <SignInOptions 
                    signInMethod={signInMethod}
                    setSignInMethod={setSignInMethod}
                    responseGoogleSuccess={responseGoogleSuccess}
                    responseGoogleFailure={responseGoogleFailure}
                    navigate={navigate} // Pass navigate function as prop
                />
            </div>
            <Footer />
        </>
    );
};

export default SignIn;
