import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarMain from "./NavbarMain";
import Footer from "./Footer";
import { signin, authenticate, isAuthenticated } from './api/auth';

const SignIn = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false,
    });
    
    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();
  
    const handleChange = name => event => {
      setValues({ ...values, error: false, [name]: event.target.value });
  };
  
  const clickSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    const user = { email, password };
  
    try {
        const response = await signin(user);
        if (response.error) {
            setValues({ ...values, error: response.error, loading: false });
        } else {
            authenticate(response, () => {
                if (response.user.role === 1) {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/user/dashboard');
                }
            });
        }
    } catch (err) {
        console.log(err);
        setValues({ ...values, error: 'Sign in failed', loading: false });
    }
  };
  

  const signInForm = () => (
    <form>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
        </div>
        <button onClick={clickSubmit} className="btn btn-primary m-1">Submit</button>
    </form>
  );
  
  

    const navigate = useNavigate();

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        }
        if (isAuthenticated()) {
            navigate('/');
        }
    };

    const showLoading = () =>
    loading && <div className="alert alert-info"><h2>Loading...</h2></div>;


    const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
        {error}
    </div>
    );

    return(
        <>
            <NavbarMain />            
            <div className="container" style={{ height: '73vh' }}>
                <h2 className="mt-5 mb-5">SignIn</h2>
                <div className="row">
                
                <div className="col-md-4 offset-md-4">
                    {showLoading()}
                    {showError()}
                    {signInForm()}
                    {redirectUser()}
                </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SignIn;
