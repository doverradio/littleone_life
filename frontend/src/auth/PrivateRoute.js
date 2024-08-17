import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from '../api/authHook';

const PrivateRoute = ({ component: Component }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    return isAuthenticated ? (
        <Component />
    ) : (
        <Navigate to="/signin" state={{ from: location }} replace />
    );
};

export default PrivateRoute;
