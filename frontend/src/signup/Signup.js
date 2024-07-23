import React, { useState } from "react";
import NavbarMain from "../NavbarMain";
import Footer from "../Footer";
import SignUpWizard from "./SignUpWizard";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { toast, ToastContainer } from 'react-toastify';
import { useUser } from "../context/UserContext";
import 'react-toastify/dist/ReactToastify.css';
import { googleSignup } from '../api/auth';
import background from '../assets/background.jpg'; // Import the background image
import './Signup.css'; // Ensure this path is correct

const SignUp = () => {
    const { setUser } = useUser();
    const [googleProfile, setGoogleProfile] = useState(null);
    const [googleToken, setGoogleToken] = useState(null);

    const informParent = (response) => {
        try {
            const { token, user } = response;
            setGoogleProfile(user);
            setGoogleToken(token);
            setUser({ ...user, token, role: user.role }); // Set user in context

            toast.success("Google sign-up successful! Please complete the signup process.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error('Invalid token:', error);
            toast.error("Google sign-up failed. Please try again.", {
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

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <NavbarMain />
            <ToastContainer />
            <div 
                className="signup-container"
                style={{ '--background-image': `url(${background})` }}
            >
                <div className="signup-form-wrapper">
                    <h2 className="text-center mb-4">Register Now</h2>
                    <SignUpWizard 
                        googleProfile={googleProfile} 
                        googleToken={googleToken} 
                        informParent={informParent} // Pass informParent as a prop
                    />
                    <div className="social-signup mt-4">
                        <p className="text-center">Register With Social Media</p>
                        <div className="social-icons">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-pinterest"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </GoogleOAuthProvider>
    );
}

export default SignUp;
