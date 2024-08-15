import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../../api/auth';

const SessionManager = ({ children }) => {
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const navigate = useNavigate();

  const logoutUser = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/signin');
  }, [navigate]);

  const refreshTokenHandler = useCallback(async () => {
    if (Date.now() - lastActivityTime < 1.5 * 60 * 60 * 1000) {
      const newToken = await refreshToken();
      if (!newToken) {
        logoutUser();
      }
    }
  }, [lastActivityTime, logoutUser]);

  const showLogoutWarning = useCallback(() => {
    if (window.confirm('Your session is about to expire. Click OK to stay logged in.')) {
      refreshTokenHandler();
    }
  }, [refreshTokenHandler]);

  const scheduleTimers = useCallback(() => {
    // For testing, reduce the times to a few seconds or a minute and uncomment below (and comment the production values below these)
    const refreshInterval = 10 * 1000; // 10 seconds for refresh
    const warningTime = 20 * 1000; // 20 seconds for warning (5 seconds before logout)
    const logoutTime = 25 * 1000; // 25 seconds for logout

    // For production, uncomment below
    // const refreshInterval = setTimeout(refreshTokenHandler, 1.5 * 60 * 60 * 1000); // 1.5 hours
    // const warningTime = setTimeout(showLogoutWarning, 1.95 * 60 * 60 * 1000); // 1.95 hours (5 minutes before logout)
    // const logoutTime = setTimeout(logoutUser, 2 * 60 * 60 * 1000); // 2 hours

    return () => {
      clearTimeout(refreshInterval);
      clearTimeout(warningTime);
      clearTimeout(logoutTime);
    };
  }, [refreshTokenHandler, showLogoutWarning, logoutUser]);

  const updateActivity = useCallback(() => {
    setLastActivityTime(Date.now());
    scheduleTimers();
  }, [scheduleTimers]);

  useEffect(() => {
    // Schedule the initial timers
    const clearTimers = scheduleTimers();

    // Add event listeners for user activity
    ['click', 'keypress', 'mousemove'].forEach(event => {
      window.addEventListener(event, updateActivity);
    });

    return () => {
      // Cleanup event listeners and timers on unmount
      ['click', 'keypress', 'mousemove'].forEach(event => {
        window.removeEventListener(event, updateActivity);
      });
      clearTimers();
    };
  }, [scheduleTimers, updateActivity]);

  return <>{children}</>;
};

export default SessionManager;
