import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticated, signout } from './api/auth';
import ProfileIcon from './components/profile/profileicon/ProfileIcon';
import { MdOutlineDashboard } from "react-icons/md";
import './index.css';

const NavbarMain = ({ userStats, backgroundColor }) => {
  const navigate = useNavigate();

  const handleSignout = () => {
    signout(() => {
      navigate('/');
    });
  };

  return (
    <nav className="navbar navbar-light" style={{ backgroundColor: backgroundColor, color: 'black', transition: 'background-color 4s ease', width: '100%', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', zIndex: 1100, height: '60px' }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <NavLink to="/" className="navbar-brand">
          <img src="/logo.png" alt="logo" className="logo-img" style={{ height: '40px', width: 'auto' }} />
        </NavLink>
        <div className="d-flex align-items-center">
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <>
              <NavLink to="/admin/dashboard" className="nav-link dashboard-link" style={{ color: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
                <MdOutlineDashboard size={24} />
                <sup style={{ color: 'black', fontSize: '12px', marginTop: '14px', marginLeft: '4px' }}>Admin Dashboard</sup>
              </NavLink>
              <ProfileIcon handleSignout={handleSignout} userStats={userStats} />
            </>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 0 &&  (
            <>
              <NavLink to="/user/dashboard" className="dashboard-link" style={{ color: 'black', marginRight: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
                <MdOutlineDashboard size={24} />
                <sup style={{ color: 'black', fontSize: '12px', marginTop: '14px', marginLeft: '4px' }}>Dashboard</sup>
              </NavLink>
              <ProfileIcon handleSignout={handleSignout} userStats={userStats} />
            </>
          )}
          {!isAuthenticated() && (
            <>
              <NavLink to="/signup" className="nav-link" style={{ color: 'black' }}>Sign Up</NavLink>
              <NavLink to="/signin" className="nav-link" style={{ color: 'black' }}>Sign In</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavbarMain;
