// frontend/src/services/userService.js
import api from './axiosConfig';

const userService = {
  // Get all users (browse peers) with optional filters
  getUsers: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filters.search) params.append('search', filters.search);
      if (filters.struggles) params.append('struggles', filters.struggles);
      if (filters.interests) params.append('interests', filters.interests);
      if (filters.online !== undefined) params.append('online', filters.online);
      
      const queryString = params.toString();
      const url = queryString ? `/users?${queryString}` : '/users';
      
      const response = await api.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/users/profile', profileData);
      
      // Update user in localStorage
      if (response.success && response.data) {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = { ...currentUser, ...response.data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;