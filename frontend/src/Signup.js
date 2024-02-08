import React, { useState } from "react";
import NavbarMain from "./NavbarMain";
import Footer from "./Footer";
import { signup } from './api/auth'; // Adjust the path as necessary

const SignUp = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        cellPhone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: name === 'cellPhone' ? formatPhoneNumber(value) : value
        }));
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('User data submitted:', userData);
        
        // Call the signup API function
        try {
            const response = await signup(userData);
            console.log('Signup response:', response);
            // Handle the response, e.g., show a message, redirect, etc.
        } catch (error) {
            console.error('Signup error:', error);
            // Handle the error, e.g., show an error message
        }
    };

    const formatPhoneNumber = (value) => {
        if (!value) return value;
    
        // Remove all non-digits
        const phoneNumber = value.replace(/[^\d]/g, '');
    
        // Check if the input is of correct length
        const phoneNumberLength = phoneNumber.length;
    
        if (phoneNumberLength < 4) return phoneNumber;
    
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
    
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    };
    
    

    return (
        <>
            <NavbarMain />
            <div className="container-fluid" style={{ backgroundColor: "white", color: "black", height: "80vh" }}>
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-md-6 col-lg-4">
                        <h2 className="text-center m-1 p-1">Signup</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group m-1 p-1">
                                <label>Email:</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    className="form-control"
                                    value={userData.email} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="form-group m-1 p-1">
                                <label>Password:</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    className="form-control"
                                    value={userData.password} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="form-group m-1 p-1">
                                <label>First Name:</label>
                                <input 
                                    type="text" 
                                    name="firstName" 
                                    className="form-control"
                                    value={userData.firstName} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="form-group m-1 p-1">
                                <label>Last Name:</label>
                                <input 
                                    type="text" 
                                    name="lastName" 
                                    className="form-control"
                                    value={userData.lastName} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="form-group m-1 p-1">
                                <label>Cell Phone:</label>
                                <input 
                                    type="tel" 
                                    name="cellPhone" 
                                    className="form-control"
                                    value={userData.cellPhone} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <button className="btn btn-secondary btn-sm m-1 w-100" type="submit">Signup</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SignUp;
