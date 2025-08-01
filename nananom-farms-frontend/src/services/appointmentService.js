// src/services/appointmentService.js
import { get, post, put, del } from './api'; // Ensure 'api' is correctly imported from your api.js

// All roles - Get all appointments (or own for customer, backend handles filtering)
export const getAllAppointments = async () => {
  try {
    // Assuming backend handles role-based filtering for 'all' vs 'own'
    const data = await get('/api/appointments');
    return data;
  } catch (error) {
    console.error('Error fetching all appointments:', error.message);
    throw error;
  }
};

// All roles - Get appointment by ID
export const getAppointmentById = async (id) => {
  try {
    const data = await get(`/api/appointments/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching appointment with ID ${id}:`, error.message);
    throw error;
  }
};

// All roles - Book a new appointment (typically done by customer)
export const createAppointment = async (appointmentData) => {
  try {
    const data = await post('/api/create_appointments', appointmentData);
    return data;
  } catch (error) {
    console.error('Error creating appointment:', error.message);
    throw error;
  }
};

// Admin, Support Agent - Update an appointment (e.g., change status)
export const updateAppointment = async (id, appointmentData) => {
  try {
    const data = await put(`/api/update_appointments/${id}`, appointmentData);
    return data;
  } catch (error) {
    console.error('Error updating appointment:', error.message);
    throw error;
  }
};

// Admin, Support Agent - Delete an appointment
export const deleteAppointment = async (id) => {
  try {
    const data = await del(`api/delete_appointments/${id}`);
    return data;
  } catch (error) {
    console.error(`Error deleting appointment with ID ${id}:`, error.message);
    throw error;
  }
};