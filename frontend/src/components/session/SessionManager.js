import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import {
  clearTimers,
  scheduleTimers,
  updateActivity,
  logoutUser,
} from './sessionHelpers';
import { checkSession } from '../../api/auth';
import SessionExpiryModal from './SessionExpiryModal';
import Modal from 'react-modal';
const log = console.log;

Modal.setAppElement('#root');

const SessionManager = ({ children }) => {
  const { user, setUser } = useUser(); 
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [warningShown, setWarningShown] = useState(false);
  const navigate = useNavigate();

  const warningTimeoutRef = useRef(null);
  const logoutTimeoutRef = useRef(null);

  const handleShowLogoutWarning = useCallback(() => {
    if (window.location.pathname !== '/signin') {
      console.log("Showing logout warning...");
      setWarningShown(true);
    }
  }, []); // Ensure this function is defined

  const handleLogoutUser = useCallback(() => {
    // console.log("Logging out user and clearing session...");
    logoutUser(navigate, clearTimers, warningTimeoutRef, logoutTimeoutRef);
    setUser(null); 
    setIsAuthenticated(false);
  }, [navigate, setUser]);

  const handleScheduleTimers = useCallback(() => {
    scheduleTimers(warningTimeoutRef, logoutTimeoutRef, handleShowLogoutWarning, handleLogoutUser);
  }, [handleShowLogoutWarning, handleLogoutUser]);

  const handleRefreshSession = useCallback(() => {
    checkSession().then(response => {
      // log(`checkSession response: `, response)
      if (response.isAuthenticated) {
        setIsAuthenticated(true);
        setUser(response.user); 
        handleScheduleTimers();
      } else {
        handleLogoutUser();
      }
    }).catch(error => {
      handleLogoutUser();
    });
  }, [handleLogoutUser, handleScheduleTimers, setUser]);

  useEffect(() => {
    // log(`SessionManager useEffect`)
    if (user) { 
      // log(`SessionManager useEffect - got user: `, user)
      setIsAuthenticated(true);
      handleScheduleTimers();
    } else {
      checkSession().then(response => {
        // log(`checkSession response (in SessionManager useEffect): `, response)

        if (response.isAuthenticated) {
          setUser(response.user); 
          setIsAuthenticated(true);
        } else {
          navigate('/signin');
        }
      });
    }
  }, [navigate, handleScheduleTimers, user]);

  return (
    <>
      {children}
      {isAuthenticated && (
        <SessionExpiryModal
          isOpen={warningShown}
          onRefresh={handleRefreshSession}
          onLogout={handleLogoutUser}
        />
      )}
    </>
  );
};

export default SessionManager;
