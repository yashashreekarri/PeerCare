// backend/src/controllers/dashboardController.js
const User = require('../models/User');
const Connection = require('../models/Connection');
const Message = require('../models/Message');
const JournalEntry = require('../models/JournalEntry');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    // Get connected peers count (accepted connections)
    const connectedPeersCount = await Connection.countDocuments({
      status: 'accepted',
      $or: [
        { requester: req.user._id },
        { recipient: req.user._id }
      ]
    });

    // Get active chats count (unique users with messages)
    const sentMessages = await Message.distinct('recipient', {
      sender: req.user._id
    });
    const receivedMessages = await Message.distinct('sender', {
      recipient: req.user._id
    });
    const uniqueChatUsers = new Set([...sentMessages, ...receivedMessages]);
    const activeChatsCount = uniqueChatUsers.size;

    // Get journal entries count
    const journalEntriesCount = await JournalEntry.countDocuments({
      user: req.user._id
    });

    // Calculate days active (days since account creation)
    const userCreatedAt = req.user.createdAt || new Date();
    const daysActive = Math.floor(
      (Date.now() - new Date(userCreatedAt).getTime()) / (1000 * 60 * 60 * 24)
    );

    const stats = {
      connectedPeers: connectedPeersCount,
      activeChats: activeChatsCount,
      journalEntries: journalEntriesCount,
      daysActive: daysActive
    };

    successResponse(res, stats, 'Dashboard stats fetched successfully');
  } catch (error) {
    console.error('Dashboard stats error:', error);
    errorResponse(res, error.message, 500);
  }
};

// @desc    Get online peers
// @route   GET /api/dashboard/online-peers
// @access  Private
const getOnlinePeers = async (req, res) => {
  try {
    // Get accepted connections
    const connections = await Connection.find({
      status: 'accepted',
      $or: [
        { requester: req.user._id },
        { recipient: req.user._id }
      ]
    })
      .populate('requester', 'name avatar bio isOnline')
      .populate('recipient', 'name avatar bio isOnline');

    // Extract the other user and filter for online
    const onlinePeers = connections
      .map(conn => {
        const isRequester = conn.requester._id.toString() === req.user._id.toString();
        return isRequester ? conn.recipient : conn.requester;
      })
      .filter(peer => peer.isOnline)
      .slice(0, 5); // Limit to 5

    successResponse(res, onlinePeers, 'Online peers fetched successfully');
  } catch (error) {
    console.error('Online peers error:', error);
    errorResponse(res, error.message, 500);
  }
};

// @desc    Get recent journal entries
// @route   GET /api/dashboard/recent-journals
// @access  Private
const getRecentJournals = async (req, res) => {
  try {
    const recentJournals = await JournalEntry.find({
      user: req.user._id
    })
      .sort({ createdAt: -1 })
      .limit(3)
      .select('title content tags createdAt');

    successResponse(res, recentJournals, 'Recent journals fetched successfully');
  } catch (error) {
    console.error('Recent journals error:', error);
    errorResponse(res, error.message, 500);
  }
};

module.exports = {
  getDashboardStats,
  getOnlinePeers,
  getRecentJournals
};