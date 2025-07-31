// src/services/api.js
import { getToken, logoutUser } from './auth'; // Assuming auth.js now only stores/retrieves token
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Get base URL from Vite env

/**
 * Custom fetch wrapper to handle API requests, including JWT authorization.
 * @param {string} endpoint - The API endpoint (e.g., '/services', '/login').
 * @param {Object} [options={}] - Standard fetch options (method, headers, body, etc.).
 * @param {boolean} [requiresAuth=true] - Whether the request requires a JWT token.
 * @returns {Promise<any>} - A promise that resolves with the parsed JSON data.
 * @throws {Error} - Throws an error for non-OK HTTP responses or network issues.
 */
const api = async (endpoint, options = {}, requiresAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers, // Allow overriding/adding headers
  };

  if (requiresAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      // If a protected endpoint is called without a token, consider it unauthorized
      // This is a client-side check before even sending the request
      console.warn(`Attempted to access protected endpoint ${endpoint} without a token.`);
      logoutUser(); // Log out in case of stale state
      window.location.href = '/login'; // Redirect to login
      throw new Error('Unauthorized: No token available.');
    }
  }

  try {
    // FIX: Removed the redundant '/api' from the URL construction.
    // The VITE_API_BASE_URL environment variable should now include '/api' if your backend uses it.
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText || 'Unknown error' }));
      console.error(`API Error on ${endpoint}:`, response.status, errorData);

      if (response.status === 401) {
        console.error('Unauthorized response (401). Logging out...');
        logoutUser();
        window.location.href = '/login'; // Redirect to login page
        // Prevent further execution for this request
        throw new Error(errorData.message || 'Unauthorized. Please log in again.');
      } else if (response.status === 403) {
        throw new Error(errorData.message || 'Forbidden: You do not have permission to perform this action.');
      } else {
        throw new Error(errorData.message || `API request failed with status ${response.status}`);
      }
    }

    // Handle 204 No Content for successful deletions etc.
    const contentType = response.headers.get('content-type');
    if (response.status !== 204 && contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data;
    } else {
      // Return null or a success message for no-content responses
      return { message: 'Operation successful' };
    }

  } catch (error) {
    console.error('Network or unexpected API error:', error.message);
    throw error; // Re-throw to be handled by the calling component
  }
};

// Export specific HTTP methods for convenience
export const get = (endpoint, options = {}, requiresAuth = true) => api(endpoint, { method: 'GET', ...options }, requiresAuth);
export const post = (endpoint, body, options = {}, requiresAuth = true) => api(endpoint, { method: 'POST', body: JSON.stringify(body), ...options }, requiresAuth);
export const put = (endpoint, body, options = {}, requiresAuth = true) => api(endpoint, { method: 'PUT', body: JSON.stringify(body), ...options }, requiresAuth);
export const del = (endpoint, options = {}, requiresAuth = true) => api(endpoint, { method: 'DELETE', ...options }, requiresAuth);

// This new `api` utility is what other service files (like `serviceService.js`) should now import.
export default api;