// src/components/RoleRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from '../services/auth'; // Import from your auth service

const RoleRoute = ({ allowedRoles, children }) => {
  const userRole = getUserRole(); // Get the current user's role

  if (!userRole || !allowedRoles.includes(userRole)) {
    // User is not authorized for this role, redirect.
    // You can customize this redirect logic further:
    // - To an "Unauthorized" page
    // - To their specific dashboard if they are logged in but don't have the *right* role for this specific route.
    console.warn(`Access Denied: User role "${userRole}" not in allowed roles: ${allowedRoles.join(', ')}`);

    // Example redirect logic:
    if (userRole === 'Administrator') return <Navigate to="/admin/dashboard" replace />;
    if (userRole === 'Support Agent') return <Navigate to="/agent/dashboard" replace />;
    if (userRole === 'Customer') return <Navigate to="/customer/dashboard" replace />;

    // If no specific dashboard, or not logged in, go to login (should be caught by PrivateRoute first anyway)
    return <Navigate to="/login" replace />;
  }

  // User has an allowed role, render the children
  return children;
};

export default RoleRoute;