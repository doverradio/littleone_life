import React from 'react';
import Layout from '../../layout0';
import { useRouter } from 'next/router';
import Link from 'next/link';

const EditListing = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <div className="container mt-5">
        <h1>Edit Listing</h1>
        <p>Editing listing ID: {id}</p>
        <p>This is a placeholder page where the form to edit an existing listing will be implemented.</p>
        <Link href="/dashboard/manage-listings" className="btn btn-secondary mt-3">
          Back to Manage Listings
        </Link>
      </div>
    </Layout>
  );
};

export default EditListing;
