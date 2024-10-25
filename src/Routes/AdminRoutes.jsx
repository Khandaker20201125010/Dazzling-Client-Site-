import React from 'react';
import useAdmin from '../Hooks/useAdmin';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoutes = ({ children }) => {
    const [user ,loading] = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin();
    
    const location = useLocation();
    if (loading || isAdminLoading) {
        return <div className="circ  h-screen">
            <div className="load">Loading . . . </div>
            <div className="hands"></div>
            <div className="body"></div>
            <div className="head">
                <div className="eye"></div>
            </div>
        </div>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoutes;