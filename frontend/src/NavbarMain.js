import React from "react";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated, signout } from './api/auth'
import { FaCog } from 'react-icons/fa'; // Example using react-icons
import { Link } from 'react-router-dom';

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
            
            <div className="container-fluid"> {/* Use container-fluid for full width */}
                <NavLink to="/" className="navbar-brand">
                    <img src="/logo.png" alt="logo" style={{ borderRadius: '50%', width: '90px', height: '90px' }} />
                </NavLink>

                <div className="d-flex align-items-center"> {/* Flexbox container */}
                    {/* Conditionally render User Dashboard link */}
                    {!isDashboardRoute && isAuthenticated() && (
                        <NavLink 
                            to={`/${isAuthenticated().user.role === 0 ? 'user' : 'admin'}/dashboard`} 
                            className="nav-link" 
                            activeClassName="active" 
                            style={{ color: 'black', fontSize: '' }}
                        >
                            {isAuthenticated().user.role === 0 ? 'User Dashboard' : 'Admin Dashboard'}
                        </NavLink>
                    )}

                    {/* Settings and Sign Out */}
                    {isAuthenticated() && (
                        <>
                            <Link to="/user/settings" className="navbar-icon">
                                <FaCog size={24} />
                            </Link>
                            <button className="btn btn-link nav-link" onClick={handleSignout} style={{ color: '#c0392b' }}>Sign Out</button>
                        </>
                    )}

                    {/* Sign Up and Sign In Links */}
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
