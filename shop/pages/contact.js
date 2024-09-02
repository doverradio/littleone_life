// shop/pages/contact.js
import React from 'react';
import Layout from './layout'; // Import the layout component

const Contact = () => {
    return (
        <Layout>
            <div className="container mt-5">
                <h1>Contact Us</h1>
                <p>If you have any questions or concerns, please feel free to reach out to us.</p>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea className="form-control" id="message" rows="5" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </Layout>
    );
};

export default Contact;
