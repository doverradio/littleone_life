import React, { useState } from "react";
import NavbarMain from "./NavbarMain";
import Footer from "./Footer";
import SignUpWizard from "./signup/SignUpWizard";
import { GoogleLogin } from 'react-google-login';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [googleProfile, setGoogleProfile] = useState(null);
    const navigate = useNavigate();

    const responseGoogleSuccess = (response) => {
        if (response.profileObj) {
            setGoogleProfile(response.profileObj);
            toast.success("Google sign-in successful! Please complete the signup process.", {
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

    const responseGoogleFailure = (response) => {
        toast.error("Google sign-in failed. Please try again.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <>
            <NavbarMain />
            <div className="container-fluid" style={{ backgroundColor: "white", color: "black", height: "73vh" }}>
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-md-6 col-lg-4">
                        <h2 className="text-center mb-5 p-1">Signup</h2>
                        <SignUpWizard googleProfile={googleProfile} />
                        <div className="text-center mt-4">
                            <GoogleLogin
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                buttonText="Sign up with Google"
                                onSuccess={responseGoogleSuccess}
                                onFailure={responseGoogleFailure}
                                cookiePolicy={'single_host_origin'}
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
