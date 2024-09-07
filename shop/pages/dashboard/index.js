// shop/pages/dashboard/index.js
import React from 'react';
import Layout from '@/components/Partials/Layout'; // Import the layout component

const Dashboard = () => {
    return (
        <Layout>
            <div className="container mt-5">
                <h1>Dashboard</h1>
                
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Sales Summary</h5>
                                <p className="card-text">Graph showing sales performance over time.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Active Listings</h5>
                                <p className="card-text">Snapshot of active listings with quick access to edit or view.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Recent Bids</h5>
                                <p className="card-text">List of the most recent bids on your items.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Recent Purchases</h5>
                                <p className="card-text">Overview of the most recent purchases with delivery status.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
