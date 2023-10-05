import React from "react";
import { NavLink } from 'react-router-dom';
import { PiMagnifyingGlassThin } from "react-icons/pi";
import {IconContext} from "react-icons"

const NavbarMain = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'black'}}>
                
                {/* This is the toggle button for mobile view */}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbar-main" 
                    aria-controls="navbar-main" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" style={{ color: 'white' }}>☰</span>
                </button>

                <NavLink to="/" className="navbar-brand d-none d-lg-block">
                    {/* <img src="/logo.png" style={{ borderRadius: '50%', width: '90px', height: '90px' }} alt="" /> */}
                    <img src="/logo_knight.png" style={{ borderRadius: '50%', width: '90px', height: '90px' }} alt="" />
                    {/* <span style={{ color: "white" }}>littleone.life</span> */}
                </NavLink>
                
                <div className="collapse navbar-collapse" id="navbar-main" style={{ color: 'white' }}>
                    <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink exact to="/" className="nav-link" activeClassName="active"  style={{ color: 'white' }}>
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className="nav-link" activeClassName="active" style={{ color: 'white' }}>
                                    About Us
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/signup" className="nav-link" activeClassName="active" style={{ color: 'white' }}>
                                    Sign Up
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/signin" className="nav-link" activeClassName="active" style={{ color: 'white' }}>
                                    Sign In
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contact" className="nav-link" activeClassName="active" style={{ color: 'white' }}>
                                    Contact
                                </NavLink>
                            </li>
                    </ul>
                </div>
                <form className="form-inline my-2 my-lg-0">
                    <div className="row no-gutters">
                        <div className="col-8 col-md-10">
                            <input className="form-control w-100" type="search" placeholder="Search" aria-label="Search"/>
                        </div>
                        <div className="col-4 col-md-2">
                        <button className="btn btn-outline-success my-2 my-sm-0 w-100" style={{padding: '0.375rem 0.5rem'}} type="submit">
                                                        
                            <IconContext.Provider value={{ style: {fontSize: '20px', color: "white"}}}>
                                <div>
                                    <PiMagnifyingGlassThin />
                                </div>
                            </IconContext.Provider>
                        </button>


                        </div>
                    </div>
                </form>

            </nav>
        </>
    );
}

export default NavbarMain;
