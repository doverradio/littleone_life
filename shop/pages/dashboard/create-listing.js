// shop/pages/dashboard/create-listing.js

import React from 'react';
import Layout from '@/components/Partials/Layout';
import Link from 'next/link';

const CreateListing = () => {
  return (
    <Layout>
      <div className="container mt-5">
        <h1>Create New Listing</h1>
        <p>This is a placeholder page where the form to create a new listing will be implemented.</p>
        <Link href="/dashboard/manage-listings" className="btn btn-secondary mt-3">
          Back to Manage Listings
        </Link>
      </div>
    </Layout>
  );
};

export default CreateListing;
