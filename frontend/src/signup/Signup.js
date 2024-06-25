import React, { useState } from "react";
import NavbarMain from "../NavbarMain";
import Footer from "../Footer";
import SignUpWizard from "./SignUpWizard";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { toast, ToastContainer } from 'react-toastify';
import GoogleSignupButton from "./GoogleSignupButton";
import { useUser } from "../context/UserContext";
import 'react-toastify/dist/ReactToastify.css';

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
            <div className="container-fluid" style={{ backgroundColor: "white", color: "black", height: "73vh" }}>
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-md-6 col-lg-4">
                        <h2 className="text-center mb-5 p-1">Signup</h2>
                        <SignUpWizard 
                            googleProfile={googleProfile} 
                            googleToken={googleToken} 
                            informParent={informParent} // Pass informParent as a prop
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </GoogleOAuthProvider>
    );
}

export default SignUp;
