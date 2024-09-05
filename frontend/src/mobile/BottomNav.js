import React from 'react';
import { Link } from 'react-router-dom';
import './BottomNav.css'; // Add appropriate styles

const BottomNav = () => {
    return (
        <div className="bottom-nav">
            <Link href="/user/settings" className="nav-item">
                <i className="fas fa-user"></i> My
            </Link>
            <Link href="/shop" className="nav-item">
                <i className="fas fa-store"></i> Shop
            </Link>
            <Link href="/works" className="nav-item">
                <i className="fas fa-briefcase"></i> Works
            </Link>
            <Link href="/prayers" className="nav-item">
                <i className="fas fa-pray"></i> Prayer
            </Link>
            <Link href="/social" className="nav-item">
                <i className="fas fa-users"></i> Social
            </Link>
        </div>
    );
};

export default BottomNav;
