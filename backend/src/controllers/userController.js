const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// @desc    Get all users (browse peers)
// @route   GET /api/users
// @access  Private
const getUsers = async (req, res) => {
  try {
    const { search, struggles, interests, online } = req.query;

    let query = { _id: { $ne: req.user._id } }; // Exclude current user

    // Search by name or bio
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by struggles
    if (struggles) {
      query.struggles = { $in: struggles.split(',') };
    }

    // Filter by interests
    if (interests) {
      query.interests = { $in: interests.split(',') };
    }

    // Filter by online status
    if (online === 'true') {
      query.isOnline = true;
    }

    const users = await User.find(query)
      .select('-password')
      .limit(50)
      .sort({ isOnline: -1, lastSeen: -1 });

    successResponse(res, users, 'Users fetched successfully');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    successResponse(res, user, 'User fetched successfully');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { name, age, bio, struggles, interests } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    // Update fields
    if (name) user.name = name;
    if (age) user.age = age;
    if (bio) user.bio = bio;
    if (struggles) user.struggles = struggles;
    if (interests) user.interests = interests;

    const updatedUser = await user.save();

    successResponse(res, updatedUser, 'Profile updated successfully');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

module.exports = { getUsers, getUserById, updateProfile };