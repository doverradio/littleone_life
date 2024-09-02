// shop/pages/seo/keywords.js
import React from 'react';
import Layout from '../layout'; // Import the layout component

const SEOKeywords = () => {
    return (
        <Layout>
            <div className="container mt-5">
                <h1>Manage Keywords</h1>
                <p>Add, edit, and track keywords for your listings.</p>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Keywords Management</h5>
                        <p className="card-text">Here you can manage the keywords associated with your listings.</p>
                        {/* Add forms or lists to manage keywords */}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SEOKeywords;
