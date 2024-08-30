import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from '../api/authHook';

const AdminRoute = ({ component: Component }) => {
    const location = useLocation();
    const { user, isAuthenticated, loading } = useAuth();

    // Show a loading indicator or null while the authentication check is in progress
    if (loading) {
        return null; // You can replace this with a loading spinner or similar if desired
    }

    // Once loading is complete, determine if the user can access the route
    return isAuthenticated && user && user.role === 1 ? (
        <Component />
    ) : (
        <Navigate to="/signin" state={{ from: location }} replace />
    );
};

export default AdminRoute;
