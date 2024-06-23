import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavbarMain from "./NavbarMain";
import Footer from "./Footer";
import { signin, authenticate, isAuthenticated, googleSignIn } from './api/auth';
import { GoogleLogin } from '@react-oauth/google';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false,
        googleUser: null,
    });
    
    const { username, password, loading, error, redirectToReferrer, googleUser } = values;
    const { user } = isAuthenticated();
    const navigate = useNavigate();

    // Google Login Success Handler
    const responseGoogleSuccess = async (response) => {
        try {
            const googleToken = response.tokenId;
            const result = await googleSignIn(googleToken);
            if (result.error) {
                setValues({ ...values, error: result.error, loading: false });
            } else if (result.user) {
                // User exists, authenticate and redirect
                authenticate(result, () => {
                    setValues({ ...values, redirectToReferrer: true });
                });
            } else {
                // User does not exist, ask for username
                setValues({ ...values, googleUser: result });
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
        toast.error('Google sign-in failed. Please try again.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
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
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Sign in with Google"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleFailure}
                cookiePolicy={'single_host_origin'}
            /> 
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
                <h2 className="mt-5 mb-5">Sign In</h2>
                <div className="col-md-4 offset-md-4">
                    {showLoading()}
                    {showError()}
                    {signInForm()}
                    {redirectUser()}
                    <p className="mt-3">
                        Don't have an account? <Link to="/signup">Please click here to sign up</Link>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SignIn;
