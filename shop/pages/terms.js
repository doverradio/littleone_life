// shop/pages/terms.js
import React from 'react';
import Layout from './layout'; // Import the layout component

const TermsOfService = () => {
    return (
        <Layout>
            <div className="container mt-5">
                <h1>Terms of Service</h1>
                <p>These are the terms and conditions governing your use of our website and services.</p>
                <p>
                    {/* Placeholder content */}
                    By accessing or using our services, you agree to be bound by these terms. Please read them carefully.
                </p>
                {/* Add more detailed terms as necessary */}
            </div>
        </Layout>
    );
};

export default TermsOfService;
