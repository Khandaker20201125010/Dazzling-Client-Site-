import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import {  Navigate, useLocation } from 'react-router-dom';

const PriveteRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <div class="circ">
            <div class="load">Loading . . . </div>
            <div class="hands"></div>
            <div class="body"></div>
            <div class="head">
                <div class="eye"></div>
            </div>
        </div>
    }
    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PriveteRoutes;