import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticated, signout } from './api/auth';
import ProfileIcon from './components/profile/profileicon/ProfileIcon'; // Update the import path as needed
import { MdOutlineDashboard } from 'react-icons/md'; // Import the new dashboard icon
import './index.css';

const NavbarMain = ({ backgroundColor }) => {
    const navigate = useNavigate();

    const handleSignout = () => {
        signout(() => {
            // Redirect the user to the homepage after signout
            navigate('/');
        });
    };

    return (
        <nav className="navbar navbar-light"
             style={{ backgroundColor: backgroundColor, color: 'black', transition: 'background-color 4s ease' }}>
            
            <div className="container-fluid d-flex justify-content-between align-items-center"> {/* Use Flexbox for alignment */}
                <NavLink to="/" className="navbar-brand">
                    <img src="/logo.png" alt="logo" className="logo-img" />
                </NavLink>

                <div className="d-flex align-items-center"> {/* Flexbox container */}
                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <ul className="navbar-nav"> {/* Use navbar-nav class */}
                            <li className="nav-item" style={{ textAlign: 'center' }}>
                                <NavLink 
                                    to="/admin/dashboard" 
                                    className="nav-link dashboard-link" 
                                    style={{ color: 'black', textDecoration: 'none' }} 
                                    title="Dashboard"
                                >
                                    <MdOutlineDashboard size={24} />
                                    <sup style={{ display: 'block', fontSize: '12px', marginTop: '12px' }}>Dashboard</sup>
                                </NavLink>
                            </li>
                        </ul>
                    )}

                    {isAuthenticated() && (
                        <>
                            <NavLink 
                                to="/user/dashboard" 
                                className="dashboard-link" 
                                style={{ color: 'black', marginRight: '10px', textAlign: 'center', textDecoration: 'none' }} 
                                title="Dashboard"
                            >
                                <MdOutlineDashboard size={24} />
                                <sup style={{ display: 'block', fontSize: '12px', marginTop: '12px' }}>Dashboard</sup>
                            </NavLink>
                            <ProfileIcon handleSignout={handleSignout} /> {/* Pass handleSignout to ProfileIcon */}
                        </>
                    )}

                    {!isAuthenticated() && (
                        <>
                            <NavLink to="/signup" className="nav-link" activeClassName="active" style={{ color: 'black', textDecoration: 'none' }}>Sign Up</NavLink>
                            <NavLink to="/signin" className="nav-link" activeClassName="active" style={{ color: 'black', textDecoration: 'none' }}>Sign In</NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavbarMain;
