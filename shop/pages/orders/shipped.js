// shop/pages/orders/shipped.js
import React from 'react';
import Layout from '../layout0'; // Import the layout component

const ShippedOrders = () => {
    return (
        <Layout>
            <div className="container mt-5">
                <h1>Shipped Orders</h1>
                <p>View and manage orders that have been shipped but not yet delivered.</p>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Item</th>
                            <th>Ship Date</th>
                            <th>Status</th>
                            <th>Tracking Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#ORD54321</td>
                            <td>Example Item 3</td>
                            <td>2024-08-09</td>
                            <td>Shipped</td>
                            <td>TRACK12345</td>
                        </tr>
                        <tr>
                            <td>#ORD09876</td>
                            <td>Example Item 4</td>
                            <td>2024-08-07</td>
                            <td>Shipped</td>
                            <td>TRACK67890</td>
                        </tr>
                        {/* Add more shipped orders entries as needed */}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default ShippedOrders;
