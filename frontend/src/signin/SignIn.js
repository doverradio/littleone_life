import React, { useState } from "react";
import NavbarMain from "../NavbarMain";
import Footer from "../Footer";
import { ToastContainer } from 'react-toastify';
import SignInOptions from './SignInOptions';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
    const [signInMethod, setSignInMethod] = useState(null);

    return (
        <>
            <NavbarMain />
            <ToastContainer />
            <div className="container-fluid" style={{ padding: '0' }}>
                <SignInOptions 
                    signInMethod={signInMethod}
                    setSignInMethod={setSignInMethod}
                />
            </div>
            <Footer />
        </>
    );
};

export default SignIn;
