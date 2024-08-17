import React, { useState } from "react";
import { signin, authenticate } from '../api/auth';
import { useAuth } from '../api/authHook';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useToken } from '../context/TokenContext';  // Import useToken

const UsernamePasswordSignInForm = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false,
    });
    const { username, password, loading, error, redirectToReferrer } = values;
    const { user } = useAuth();
    const { setToken } = useToken();  // Get the setToken function from context
    const navigate = useNavigate();

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
                authenticate(response, setToken, () => {  // Pass setToken to authenticate
                    setValues({ ...values, redirectToReferrer: true });
                });
            }
        } catch (err) {
            console.error('Sign in error:', err);
            setValues({ ...values, error: 'Sign in failed', loading: false });
        }
    };

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
        if (user) {
            if (user && user.role === 1) {
                navigate('/admin/dashboard');
            } else if (user && user.role === 0) {
                navigate('/user/dashboard');
            } else {
                navigate('/');
            }
        }
    };

    return (
        <>
            {showLoading()}
            {showError()}
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
            </form>
            {redirectUser()}
        </>
    );
};

export default UsernamePasswordSignInForm;
