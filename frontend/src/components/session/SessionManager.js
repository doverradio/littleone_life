import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation to get current path
import { useUser } from '../../context/UserContext';
import {
  clearTimers,
  scheduleTimers,
  logoutUser,
} from './sessionHelpers';
import { checkSession } from '../../api/auth';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const SessionManager = ({ children }) => {
  const { user, setUser } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [warningShown, setWarningShown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Use location hook to get current pathname

  const warningTimeoutRef = useRef(null);
  const logoutTimeoutRef = useRef(null);

  const handleShowLogoutWarning = useCallback(() => {
    if (window.location.pathname !== '/signin') {
      console.log("Showing logout warning...");
      setWarningShown(true);
    }
  }, []);

  const handleLogoutUser = useCallback(() => {
    logoutUser(navigate, clearTimers, warningTimeoutRef, logoutTimeoutRef);
    setUser(null);
    setIsAuthenticated(false);
  }, [navigate, setUser]);

  const handleScheduleTimers = useCallback(() => {
    scheduleTimers(warningTimeoutRef, logoutTimeoutRef, handleShowLogoutWarning, handleLogoutUser);
  }, [handleShowLogoutWarning, handleLogoutUser]);

  useEffect(() => {
    // If the user is on '/signin' or '/signup', skip session checking
    if (location.pathname === '/signin' || location.pathname === '/signup') {
      return;
    }

    if (user) {
      setIsAuthenticated(true);
      handleScheduleTimers();
    } else {
      checkSession().then(response => {
        if (response.isAuthenticated) {
          setUser(response.user);
          setIsAuthenticated(true);
        } else {
          navigate('/signin');
        }
      });
    }
  }, [navigate, handleScheduleTimers, user, location.pathname]); // Add location.pathname to dependencies

  return (
    <>
      {children}
    </>
  );
};

export default SessionManager;
