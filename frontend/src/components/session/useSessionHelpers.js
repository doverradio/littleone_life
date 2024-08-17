// frontend/src/components/session/useSessionHelpers.js

import { useCallback } from 'react';
import { refreshToken, signout } from '../../api/auth';
import { useToken } from '../../context/TokenContext';

export const useSessionHelpers = () => {
  const { setToken } = useToken(); // Access setToken here

  const clearTimers = useCallback((warningTimeoutRef, logoutTimeoutRef) => {
    try {
      if (warningTimeoutRef && warningTimeoutRef.current !== null) {
        clearTimeout(warningTimeoutRef.current);
        warningTimeoutRef.current = null;
      }

      if (logoutTimeoutRef && logoutTimeoutRef.current !== null) {
        clearTimeout(logoutTimeoutRef.current);
        logoutTimeoutRef.current = null;
      }
    } catch (error) {
      console.error('Error during clearTimers:', error);
    }
  }, []);

  const scheduleTimers = useCallback(
    (warningTimeoutRef, logoutTimeoutRef, showLogoutWarning, logoutUser) => {
      clearTimers(warningTimeoutRef, logoutTimeoutRef);

      try {
        warningTimeoutRef.current = setTimeout(showLogoutWarning, 1.95 * 60 * 60 * 1000); // 1.95 hours
        logoutTimeoutRef.current = setTimeout(logoutUser, 2 * 60 * 60 * 1000); // 2 hours
      } catch (error) {
        console.error('Error scheduling timers:', error);
        throw error;
      }
    },
    [clearTimers]
  );

  const refreshTokenHandler = useCallback(
    async (logoutUser, clearTimers, scheduleTimers, setWarningShown) => {
      try {
        const newToken = await refreshToken();
        if (!newToken) {
          throw new Error('Failed to refresh token');
        } else {
          setWarningShown(false);
          try {
            clearTimers();
          } catch (error) {
            console.error('Error during clearTimers:', error);
          }

          try {
            scheduleTimers();
          } catch (error) {
            console.error('Error during scheduleTimers:', error);
            throw error;
          }
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        logoutUser();
      }
    },
    []
  );

  const logoutUser = useCallback(
    (navigate, clearTimers, warningTimeoutRef, logoutTimeoutRef) => {
      clearTimers(warningTimeoutRef, logoutTimeoutRef);
      signout(setToken, () => {
        navigate('/signin');
      });
    },
    [setToken]
  );

  const updateActivity = useCallback(
    (setLastActivityTime, scheduleTimers, warningShown) => {
      if (!warningShown) {
        setLastActivityTime(Date.now());
        scheduleTimers();
      }
    },
    []
  );

  return {
    clearTimers,
    scheduleTimers,
    refreshTokenHandler,
    logoutUser,
    updateActivity,
  };
};
