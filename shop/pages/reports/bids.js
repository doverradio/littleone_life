// shop/pages/reports/bids.js
import React from 'react';
import Layout from '../layout'; // Import the layout component

const BidReports = () => {
    return (
        <Layout>
            <div className="container mt-5">
                <h1>Bid Reports</h1>
                <p>Analyze the bidding activity on your listings.</p>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Bidding Activity Overview</h5>
                        <p className="card-text">Here you can view reports and statistics on bidding activity.</p>
                        {/* Add charts, graphs, or tables to display bid data */}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default BidReports;
