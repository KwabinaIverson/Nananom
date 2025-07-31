// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth'; // Import from your auth service

const PrivateRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }
  // User is authenticated, render the children (the protected component)
  return children;
};

export default PrivateRoute;