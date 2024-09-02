// shop/pages/reports/sales.js
import React from 'react';
import Layout from '../layout'; // Import the layout component

const SalesReports = () => {
    return (
        <Layout>
            <div className="container mt-5">
                <h1>Sales Reports</h1>
                <p>View detailed reports on your sales performance over time.</p>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Sales Overview</h5>
                        <p className="card-text">Here you can view and analyze your sales data.</p>
                        {/* Add charts, graphs, or tables to display sales data */}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SalesReports;
