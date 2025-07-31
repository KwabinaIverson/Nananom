// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken, getUserRole } from '../services/auth'; // Import auth helpers

/**
 * A private route component that checks for authentication and optional role.
 * Renders the children if authenticated and authorized, otherwise redirects.
 *
 * @param {object} props
 * @param {Array<string>} [props.roles] - Optional array of role names that are allowed to access this route.
 * If not provided, only checks for authentication.
 * @returns {JSX.Element}
 */
const PrivateRoute = ({ roles }) => {
  const isAuthenticated = !!getToken(); // Check if a token exists
  const userRole = getUserRole();       // Get the user's role

  if (!isAuthenticated) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (roles && roles.length > 0) {
    // If roles are specified, check if the user's role is in the allowed roles
    if (!userRole || !roles.includes(userRole)) {
      // If user doesn't have the required role, redirect to unauthorized page or login
      // For now, let's redirect to login or a generic home, but consider an /unauthorized page.
      console.warn(`Access Denied: User role "${userRole}" not in required roles: ${roles.join(', ')}`);
      return <Navigate to="/login" replace />; // Or navigate to a /not-authorized page
    }
  }

  // If authenticated and authorized, render the child routes
  return <Outlet />;
};

export default PrivateRoute;