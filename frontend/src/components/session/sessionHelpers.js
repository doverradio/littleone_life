// frontend/src/components/session/sessionHelpers.js

import { refreshToken, signout } from '../../api/auth';

export const clearTimers = (warningTimeoutRef, logoutTimeoutRef) => {
    try {
      console.log('Attempting to clear timers...');
  
      if (warningTimeoutRef && warningTimeoutRef.current !== null) {
        console.log('Clearing warningTimeoutRef:', warningTimeoutRef.current);
        clearTimeout(warningTimeoutRef.current);
        warningTimeoutRef.current = null;
        console.log('Warning timer cleared successfully.');
      } else {
        console.log('Warning timer was already cleared or never set.');
      }
  
      if (logoutTimeoutRef && logoutTimeoutRef.current !== null) {
        console.log('Clearing logoutTimeoutRef:', logoutTimeoutRef.current);
        clearTimeout(logoutTimeoutRef.current);
        logoutTimeoutRef.current = null;
        console.log('Logout timer cleared successfully.');
      } else {
        console.log('Logout timer was already cleared or never set.');
      }
  
    } catch (error) {
      console.error('Error during clearTimers:', error);
    }
  };
  
  export const scheduleTimers = (warningTimeoutRef, logoutTimeoutRef, showLogoutWarning, logoutUser) => {
    clearTimers(warningTimeoutRef, logoutTimeoutRef); // Ensure no other timers are running
  
    try {
      console.log('Scheduling timers...');
      warningTimeoutRef.current = setTimeout(showLogoutWarning, 15 * 1000); // Adjusted time for testing
      logoutTimeoutRef.current = setTimeout(logoutUser, 30 * 1000); // Adjusted time for testing
      console.log('Timers scheduled successfully.');
    } catch (error) {
      console.error('Error scheduling timers:', error);
      throw error; // Throw to handle in the calling function
    }
  };
  
  export const refreshTokenHandler = async (logoutUser, clearTimers, scheduleTimers, setWarningShown) => {
    try {
      const newToken = await refreshToken();
      if (!newToken) {
        throw new Error('Failed to refresh token');
      } else {
        console.log("Token refreshed successfully.");
        setWarningShown(false);
        
        try {
          clearTimers(); // Clear existing timers
        } catch (error) {
          console.error('Error during clearTimers:', error);
        }
  
        try {
          scheduleTimers(); // Reschedule timers after refresh
          console.log("Timers scheduled successfully after token refresh.");
        } catch (error) {
          console.error('Error during scheduleTimers:', error);
          throw error; // Throw to force logout if timers fail to reset
        }
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      logoutUser();  // Only log out if the token refresh fails or timers cannot be reset
    }
  };
  
  export const logoutUser = (navigate, clearTimers, warningTimeoutRef, logoutTimeoutRef, setWarningShown) => {
    console.log("Logging out user...");
    clearTimers(warningTimeoutRef, logoutTimeoutRef);
    setWarningShown(false);  // Hide the modal
    signout(() => {
        navigate('/signin');
    });
};
  
  export const updateActivity = (setLastActivityTime, scheduleTimers, warningShown) => {
    if (!warningShown) {
      setLastActivityTime(Date.now());
      scheduleTimers();
    }
  };
  