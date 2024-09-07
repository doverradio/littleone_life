// shop/pages/orders/history.js
import React from 'react';
import Layout from '@/components/Partials/Layout'; // Import the layout component

const OrderHistory = () => {
    return (
        <Layout>
            <div className="container mt-5">
                <h1>Order History</h1>
                <p>View the complete history of your orders.</p>
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
                            <td>#ORD54321</td>
                            <td>Example Item 3</td>
                            <td>2024-08-09</td>
                            <td>Delivered</td>
                            <td>
                                <button className="btn btn-primary btn-sm">View</button>
                            </td>
                        </tr>
                        <tr>
                            <td>#ORD67890</td>
                            <td>Example Item 4</td>
                            <td>2024-08-07</td>
                            <td>Returned</td>
                            <td>
                                <button className="btn btn-primary btn-sm">View</button>
                            </td>
                        </tr>
                        {/* Add more order history entries as needed */}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default OrderHistory;
