// frontend/src/services/messageService.js
import api from './axiosConfig';

const messageService = {
  // Send a message to a user
  sendMessage: async (recipientId, content) => {
    try {
      const response = await api.post('/messages', { recipientId, content });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get all conversations (list of users you've messaged with)
  getConversations: async () => {
    try {
      const response = await api.get('/messages/conversations');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get conversation with a specific user (all messages)
  getConversation: async (userId) => {
    try {
      const response = await api.get(`/messages/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Mark messages as read
  markAsRead: async (userId) => {
    try {
      const response = await api.put(`/messages/read/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default messageService;