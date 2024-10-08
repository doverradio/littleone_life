import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signup } from '../../api/auth';

const Step5Summary = ({ userData, prevStep }) => {
    const navigate = useNavigate();

    // Function to handle the form submission
    const handleSubmit = async () => {
        try {
            // Call the signup API with user data
            const response = await signup(userData);

            if (response.error) {
                toast.error(response.error);
            } else {
                toast.success('Signup successful!');
                // Optionally, navigate to another page (e.g., the login page)
                navigate('/signin');
            }
        } catch (error) {
            toast.error('Signup failed. Please try again.');
            console.error('Signup Error:', error);
        }
    };

    return (
        <div>
            <h4>Summary</h4>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <p>First Name: {userData.firstName}</p>
            <p>Last Name: {userData.lastName}</p>
            <p>Phone: {userData.phone}</p>

            <div className="row">
                <div className="col">
                    <button 
                        className="btn btn-secondary btn-block m-1" 
                        onClick={prevStep}
                    >
                        Back
                    </button>
                </div>
                <div className="col">
                    <button 
                        className="btn btn-primary btn-block m-1" 
                        onClick={handleSubmit}
                        disabled={userData.username.trim() === '' || userData.usernameAvailable === false}
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step5Summary;
