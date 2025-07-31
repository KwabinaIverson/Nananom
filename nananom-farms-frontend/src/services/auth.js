// src/services/auth.js

// Access the backend API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log('VITE_API_BASE_URL from import.meta.env:', API_BASE_URL); // <--- ADD THIS LINE


/**
 * Handles user registration.
 * @param {object} userData - User data (name, email, password, confirm_password, role)
 * @returns {Promise<object>} - Response data from the API
 */
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', // Important for Laravel/PHP APIs to return JSON
      },
      body: JSON.stringify(userData),
    });

    // Check if the response is OK (status 200-299)
    if (!response.ok) {
      // If not OK, parse error response and throw an error
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    // If OK, parse the successful response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during registration:', error.message);
    throw error; // Re-throw to be caught by the component
  }
};

/**
 * Handles user login.
 * @param {object} credentials - User credentials (email, password)
 * @returns {Promise<object>} - Response data including JWT token
 */
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during login:', error.message);
    throw error;
  }
};

/**
 * Handles user logout.
 * Note: For JWT, logout is primarily client-side (removing token).
 * This function is mostly a placeholder if your backend has a /api/logout endpoint
 * that invalidates tokens on the server (which is less common for pure JWT APIs).
 * @param {string} token - The JWT token
 * @returns {Promise<object>} - Response data from the API (optional)
 */
export const logoutUser = async (token) => {
  try {
    // If your backend has a logout endpoint to invalidate tokens, call it here.
    // Otherwise, removing the token from client-side storage is sufficient for JWT.
    const response = await fetch(`${API_BASE_URL}/api/logout`, {
      method: 'GET', // Or POST, depending on your backend
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`, // Send the token for server-side invalidation
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      // Even if logout fails on server, client-side token removal is primary.
      console.warn('Backend logout might have failed:', errorData.message || 'Unknown error');
    }

    // Client-side: remove the token regardless of backend response for logout.
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_role'); // Clear user role too
    // You might also want to clear any global authentication state here

    const data = await response.json(); // May not have meaningful data for logout
    return data;

  } catch (error) {
    console.error('Error during logout:', error.message);
    // Continue with client-side token removal even if an error occurs
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_role');
    throw error;
  }
};

// Helper function to get token from local storage (will be used by other services later)
export const getToken = () => {
  return localStorage.getItem('jwt_token');
};

// Helper function to get user role from local storage
export const getUserRole = () => {
  return localStorage.getItem('user_role');
};