import React, { useState } from 'react';
import Layout from './layout0'; // Import the layout component
import { signIn } from 'next-auth/react'; // Import the NextAuth signIn function

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            console.log('Passwords do not match');
            return;
        }

        // Custom sign-up logic can be added here

        // After sign-up, you might want to log the user in
        const result = await signIn('credentials', {
            redirect: false,
            username: formData.username,
            email: formData.email,
            password: formData.password,
        });

        if (result.error) {
            console.log(result.error);
        } else {
            // Redirect or show success message
        }
    };

    const handleGoogleSignUp = () => {
        signIn('google');
    };

    return (
        <Layout>
            <div className="container mt-5">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
                <hr />
                <button onClick={handleGoogleSignUp} className="btn btn-danger">
                    Sign up with Google
                </button>
            </div>
        </Layout>
    );
};

export default SignUp;
