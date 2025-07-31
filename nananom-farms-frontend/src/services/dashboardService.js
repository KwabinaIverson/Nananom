// src/services/dashboardService.js
import { get } from './api';

/**
 * Fetches aggregated statistics for the Admin Dashboard from the backend.
 * This is a protected endpoint.
 * @returns {Promise<Object>} A promise that resolves with an object of dashboard statistics.
 */
export const getAdminDashboardStats = async () => {
  try {
    // Calls the new /api/dashboard/admin-stats endpoint
    const data = await get('/dashboard/admin-stats');
    return data;
  } catch (error) {
    console.error('Error fetching admin dashboard stats:', error.message);
    throw error;
  }
};

// You might add similar functions for Agent/Customer dashboards if they get dedicated stats endpoints.