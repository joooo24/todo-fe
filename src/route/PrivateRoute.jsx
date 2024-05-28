import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ loginUserData, children }) => {
    return (
        loginUserData ? children : <Navigate to="/login" />
    );
};

export default PrivateRoute;
