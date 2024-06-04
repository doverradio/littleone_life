import React, { useState } from "react";
import NavbarMain from "./NavbarMain";
import Footer from "./Footer";
import { signup } from './api/auth'; // Adjust the path as necessary
import SignUpWizard from "./signup/SignUpWizard";

const SignUp = () => {
    
    return (
        <>
            <NavbarMain />
            <div className="container-fluid" style={{ backgroundColor: "white", color: "black", height: "73vh" }}>
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-md-6 col-lg-4">
                        <h2 className="text-center mb-5 p-1">Signup</h2>
                        <SignUpWizard />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SignUp;
