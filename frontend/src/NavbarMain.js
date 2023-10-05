import React from "react";
import { NavLink } from 'react-router-dom';

const NavbarMain = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink to="/" className="navbar-brand">
                    <img src="/bigdeal.png" style={{ borderRadius: '50%', width: '90px', height: '90px' }} alt="" />
                </NavLink>
                <div className="collapse navbar-collapse" id="navbar-main">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link" activeClassName="active">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" className="nav-link" activeClassName="active">
                                About Us
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/signup" className="nav-link" activeClassName="active">
                                Sign Up
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/signin" className="nav-link" activeClassName="active">
                                Sign In
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/contact" className="nav-link" activeClassName="active">
                                Contact
                            </NavLink>
                        </li>
                        {/* Rest of your items... */}
                    </ul>
                    {/* Rest of your navbar content... */}
                    <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </>
    )
}

export default NavbarMain