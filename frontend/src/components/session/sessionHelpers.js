// frontend/src/components/session/sessionHelpers.js

import { refreshToken, signout } from '../../api/auth';

export const clearTimers = (warningTimeoutRef, logoutTimeoutRef) => {
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
};

export const scheduleTimers = (warningTimeoutRef, logoutTimeoutRef, showLogoutWarning, logoutUser) => {
    clearTimers(warningTimeoutRef, logoutTimeoutRef); 

    try {
        /** TESTING */
        // warningTimeoutRef.current = setTimeout(showLogoutWarning, 10 * 1000); // 10 seconds for warning
        // logoutTimeoutRef.current = setTimeout(logoutUser, 20 * 1000); // 20 seconds for logout

        /** PRODUCTION */
        warningTimeoutRef.current = setTimeout(showLogoutWarning, 1.95 * 60 * 60 * 1000); // 1.95 hours
        logoutTimeoutRef.current = setTimeout(logoutUser, 2 * 60 * 60 * 1000); // 2 hours
    } catch (error) {
        console.error('Error scheduling timers:', error);
        throw error;
    }
};

export const refreshTokenHandler = async (logoutUser, clearTimers, scheduleTimers, setWarningShown) => {
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
};

export const logoutUser = (navigate, clearTimers, warningTimeoutRef, logoutTimeoutRef) => {
    clearTimers(warningTimeoutRef, logoutTimeoutRef);
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
