import React, { createContext, useState, useContext, useEffect } from 'react';

const TokenContext = createContext();

export const useToken = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem("jwt"))?.token || null;
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
};
