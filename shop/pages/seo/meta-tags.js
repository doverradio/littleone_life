// shop/pages/seo/meta-tags.js
import React from 'react';
import Layout from '@/components/Partials/Layout'; // Import the layout component

const SEOMetaTags = () => {
    return (
        <Layout>
            <div className="container mt-5">
                <h1>Manage Meta Tags</h1>
                <p>Edit meta tags for your product pages to improve SEO.</p>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Meta Tags Management</h5>
                        <p className="card-text">Here you can manage the meta tags for your product listings.</p>
                        {/* Add forms or inputs for meta tag management */}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SEOMetaTags;
