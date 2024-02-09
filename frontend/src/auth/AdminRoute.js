import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { isAuthenticated } from "../api/auth"; 

const AdminRoute = ({ component: Component }) => {
    const location = useLocation();
    const { user } = isAuthenticated();
    
    return isAuthenticated() && user.role === 1 ? (
        <Component />
    ) : (
        <Navigate to="/signin" state={{ from: location }} replace />
    );
};


export default AdminRoute;
