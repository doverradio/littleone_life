import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const TokenContext = createContext();

// Add the getCookie function here
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Log all cookies available at mount
    const allCookies = Cookies.get();
    console.log("All cookies at mount:", allCookies);

    // Attempt to retrieve the token using js-cookie
    const storedToken = Cookies.get('token');
    console.log("Retrieved token from js-cookie:", storedToken);

    // Directly using document.cookie for debugging
    const directStoredToken = getCookie('token');
    console.log("Retrieved token using document.cookie:", directStoredToken);

    if (storedToken) {
      setToken(storedToken);
    } else if (directStoredToken) {
      setToken(directStoredToken);
    } else {
      console.log("No token found in cookie.");
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
