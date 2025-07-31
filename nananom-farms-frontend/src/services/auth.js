// src/services/auth.js
// Access the backend API base URL from environment variables
// No need to import.meta.env directly here; api.js handles the base URL.
// But we do need to import the post function for login/register.
import { post } from './api'; // Import the 'post' function from your api.js

const TOKEN_KEY = 'jwtToken';
const USER_ROLE_KEY = 'userRole';
const USER_ID_KEY = 'userId'; // Store userId to easily identify the logged-in user

/**
 * Stores the JWT token, user role, and user ID in localStorage upon successful login.
 * @param {string} token - The JWT token received from the backend.
 * @param {string} role - The role of the authenticated user (e.g., 'Administrator', 'Support Agent', 'Customer').
 * @param {string} userId - The unique ID of the authenticated user (UUID string).
 */
export const storeAuthData = (token, role, userId) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_ROLE_KEY, role);
  localStorage.setItem(USER_ID_KEY, userId);
  console.log('Auth data stored:', { token: token ? '***' : 'N/A', role, userId });
};

/**
 * Retrieves the JWT token from localStorage.
 * @returns {string | null} The JWT token if found, otherwise null.
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Retrieves the user role from localStorage.
 * @returns {string | null} The user role if found, otherwise null.
 */
export const getUserRole = () => {
  return localStorage.getItem(USER_ROLE_KEY);
};

/**
 * Retrieves the user ID from localStorage.
 * @returns {string | null} The user ID if found, otherwise null.
 */
export const getUserId = () => {
  return localStorage.getItem(USER_ID_KEY);
};

/**
 * Checks if a user is currently authenticated (has a token).
 * @returns {boolean} True if a token exists, false otherwise.
 */
export const isAuthenticated = () => {
  return !!getToken(); // Returns true if token is not null or empty string
};

/**
 * Sends login credentials to the backend and stores auth data on success.
 * @param {object} credentials - User credentials (email, password)
 * @returns {Promise<object>} A promise that resolves with user data (including token, role, userId).
 * @throws {Error} If login fails.
 */
export const loginUser = async (credentials) => {
  try {
    // Use the 'post' function from api.js.
    // The last argument 'false' means: do NOT include an Authorization header,
    // as the user is not yet logged in.
    const response = await post('/login', credentials, {}, false);

    // Backend should return token, role, and userId on successful login.
    if (response && response.token && response.role && response.userId) {
      storeAuthData(response.token, response.role, response.userId);
      return {
        token: response.token,
        role: response.role,
        userId: response.userId
      };
    } else {
      // If backend response is missing required data, throw a specific error.
      throw new Error('Login response missing token, role, or user ID.');
    }
  } catch (error) {
    console.error('Login failed:', error.message);
    throw error; // Re-throw to be caught by the component
  }
};

/**
 * Handles user registration.
 * @param {object} userData - User data (name, email, password, confirm_password, role)
 * @returns {Promise<object>} - Response data from the API
 */
export const registerUser = async (userData) => {
  try {
    // Use the 'post' function from api.js.
    // Assuming registration does not require a token for the request itself.
    const response = await post('/register', userData, {}, false);
    return response;
  } catch (error) {
    console.error('Error during registration:', error.message);
    throw error; // Re-throw to be caught by the component
  }
};

/**
 * Handles user logout.
 * Removes token and user data from client-side storage.
 * Optionally calls backend logout endpoint if server-side invalidation is needed.
 * @returns {Promise<void>}
 */
export const logoutUser = async () => {
  // Get token before clearing, in case backend requires it for invalidation
  const token = getToken();

  // Always clear client-side storage immediately for responsiveness
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ROLE_KEY);
  localStorage.removeItem(USER_ID_KEY);
  console.log('User logged out. Auth data cleared client-side.');

  // If your backend has a /api/logout endpoint for server-side token invalidation:
  if (token) {
    try {
      // Use 'post' or 'get' from api.js, ensure it sends the token for server-side processing
      // Assuming 'get' is not ideal for actions that change state; 'post' is generally better.
      // If your backend expects a GET, change post to get.
      await post('/logout', {}, { Authorization: `Bearer ${token}` });
      console.log('Backend logout call initiated.');
    } catch (error) {
      console.warn('Backend logout might have failed (token invalidation issue):', error.message);
      // We still clear client-side, so no need to re-throw here unless you want
      // to specifically indicate server logout failure to the user.
    }
  }
  // No need to return data as client-side action is primary.
};