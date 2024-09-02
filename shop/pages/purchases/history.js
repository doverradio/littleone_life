// shop/pages/purchases/history.js
import React from 'react';
import Layout from '../layout'; // Import the layout component

const PurchaseHistory = () => {
    return (
        <Layout>
            <div className="container mt-5">
                <h1>Purchase History</h1>
                <p>View the history of your purchases and track the status of your orders.</p>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Purchase Date</th>
                            <th>Status</th>
                            <th>Tracking Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Example Item 1</td>
                            <td>2024-08-01</td>
                            <td>Shipped</td>
                            <td>TRACK12345</td>
                        </tr>
                        <tr>
                            <td>Example Item 2</td>
                            <td>2024-07-25</td>
                            <td>Delivered</td>
                            <td>TRACK67890</td>
                        </tr>
                        {/* Add more purchase history entries as needed */}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default PurchaseHistory;
