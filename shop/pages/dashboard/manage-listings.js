import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import Link from 'next/link';

const ManageListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Fetch the listings data from the API
    async function fetchListings() {
      // Replace with your actual API call
      const response = await fetch('/api/listings');
      const data = await response.json();
      setListings(data);
    }

    fetchListings();
  }, []);

  const handleDelete = async (listingId) => {
    // Delete the listing via API
    await fetch(`/api/listings/${listingId}`, { method: 'DELETE' });
    // Update the listings state
    setListings(listings.filter(listing => listing.id !== listingId));
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h1>Manage Listings</h1>
        <div className="mb-3">
          <Link href="/dashboard/create-listing" className="btn btn-primary">
            Create New Listing
          </Link>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Views</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map(listing => (
              <tr key={listing.id}>
                <td>{listing.name}</td>
                <td>{listing.price}</td>
                <td>{listing.status}</td>
                <td>{listing.views}</td>
                <td>
                  <Link href={`/dashboard/edit-listing/${listing.id}`} className="btn btn-warning btn-sm">
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleDelete(listing.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ManageListings;
