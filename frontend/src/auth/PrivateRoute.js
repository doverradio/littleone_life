import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from '../api/authHook';

const PrivateRoute = ({ component: Component }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // While loading, return null or a loading spinner to avoid premature redirection
    if (loading) {
        return null; // You can replace this with a loading spinner if desired
    }

    return isAuthenticated ? (
        <Component />
    ) : (
        <Navigate to="/signin" state={{ from: location }} replace />
    );
};

export default PrivateRoute;
