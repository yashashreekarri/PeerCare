// frontend/src/services/dashboardService.js
import api from './axiosConfig';

const dashboardService = {
  // Get dashboard statistics
  getStats: async () => {
    try {
      const response = await api.get('/dashboard/stats');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get online peers
  getOnlinePeers: async () => {
    try {
      const response = await api.get('/dashboard/online-peers');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get recent journal entries
  getRecentJournals: async () => {
    try {
      const response = await api.get('/dashboard/recent-journals');
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default dashboardService;