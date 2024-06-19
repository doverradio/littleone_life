import React, { useState } from "react";
import NavbarMain from "./NavbarMain";
import Footer from "./Footer";
import SignUpWizard from "./signup/SignUpWizard";
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [googleProfile, setGoogleProfile] = useState(null);

    const responseGoogleSuccess = (response) => {
        console.log("Google sign-in successful", response);
        const decodedProfile = jwtDecode(response.credential);
        setGoogleProfile(decodedProfile);
        toast.success("Google sign-in successful! Please complete the signup process.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const responseGoogleFailure = (response) => {
        console.error("Google sign-in failed", response);
        if (response.error !== "popup_closed_by_user") {
            toast.error("Google sign-in failed. Please try again.", {
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
        <>
            <NavbarMain />
            <ToastContainer />
            <div className="container-fluid" style={{ backgroundColor: "white", color: "black", height: "73vh" }}>
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-md-6 col-lg-4">
                        <h2 className="text-center mb-5 p-1">Signup</h2>
                        <SignUpWizard googleProfile={googleProfile} />
                        <div className="text-center mt-4">
                            <GoogleLogin
                                onSuccess={responseGoogleSuccess}
                                onError={responseGoogleFailure}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SignUp;
