// shop/pages/dashboard/drafts.js
import React from 'react';
import Layout from '../layout0'; // Import the layout component

const Drafts = () => {
    return (
        <Layout>
            <div className="container mt-5">
                <h1>Draft Listings</h1>
                <p>Here you can view and manage your draft listings.</p>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Example Draft 1</td>
                            <td>$100</td>
                            <td>Draft</td>
                            <td>
                                <button className="btn btn-primary btn-sm">Edit</button>
                                <button className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Example Draft 2</td>
                            <td>$200</td>
                            <td>Draft</td>
                            <td>
                                <button className="btn btn-primary btn-sm">Edit</button>
                                <button className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                        {/* Add more draft items as needed */}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Drafts;
