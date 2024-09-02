import React from 'react';
import Layout from '../layout';
import Link from 'next/link';

const CreateListing = () => {
  return (
    <Layout>
      <div className="container mt-5">
        <h1>Create New Listing</h1>
        <p>This is a placeholder page where the form to create a new listing will be implemented.</p>
        <Link href="/dashboard/manage-listings" legacyBehavior>
          <a className="btn btn-secondary mt-3">Back to Manage Listings</a>
        </Link>
      </div>
    </Layout>
  );
};

export default CreateListing;
