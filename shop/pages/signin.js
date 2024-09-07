import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn as nextAuthSignIn } from 'next-auth/react'; // Import next-auth signIn
import Layout from '@/components/Partials/Layout'; // Import the layout component
import { signin } from './api/auth';

const SignIn = () => {
    const [formData, setFormData] = useState({
        username: '',  // Changed from email to username to match backend logic
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear any previous errors

        try {
            const response = await signin(formData); // Make the sign-in API call
            if (response.error) {
                setError(response.error);
                setLoading(false);
            } else {
                // Redirect to dashboard or admin based on role
                router.push(response.user.role === 1 ? '/admin/dashboard' : '/dashboard');
            }
        } catch (err) {
            setError('Sign-In failed. Please try again.');
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            await nextAuthSignIn('google'); // Trigger Google sign-in through NextAuth
        } catch (error) {
            setError('Google Sign-In failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container mt-5">
                <h1>Sign In</h1>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
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
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <hr />
                <button onClick={handleGoogleSignIn} className="btn btn-danger mt-3" disabled={loading}>
                    {loading ? 'Signing In with Google...' : 'Sign In with Google'}
                </button>
            </div>
        </Layout>
    );
};

export default SignIn;
