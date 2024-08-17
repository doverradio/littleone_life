// src/components/session/SessionManager.js

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  clearTimers,
  logoutUser,
  refreshTokenHandler,
  scheduleTimers,
  updateActivity,
} from './sessionHelpers';
import { isTokenExpired, signout } from '../../api/auth'; // Import the signout function
import { useAuth } from '../../api/authHook';
import { useToken } from '../../context/TokenContext';
import SessionExpiryModal from './SessionExpiryModal';
import Modal from 'react-modal';

// Set the app element for accessibility
Modal.setAppElement('#root');

const SessionManager = ({ children }) => {
  
  const { token } = useAuth();
  const { setToken } = useToken(); // Get setToken here

  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [warningShown, setWarningShown] = useState(false);
  const navigate = useNavigate();
  
  const warningTimeoutRef = useRef(null);
  const logoutTimeoutRef = useRef(null);

  const handleLogoutUser = useCallback(() => {
    // Signout the user and navigate to /signin
    logoutUser(navigate, clearTimers, warningTimeoutRef, logoutTimeoutRef, setToken);
  }, [navigate, setToken]);

  const handleRefreshToken = useCallback(() => refreshTokenHandler(handleLogoutUser, clearTimers, () => handleScheduleTimers(), setWarningShown), [handleLogoutUser]);

  const handleShowLogoutWarning = useCallback(() => {
    if (window.location.pathname !== '/signin') {
      console.log("Showing logout warning...");
      setWarningShown(true);
    }
  }, []);

  const handleScheduleTimers = useCallback(() => scheduleTimers(warningTimeoutRef, logoutTimeoutRef, handleShowLogoutWarning, handleLogoutUser), [handleShowLogoutWarning, handleLogoutUser]);

  const handleUpdateActivity = useCallback(() => updateActivity(setLastActivityTime, handleScheduleTimers, warningShown), [handleScheduleTimers, warningShown]);

  useEffect(() => {
    

    if (isTokenExpired(token)) {
      handleLogoutUser();  // Sign out the user if token is expired
      return; // Exit early since we don't want to schedule timers or set up activity tracking
    }

    if (window.location.pathname !== '/signin') {
      handleScheduleTimers(); // Schedule the initial timers

      ['click', 'keypress', 'mousemove'].forEach(event => {
        window.addEventListener(event, handleUpdateActivity);
      });

      return () => {
        ['click', 'keypress', 'mousemove'].forEach(event => {
          window.removeEventListener(event, handleUpdateActivity);
        });
        clearTimers(warningTimeoutRef, logoutTimeoutRef); // Clear timers on unmount
      };
    } else {
      clearTimers(warningTimeoutRef, logoutTimeoutRef); // Ensure timers are cleared on the signin page
      setWarningShown(false);  // Ensure the modal is hidden
    }
  }, [handleUpdateActivity, handleScheduleTimers, handleLogoutUser]);

  return (
    <>
      {children}
      <SessionExpiryModal
        isOpen={warningShown}
        onRefresh={handleRefreshToken}
        onLogout={handleLogoutUser}
      />
    </>
  );
};

export default SessionManager;
