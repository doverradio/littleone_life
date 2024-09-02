// shop/pages/bids/history.js
import React from 'react';
import Layout from '../layout'; // Import the layout component

const BidHistory = () => {
    return (
        <Layout>
            <div className="container mt-5">
                <h1>Bid History</h1>
                <p>View the history of all your past bids.</p>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Bid Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Example Item 1</td>
                            <td>$150</td>
                            <td>2024-08-01</td>
                            <td>Won</td>
                        </tr>
                        <tr>
                            <td>Example Item 2</td>
                            <td>$200</td>
                            <td>2024-07-25</td>
                            <td>Lost</td>
                        </tr>
                        {/* Add more bid history entries as needed */}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default BidHistory;
