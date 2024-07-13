import React from "react";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated, signout } from './api/auth'
import { FaCog } from 'react-icons/fa'; // Example using react-icons
import { Link } from 'react-router-dom';
import './index.css'

const NavbarMain = ({ backgroundColor }) => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location

    const handleSignout = () => {
        signout(() => {
            // Redirect the user to the homepage after signout
            navigate("/");
        });
    };

    const isDashboardRoute = location.pathname.startsWith('/user/dashboard') || location.pathname.startsWith('/admin/dashboard');

    return (
        <nav className="navbar navbar-light" 
             style={{ backgroundColor: backgroundColor, color: 'black', transition: 'background-color 4s ease' }}>
            
            <div className="container-fluid d-flex justify-content-between align-items-center"> {/* Use Flexbox for alignment */}
                <NavLink to="/" className="navbar-brand">
                    <img src="/logo.png" alt="logo" className="logo-img" />
                </NavLink>

                <div className="d-flex align-items-center"> {/* Flexbox container */}
                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <ul className="navbar-nav"> {/* Use navbar-nav class */}
                            <li className="nav-item">
                                <NavLink to="/user/dashboard" className="nav-link dashboard-link" style={{ color: 'black' }}>Dashboard</NavLink>
                            </li>
                        </ul>
                    )}
                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <ul className="navbar-nav"> {/* Use navbar-nav class */}
                            <li className="nav-item">
                                <NavLink to="/admin/dashboard" className="nav-link dashboard-link" style={{ color: 'black' }}>Dashboard</NavLink>
                            </li>
                        </ul>
                    )}

                    {isAuthenticated() && (
                        <>
                            <Link to="/user/settings" className="navbar-icon">
                                <FaCog size={24} />
                            </Link>
                            <button className="btn btn-link nav-link" onClick={handleSignout} style={{ color: '#c0392b' }}>Sign Out</button>
                        </>
                    )}

                    {!isAuthenticated() && (
                        <>
                            <NavLink to="/signup" className="nav-link" activeClassName="active" style={{ color: 'black' }}>Sign Up</NavLink>
                            <NavLink to="/signin" className="nav-link" activeClassName="active" style={{ color: 'black' }}>Sign In</NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavbarMain;
