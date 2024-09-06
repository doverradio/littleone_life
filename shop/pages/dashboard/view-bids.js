// shop/pages/dashboard/view-bids.js
import React from 'react';
import Layout from '../layout0'; // Import the layout component

const ViewBids = () => {
    return (
        <Layout>
            <div className="container mt-5">
                <h1>View Bids</h1>
                <p>Here you can see all the bids placed on your listings.</p>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Bidder</th>
                            <th>Bid Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Example Item 1</td>
                            <td>John Doe</td>
                            <td>$150</td>
                            <td>Active</td>
                            <td>
                                <button className="btn btn-primary btn-sm">View</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Example Item 2</td>
                            <td>Jane Smith</td>
                            <td>$250</td>
                            <td>Won</td>
                            <td>
                                <button className="btn btn-primary btn-sm">View</button>
                            </td>
                        </tr>
                        {/* Add more bids as needed */}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default ViewBids;
