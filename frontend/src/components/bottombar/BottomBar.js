import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPray, FaStore, FaUserFriends, FaShoppingCart } from 'react-icons/fa';
import './BottomBar.css'; // Importing the CSS file

const BottomBar = () => {
    return (
        <div className="bottom-bar">
            <NavLink to="/user/dashboard" activeClassName="active">
                <FaHome />
                <span>Home</span>
            </NavLink>
            <NavLink to="/prayers" activeClassName="active">
                <FaPray />
                <span>Prayers</span>
            </NavLink>
            <NavLink to="/social" activeClassName="active">
                <FaUserFriends />
                <span>Social</span>
            </NavLink>
            <NavLink to="/works" activeClassName="active">
                <FaStore />
                <span>Works</span>
            </NavLink>
            <NavLink to="/shop" activeClassName="active">
                <FaShoppingCart />
                <span>Shop</span>
            </NavLink>
        </div>
    );
};

export default BottomBar;
