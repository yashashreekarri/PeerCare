const Message = require('../models/Message');
const Connection = require('../models/Connection');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
  try {
    const { recipientId, content } = req.body;

    // Check if users are connected
    const connection = await Connection.findOne({
      status: 'accepted',
      $or: [
        { requester: req.user._id, recipient: recipientId },
        { requester: recipientId, recipient: req.user._id }
      ]
    });

    if (!connection) {
      return errorResponse(res, 'You must be connected to send messages', 403);
    }

    const message = await Message.create({
      sender: req.user._id,
      recipient: recipientId,
      content
    });

    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'name avatar')
      .populate('recipient', 'name avatar');

    successResponse(res, populatedMessage, 'Message sent successfully', 201);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// @desc    Get conversation between two users
// @route   GET /api/messages/:userId
// @access  Private
const getConversation = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, recipient: userId },
        { sender: userId, recipient: req.user._id }
      ]
    })
      .populate('sender', 'name avatar')
      .populate('recipient', 'name avatar')
      .sort({ createdAt: 1 });

    successResponse(res, messages, 'Messages fetched successfully');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// @desc    Get all conversations
// @route   GET /api/messages/conversations
// @access  Private
const getConversations = async (req, res) => {
  try {
    // Get all unique users the current user has messaged with
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: req.user._id },
            { recipient: req.user._id }
          ]
        }
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender', req.user._id] },
              '$recipient',
              '$sender'
            ]
          },
          lastMessage: { $first: '$$ROOT' },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$recipient', req.user._id] },
                    { $eq: ['$isRead', false] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    // Populate user details
    const populatedConversations = await Message.populate(messages, [
      { path: '_id', select: 'name avatar isOnline' },
      { path: 'lastMessage.sender', select: 'name avatar' },
      { path: 'lastMessage.recipient', select: 'name avatar' }
    ]);

    successResponse(res, populatedConversations, 'Conversations fetched successfully');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// @desc    Mark messages as read
// @route   PUT /api/messages/read/:userId
// @access  Private
const markAsRead = async (req, res) => {
  try {
    const { userId } = req.params;

    await Message.updateMany(
      { sender: userId, recipient: req.user._id, isRead: false },
      { isRead: true, readAt: Date.now() }
    );

    successResponse(res, null, 'Messages marked as read');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

module.exports = { 
  sendMessage, 
  getConversation, 
  getConversations, 
  markAsRead 
};