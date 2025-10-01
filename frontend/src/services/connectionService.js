// frontend/src/services/connectionService.js
import api from './axiosConfig';

const connectionService = {
  // Send connection request
  sendConnectionRequest: async (recipientId) => {
    try {
      const response = await api.post('/connections/request', { recipientId });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get all connections with optional status filter
  getConnections: async (status = null) => {
    try {
      const url = status ? `/connections?status=${status}` : '/connections';
      const response = await api.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get friends list (accepted connections)
  getFriends: async () => {
    try {
      const response = await api.get('/connections/friends');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Respond to connection request (accept/reject)
  respondToRequest: async (connectionId, status) => {
    try {
      const response = await api.put(`/connections/${connectionId}/respond`, { status });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Accept connection request
  acceptRequest: async (connectionId) => {
    return connectionService.respondToRequest(connectionId, 'accepted');
  },

  // Reject connection request
  rejectRequest: async (connectionId) => {
    return connectionService.respondToRequest(connectionId, 'rejected');
  },
};

export default connectionService;