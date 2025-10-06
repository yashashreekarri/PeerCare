const Message = require('../models/Message');
const Connection = require('../models/Connection');
const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const mongoose = require('mongoose');

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
    // Convert to ObjectId properly
    const userId = new mongoose.Types.ObjectId(req.user._id);

    // Get all unique users the current user has messaged with using aggregation
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { recipient: userId }]
        }
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender', userId] },
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
                    { $eq: ['$recipient', userId] },
                    { $eq: ['$isRead', false] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'otherUser'
        }
      },
      { $unwind: '$otherUser' },
      {
        $lookup: {
          from: 'users',
          localField: 'lastMessage.sender',
          foreignField: '_id',
          as: 'lastMessage.senderDetails'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'lastMessage.recipient',
          foreignField: '_id',
          as: 'lastMessage.recipientDetails'
        }
      },
      {
        $addFields: {
          'lastMessage.sender': {
            $cond: [
              { $gt: [{ $size: '$lastMessage.senderDetails' }, 0] },
              {
                _id: { $arrayElemAt: ['$lastMessage.senderDetails._id', 0] },
                name: { $arrayElemAt: ['$lastMessage.senderDetails.name', 0] },
                avatar: { $arrayElemAt: ['$lastMessage.senderDetails.avatar', 0] }
              },
              null
            ]
          },
          'lastMessage.recipient': {
            $cond: [
              { $gt: [{ $size: '$lastMessage.recipientDetails' }, 0] },
              {
                _id: { $arrayElemAt: ['$lastMessage.recipientDetails._id', 0] },
                name: { $arrayElemAt: ['$lastMessage.recipientDetails.name', 0] },
                avatar: { $arrayElemAt: ['$lastMessage.recipientDetails.avatar', 0] }
              },
              null
            ]
          }
        }
      },
      {
        $project: {
          _id: 1,
          otherUser: {
            _id: '$otherUser._id',
            name: '$otherUser.name',
            email: '$otherUser.email',
            avatar: '$otherUser.avatar',
            isOnline: '$otherUser.isOnline'
          },
          lastMessage: {
            _id: '$lastMessage._id',
            content: '$lastMessage.content',
            createdAt: '$lastMessage.createdAt',
            isRead: '$lastMessage.isRead',
            sender: '$lastMessage.sender',
            recipient: '$lastMessage.recipient'
          },
          unreadCount: 1
        }
      },
      { $sort: { 'lastMessage.createdAt': -1 } }
    ]);

    successResponse(res, conversations, 'Conversations fetched successfully');
  } catch (error) {
    console.error('Get conversations error:', error);
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
      {
        sender: userId,
        recipient: req.user._id,
        isRead: false
      },
      {
        isRead: true
      }
    );

    successResponse(res, null, 'Messages marked as read');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// @desc    Get unread messages count
// @route   GET /api/messages/unread/count
// @access  Private
const getUnreadCount = async (req, res) => {
  try {
    const unreadCount = await Message.countDocuments({
      recipient: req.user._id,
      isRead: false
    });

    successResponse(res, { count: unreadCount }, 'Unread count fetched successfully');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

module.exports = {
  sendMessage,
  getConversation,
  getConversations,
  markAsRead,
  getUnreadCount
};