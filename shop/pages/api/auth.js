const API = process.env.NEXT_PUBLIC_API || 'https://www.littleone.life/api'; // Your backend API URL

export const signup = async (user) => {
    try {
        const response = await fetch(`${API}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        return await response.json();
    } catch (error) {
        console.error('Error in signup:', error);
        throw error;
    }
};

export const signin = async (user) => {
    try {
        const response = await fetch(`${API}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies
            body: JSON.stringify(user),
        });

        return await response.json();
    } catch (err) {
        console.error('Sign-In error:', err);
        return { error: 'Sign-In failed. Please try again.' };
    }
};

export const signout = async () => {
    try {
        const response = await fetch(`${API}/signout`, {
            method: 'POST',
            credentials: 'include', // Ensure cookies are included
        });

        if (response.ok) {
            return { success: true };
        } else {
            throw new Error('Signout failed');
        }
    } catch (err) {
        console.error('Signout error:', err);
        return { success: false };
    }
};

export const checkSession = async () => {
    try {
        const response = await fetch(`${API}/check-session`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to check session');
        }

        return await response.json();
    } catch (error) {
        console.error('Error checking session:', error);
        return { isAuthenticated: false };
    }
};
