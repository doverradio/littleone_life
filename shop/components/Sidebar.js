import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="sidebar bg-light">
      <ul className="list-unstyled">
        <li>
          <Link href="/dashboard">Dashboard Home</Link>
        </li>
        <li>
          <h6>Manage Listings</h6>
          <ul>
            <li><Link href="/listings/active">Active Listings</Link></li>
            <li><Link href="/listings/new">Create New Listing</Link></li>
            <li><Link href="/listings/drafts">Drafts</Link></li>
          </ul>
        </li>
        <li>
          <h6>Bids</h6>
          <ul>
            <li><Link href="/bids/active">Active Bids</Link></li>
            <li><Link href="/bids/my">My Bids</Link></li>
            <li><Link href="/bids/history">Bid History</Link></li>
          </ul>
        </li>
        <li>
          <h6>Purchases</h6>
          <ul>
            <li><Link href="/purchases/pending">Pending Purchases</Link></li>
            <li><Link href="/purchases/history">Purchase History</Link></li>
          </ul>
        </li>
        <li>
          <h6>Orders</h6>
          <ul>
            <li><Link href="/orders/pending">Pending Orders</Link></li>
            <li><Link href="/orders/shipped">Shipped Orders</Link></li>
            <li><Link href="/orders/history">Order History</Link></li>
          </ul>
        </li>
        <li>
          <h6>SEO Management</h6>
          <ul>
            <li><Link href="/seo/dashboard">SEO Dashboard</Link></li>
            <li><Link href="/seo/keywords">Keywords</Link></li>
            <li><Link href="/seo/meta-tags">Meta Tags</Link></li>
          </ul>
        </li>
        <li>
          <h6>Reports</h6>
          <ul>
            <li><Link href="/reports/sales">Sales Reports</Link></li>
            <li><Link href="/reports/bids">Bid Reports</Link></li>
            <li><Link href="/reports/traffic">Traffic Reports</Link></li>
          </ul>
        </li>
        <li>
          <h6>Support</h6>
          <ul>
            <li><Link href="/support/help">Help Center</Link></li>
            <li><Link href="/support/contact">Contact Support</Link></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
