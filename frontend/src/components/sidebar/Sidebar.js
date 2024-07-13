import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/user/dashboard" activeClassName="active">
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/shop" activeClassName="active">
                            <span>Shop</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/works" activeClassName="active">
                            <span>Works</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/prayers" activeClassName="active">
                            <span>Prayers</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/social" activeClassName="active">
                            <span>Social</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/user/settings" activeClassName="active">
                            <span>Settings</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/signout" activeClassName="active">
                            <span>Sign Out</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
