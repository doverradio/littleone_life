// shop/pages/orders/pending.js
import React from 'react';
import Layout from '@/components/Partials/Layout'; // Import the layout component

const PendingOrders = () => {
    return (
        <Layout>
            <div className="container mt-5">
                <h1>Pending Orders</h1>
                <p>View and manage orders that are still pending and have not yet been shipped.</p>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Item</th>
                            <th>Order Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#ORD12345</td>
                            <td>Example Item 1</td>
                            <td>2024-08-10</td>
                            <td>Processing</td>
                            <td>
                                <button className="btn btn-primary btn-sm">View</button>
                            </td>
                        </tr>
                        <tr>
                            <td>#ORD67890</td>
                            <td>Example Item 2</td>
                            <td>2024-08-08</td>
                            <td>Pending</td>
                            <td>
                                <button className="btn btn-primary btn-sm">View</button>
                            </td>
                        </tr>
                        {/* Add more pending orders entries as needed */}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default PendingOrders;
