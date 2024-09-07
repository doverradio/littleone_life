// shop/pages/privacy.js
import React from 'react';
import Layout from '@/components/Partials/Layout'; // Import the layout component

const PrivacyPolicy = () => {
    return (
        <Layout>
            <div className="container mt-5">
                <h1>Privacy Policy</h1>
                <p>Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.</p>
                <p>
                    {/* Placeholder content */}
                    We collect information to provide better services to all our users. The types of information we collect and how we use it are detailed in this policy.
                </p>
                {/* Add more detailed privacy policy as necessary */}
            </div>
        </Layout>
    );
};

export default PrivacyPolicy;
