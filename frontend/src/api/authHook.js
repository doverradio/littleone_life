import { useToken } from '../context/TokenContext';

export const useAuth = () => {
    const { token } = useToken();
    if (!token) {
      return { user: null, token: null, isAuthenticated: false };
    }
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const user = { ...payload, token };
      return { user, token, isAuthenticated: true };
    } catch (error) {
      console.error('Error parsing token:', error);
      return { user: null, token: null, isAuthenticated: false };
    }
  };
