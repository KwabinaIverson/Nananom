// src/services/enquiryService.js
import { get, post, put, del } from './api'; // Ensure 'api' is correctly imported from your api.js

// Admin, Support Agent - Get all enquiries
export const getAllEnquiries = async () => {
  try {
    const data = await get('/enquiries');
    return data;
  } catch (error) {
    console.error('Error fetching all enquiries:', error.message);
    throw error;
  }
};

// All roles - Submit a customer enquiry (public or authenticated)
export const createEnquiry = async (enquiryData, requiresAuth = true) => {
  try {
    // Based on backend README, /api/enquiries POST is public, but for consistency here, we'll assume it's protected
    // If it's truly public and doesn't require a token for submission, remove the requiresAuth parameter from post() call
    const data = await post('/enquiries', enquiryData, {}, requiresAuth);
    return data;
  } catch (error) {
    console.error('Error creating enquiry:', error.message);
    throw error;
  }
};

// Admin, Support Agent - Get enquiry by ID
export const getEnquiryById = async (id) => {
  try {
    const data = await get(`/enquiries/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching enquiry with ID ${id}:`, error.message);
    throw error;
  }
};

// Admin, Support Agent - Update an enquiry (e.g., change status, add agent notes)
export const updateEnquiry = async (id, enquiryData) => {
  try {
    const data = await put(`/enquiries/${id}`, enquiryData);
    return data;
  } catch (error) {
    console.error('Error updating enquiry:', error.message);
    throw error;
  }
};

// All roles - Delete own enquiry (backend handles ownership check)
export const deleteEnquiry = async (id) => {
  try {
    const data = await del(`/enquiries/${id}`);
    return data;
  } catch (error) {
    console.error(`Error deleting enquiry with ID ${id}:`, error.message);
    throw error;
  }
};