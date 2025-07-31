// src/services/userService.js
import { get, post, put, del } from './api'; // Ensure 'api' is correctly imported from your api.js

// Admin only - Get all users
export const getAllUsers = async () => {
  try {
    const data = await get('/users');
    return data;
  } catch (error) {
    console.error('Error fetching all users:', error.message);
    throw error;
  }
};

// Admin, or User (for own profile) - Get user by ID
export const getUserById = async (id) => {
  try {
    const data = await get(`/users/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error.message);
    throw error;
  }
};

// Admin only - Create a new user (e.g., another admin/agent)
export const createUser = async (userData) => {
  try {
    const data = await post('/users', userData);
    return data;
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw error;
  }
};

// Admin, or User (for own profile) - Update user details
export const updateUser = async (id, userData) => {
  try {
    const data = await put(`/users/${id}`, userData);
    return data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error.message);
    throw error;
  }
};

// Admin only - Delete a user
export const deleteUser = async (id) => {
  try {
    const data = await del(`/users/${id}`);
    return data;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error.message);
    throw error;
  }
};