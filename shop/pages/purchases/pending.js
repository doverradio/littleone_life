// shop/pages/purchases/pending.js
import React from 'react';
import Layout from '../layout'; // Import the layout component

const PendingPurchases = () => {
    return (
        <Layout>
            <div className="container mt-5">
                <h1>Pending Purchases</h1>
                <p>View your purchases that are still pending and awaiting delivery.</p>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Purchase Date</th>
                            <th>Status</th>
                            <th>Estimated Delivery</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Example Item 1</td>
                            <td>2024-08-10</td>
                            <td>Processing</td>
                            <td>2024-08-15</td>
                        </tr>
                        <tr>
                            <td>Example Item 2</td>
                            <td>2024-08-08</td>
                            <td>Shipped</td>
                            <td>2024-08-13</td>
                        </tr>
                        {/* Add more pending purchases entries as needed */}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default PendingPurchases;
