const Connection = require('../models/Connection');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// @desc    Send connection request
// @route   POST /api/connections/request
// @access  Private
const sendConnectionRequest = async (req, res) => {
  try {
    const { recipientId } = req.body;

    // Check if connection already exists
    const existingConnection = await Connection.findOne({
      $or: [
        { requester: req.user._id, recipient: recipientId },
        { requester: recipientId, recipient: req.user._id }
      ]
    });

    if (existingConnection) {
      return errorResponse(res, 'Connection request already exists', 400);
    }

    const connection = await Connection.create({
      requester: req.user._id,
      recipient: recipientId,
      status: 'pending'
    });

    const populatedConnection = await Connection.findById(connection._id)
      .populate('requester', 'name avatar')
      .populate('recipient', 'name avatar');

    successResponse(res, populatedConnection, 'Connection request sent', 201);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// @desc    Get all connections for user
// @route   GET /api/connections
// @access  Private
const getConnections = async (req, res) => {
  try {
    const { status } = req.query;

    let query = {
      $or: [
        { requester: req.user._id },
        { recipient: req.user._id }
      ]
    };

    if (status) {
      query.status = status;
    }

    const connections = await Connection.find(query)
      .populate('requester', 'name avatar email isOnline')
      .populate('recipient', 'name avatar email isOnline')
      .sort({ createdAt: -1 });

    successResponse(res, connections, 'Connections fetched successfully');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// @desc    Respond to connection request
// @route   PUT /api/connections/:id/respond
// @access  Private
const respondToRequest = async (req, res) => {
  try {
    const { status } = req.body; // 'accepted' or 'rejected'

    const connection = await Connection.findById(req.params.id);

    if (!connection) {
      return errorResponse(res, 'Connection request not found', 404);
    }

    // Check if current user is the recipient
    if (connection.recipient.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Not authorized to respond to this request', 403);
    }

    connection.status = status;
    await connection.save();

    const populatedConnection = await Connection.findById(connection._id)
      .populate('requester', 'name avatar')
      .populate('recipient', 'name avatar');

    successResponse(res, populatedConnection, `Connection ${status}`);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// @desc    Get accepted connections (friends)
// @route   GET /api/connections/friends
// @access  Private
const getFriends = async (req, res) => {
  try {
    const connections = await Connection.find({
      status: 'accepted',
      $or: [
        { requester: req.user._id },
        { recipient: req.user._id }
      ]
    })
      .populate('requester', 'name avatar email isOnline struggles interests')
      .populate('recipient', 'name avatar email isOnline struggles interests');

    // Extract friend data (not the connection object)
    const friends = connections.map(conn => {
      if (conn.requester._id.toString() === req.user._id.toString()) {
        return conn.recipient;
      } else {
        return conn.requester;
      }
    });

    successResponse(res, friends, 'Friends fetched successfully');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

module.exports = { 
  sendConnectionRequest, 
  getConnections, 
  respondToRequest, 
  getFriends 
};