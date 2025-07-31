// src/services/serviceService.js
import { get, post, put, del } from '../../services/api'; // Import the new fetch-based API utility

/**
 * Fetches all available services from the backend.
 * This is a public endpoint as per your backend README.
 * @returns {Promise<Array>} A promise that resolves with an array of service objects.
 */
export const getAllServices = async () => {
  try {
    // We pass `false` for requiresAuth because /api/services is public
    const data = await get('/services', {}, false);
    return data;
  } catch (error) {
    console.error('Error fetching all services:', error.message);
    throw error;
  }
};

// Example for a protected service creation (Admin/Agent)
export const createService = async (serviceData) => {
  try {
    // This requires authentication (default true for post)
    const data = await post('/services', serviceData);
    return data;
  } catch (error) {
    console.error('Error creating service:', error.message);
    throw error;
  }
};

// Example for updating a service (Admin/Agent)
export const updateService = async (id, serviceData) => {
  try {
    // This requires authentication
    const data = await put(`/services/${id}`, serviceData);
    return data;
  } catch (error) {
    console.error('Error updating service:', error.message);
    throw error;
  }
};

// Example for deleting a service (Admin/Agent)
export const deleteService = async (id) => {
  try {
    // This requires authentication
    const data = await del(`/services/${id}`);
    return data;
  } catch (error) {
    console.error('Error deleting service:', error.message);
    throw error;
  }
};

// Example for getting a single service by ID (can be public based on your README)
export const getServiceById = async (id) => {
  try {
    const data = await get(`/services/${id}`, {}, false); // Public endpoint
    return data;
  } catch (error) {
    console.error(`Error fetching service with ID ${id}:`, error.message);
    throw error;
  }
};