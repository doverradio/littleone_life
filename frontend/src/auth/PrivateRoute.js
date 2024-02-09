import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../api/auth"; 

const PrivateRoute = ({ component: Component }) => {
    const location = useLocation();
    return isAuthenticated() ? (
        <Component />
    ) : (
        <Navigate to="/signin" state={{ from: location }} replace />
    );
};

export default PrivateRoute;
