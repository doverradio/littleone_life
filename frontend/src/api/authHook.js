import { useState, useEffect, useContext } from 'react';
import { checkSession } from './auth';
import { UserContext } from '../context/UserContext'; // Make sure to import UserContext

export const useAuth = () => {
    const { user, setUser } = useContext(UserContext); // Destructure user and setUser from UserContext
    const [isAuthenticated, setIsAuthenticated] = useState(!!user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const sessionResponse = await checkSession();
                if (sessionResponse.isAuthenticated) {
                    setIsAuthenticated(true);
                    setUser(sessionResponse.user);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } catch (error) {
                console.error('Error checking session:', error);
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, [setUser]); // Add setUser as a dependency

    return { user, setUser, isAuthenticated, loading };
};
