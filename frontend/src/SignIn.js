import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarMain from "./NavbarMain";
import Footer from "./Footer";
import { signin, authenticate, isAuthenticated, googleLogin } from './api/auth';
import { GoogleLogin } from 'react-google-login'; // Import GoogleLogin
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false,
    });
    
    const { username, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const navigate = useNavigate();

    
    // Google Login Success Handler
    const responseGoogleSuccess = async (response) => {
        console.log("Google sign in success", response);
    
        try {
            const googleToken = response.tokenId; // Get the Google token
    
            // Use the googleLogin function from auth.js
            const result = await googleLogin(googleToken);
    
            if (result.error) {
                setValues({ ...values, error: result.error, loading: false });
            } else {
                // Authenticate the user on client side
                authenticate(result, () => {
                    setValues({ ...values, redirectToReferrer: true });
                });
            }
        } catch (error) {
            console.error('Error processing Google sign in:', error);
            setValues({ ...values, error: 'Google sign in failed', loading: false });
        }
    };

    // Google Login Failure Handler
    const responseGoogleFailure = (response) => {
        console.log("Google sign in failed", response);
        // Display a toast message
        toast.error("Google sign-in failed. Please try again.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000
        });
    };
  
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };
  
    const clickSubmit = async (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        const user = { username, password };
  
        try {
            const response = await signin(user);
            if (response.error) {
                setValues({ ...values, error: response.error, loading: false });
            } else {
                authenticate(response, () => {
                    setValues({ ...values, redirectToReferrer: true });
                });
            }
        } catch (err) {
            console.error('Sign in error:', err);
            setValues({ ...values, error: 'Sign in failed', loading: false });
        }
    };
  
    const signInForm = () => (
        <form>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input onChange={handleChange('username')} type="text" className="form-control" value={username} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary m-1">Submit</button>
            {/* Google Login Button */}
            {/* <GoogleLogin
                clientId={process.env.GOOGLE_CLIENT_ID} // Replace with your Google Client ID
                buttonText="Login with Google"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleFailure}
                cookiePolicy={'single_host_origin'}
            /> */}
        </form>
    );

    const showLoading = () => loading && <div className="alert alert-info"><h2>Loading...</h2></div>;
    const showError = () => <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>{error}</div>;
    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        }
        if (isAuthenticated()) {
            if (user && user.role === 1) {
                navigate('/admin/dashboard');
            } else if (user && user.role === 0) {
                navigate('/user/dashboard');
            } else {
                navigate('/');
            }
        }
    };

    return(
        <>
            <NavbarMain />
            <ToastContainer />
            <div className="container" style={{ height: '73vh' }}>
                <h2 className="mt-5 mb-5">SignIn</h2>
                <div className="col-md-4 offset-md-4">
                    {showLoading()}
                    {showError()}
                    {signInForm()}
                    {redirectUser()}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SignIn;
