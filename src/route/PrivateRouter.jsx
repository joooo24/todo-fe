import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({ loginUserData, children }) => {
    return (
        loginUserData ? children : <Navigate to="/login" />
    );
};

export default PrivateRouter;
