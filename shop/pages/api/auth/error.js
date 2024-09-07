// shop/pages/auth/error.js
import React from 'react';
import Layout from '@/components/Partials/Layout';

const AuthErrorPage = () => {
  return (
    <Layout>
      <div className="container mt-5">
        <h1>Authentication Error</h1>
        <p>There was an issue with your authentication. Please try again.</p>
      </div>
    </Layout>
  );
};

export default AuthErrorPage;
