import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from '../api/authHook';

const AdminRoute = ({ component: Component }) => {
    const location = useLocation();
    const { user } = useAuth();
    
    return user && user.role === 1 ? (
        <Component />
    ) : (
        <Navigate to="/signin" state={{ from: location }} replace />
    );
};


export default AdminRoute;
