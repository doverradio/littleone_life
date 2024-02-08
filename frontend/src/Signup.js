import React, { useState } from "react";
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
        // Handle the form submission here
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
                                    value={formData.email} 
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
                                    value={formData.password} 
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
                                    value={formData.firstName} 
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
                                    value={formData.lastName} 
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
                                    value={formData.cellPhone} 
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
