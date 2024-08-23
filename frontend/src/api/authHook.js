import { useToken } from '../context/TokenContext';

export const useAuth = () => {
    const { token } = useToken();
    if (!token) {
        return { user: null, token: null, isAuthenticated: false };
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
        const user = { ...payload, token }; // Include the token in the user object

        return { user, token, isAuthenticated: true };
    } catch (error) {
        console.error('Error parsing token:', error);
        return { user: null, token: null, isAuthenticated: false };
    }
};
