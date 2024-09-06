// shop/pages/support/help.js
import React from 'react';
import Layout from '../layout0'; // Import the layout component

const HelpCenter = () => {
    return (
        <Layout>
            <div className="container mt-5">
                <h1>Help Center</h1>
                <p>Find answers to your questions and get help with common issues.</p>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Popular Topics</h5>
                        <ul>
                            <li>How to create a listing</li>
                            <li>Managing your orders</li>
                            <li>Payment and billing issues</li>
                            <li>Shipping and delivery information</li>
                        </ul>
                        {/* Add more help topics as needed */}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HelpCenter;
