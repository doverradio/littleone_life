// shop/pages/seo/dashboard.js
import React from 'react';
import Layout from '../layout0'; // Import the layout component

const SEODashboard = () => {
    return (
        <Layout>
            <div className="container mt-5">
                <h1>SEO Dashboard</h1>
                <p>Monitor and manage the SEO performance of your listings.</p>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">SEO Overview</h5>
                        <p className="card-text">Here you can see a summary of your SEO performance metrics.</p>
                        {/* Add charts, summaries, or metrics as needed */}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SEODashboard;
