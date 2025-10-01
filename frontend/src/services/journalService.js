// frontend/src/services/journalService.js
import api from './axiosConfig';

const journalService = {
  // Create a new journal entry
  createEntry: async (entryData) => {
    try {
      const response = await api.post('/journal', entryData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get all journal entries with optional filters
  getEntries: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filters.mood) params.append('mood', filters.mood);
      if (filters.tags) params.append('tags', filters.tags);
      
      const queryString = params.toString();
      const url = queryString ? `/journal?${queryString}` : '/journal';
      
      const response = await api.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get a single journal entry by ID
  getEntryById: async (entryId) => {
    try {
      const response = await api.get(`/journal/${entryId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update a journal entry
  updateEntry: async (entryId, entryData) => {
    try {
      const response = await api.put(`/journal/${entryId}`, entryData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete a journal entry
  deleteEntry: async (entryId) => {
    try {
      const response = await api.delete(`/journal/${entryId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default journalService;