import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import {  Navigate, useLocation } from 'react-router-dom';

const PriveteRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <div className="circ">
            <div className="load">Loading . . . </div>
            <div className="hands"></div>
            <div className="body"></div>
            <div className="head">
                <div className="eye"></div>
            </div>
        </div>
    }
    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PriveteRoutes;