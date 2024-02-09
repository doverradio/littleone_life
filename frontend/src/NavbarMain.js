import React from "react";
import { NavLink, useNavigate  } from 'react-router-dom';
import { isAuthenticated, signout } from './api/auth'
import { PiMagnifyingGlassThin } from "react-icons/pi";
import {IconContext} from "react-icons"

const NavbarMain = () => {

    const navigate = useNavigate();

    const handleSignout = () => {
        signout(() => {
            // Redirect the user to the homepage after signout
            navigate("/");
        });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'white', color: 'black'}}>
            {/* Toggle button for mobile view */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-main" aria-controls="navbar-main" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" style={{ color: 'black' }}></span>
            </button>

            <NavLink to="/" className="navbar-brand d-none d-lg-block">
                <img src="/logo.png" style={{ borderRadius: '50%', width: '90px', height: '90px' }} alt="" />
            </NavLink>

            <div className="collapse navbar-collapse" id="navbar-main">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink exact to="/" className="nav-link" activeClassName="active" style={{ color: 'black' }}>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/about" className="nav-link" activeClassName="active" style={{ color: 'black' }}>About Us</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/contact" className="nav-link" activeClassName="active" style={{ color: 'black' }}>Contact</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {isAuthenticated() ? (
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={handleSignout} style={{ color: '#c0392b' }}>Sign Out</button>
                        </li>
                    ) : (
                        <>
                            <li className="nav-item">
                                <NavLink to="/signup" className="nav-link" activeClassName="active" style={{ color: 'black' }}>Sign Up</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/signin" className="nav-link" activeClassName="active" style={{ color: 'black' }}>Sign In</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default NavbarMain;
