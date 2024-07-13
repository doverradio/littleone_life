import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPray, FaStore, FaUser, FaShoppingCart } from 'react-icons/fa'; // Importing icons

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
            <NavLink to="/shop" activeClassName="active">
                <FaShoppingCart />
                <span>Shop</span>
            </NavLink>
            <NavLink to="/works" activeClassName="active">
                <FaStore />
                <span>Works</span>
            </NavLink>
            <NavLink to="/user/settings" activeClassName="active">
                <FaUser />
                <span>Settings</span>
            </NavLink>
        </div>
    );
};

export default BottomBar;
