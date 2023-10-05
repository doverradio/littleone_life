import React, { useState, useEffect } from "react";
import NavbarMain from "./NavbarMain";
import Footer from "./Footer";

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        cellPhone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        // You can handle the form submission here, e.g., send the data to the server
    };

    return (
        <>
            <NavbarMain />
            <h2 className="m-1 p-1">Signup</h2>
            <div className="signup-form d-flex justify-content-center main-content">
                <form onSubmit={handleSubmit}>
                    <div className="form-group m-1 p-1">
                        <label>Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group m-1 p-1">
                        <label>Password:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group m-1 p-1">
                        <label>First Name:&nbsp;&nbsp;</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="form-group m-1 p-1">
                        <label>Last Name:&nbsp;&nbsp;</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                    <div className="form-group m-1 p-1">
                        <label>Cell Phone:&nbsp;&nbsp;</label>
                        <input type="tel" name="cellPhone" value={formData.cellPhone} onChange={handleChange} required />
                    </div>
                    <button className="btn btn-primary btn-sm m-1" type="submit">Signup</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default SignUp