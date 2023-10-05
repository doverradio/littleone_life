import React, { useState } from 'react';
import NavbarMain from "./NavbarMain";
import Footer from './Footer';

const Contact = () =>
{
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
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

        // Implement your logic for sending or storing the message here
    };

    return(
        <>
            <NavbarMain />
            <div className="main-content" style={{ maxWidth: "600px", margin: "40px auto" }}>
                <h1>Contact Us</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Subject:</label>
                        <input 
                            type="text" 
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="form-control" 
                        />
                    </div>

                    <div className="form-group">
                        <label>Message:</label>
                        <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="form-control"
                            rows="5"
                            required 
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default Contact