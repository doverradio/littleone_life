import React from 'react';
import { Link } from 'react-router-dom';
import './BottomNav.css'; // Add appropriate styles

const BottomNav = () => {
    return (
        <div className="bottom-nav">
            <Link to="/user/settings" className="nav-item">
                <i className="fas fa-user"></i> My
            </Link>
            <Link to="/shop" className="nav-item">
                <i className="fas fa-store"></i> Shop
            </Link>
            <Link to="/works" className="nav-item">
                <i className="fas fa-briefcase"></i> Works
            </Link>
            <Link to="/prayers" className="nav-item">
                <i className="fas fa-pray"></i> Prayer
            </Link>
            <Link to="/social" className="nav-item">
                <i className="fas fa-users"></i> Social
            </Link>
        </div>
    );
};

export default BottomNav;
