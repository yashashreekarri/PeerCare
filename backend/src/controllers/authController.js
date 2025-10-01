const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password, age, bio, struggles, interests } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, 'User already exists with this email', 400);
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      age,
      bio,
      struggles: struggles || [],
      interests: interests || [],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
    });

    // Generate token
    const token = generateToken(user._id);

    // Return user data without password
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      bio: user.bio,
      avatar: user.avatar,
      struggles: user.struggles,
      interests: user.interests,
      token
    };

    successResponse(res, userData, 'Registration successful', 201);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    // Update online status
    user.isOnline = true;
    user.lastSeen = Date.now();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Return user data
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      bio: user.bio,
      avatar: user.avatar,
      struggles: user.struggles,
      interests: user.interests,
      isOnline: user.isOnline,
      token
    };

    successResponse(res, userData, 'Login successful');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.isOnline = false;
    user.lastSeen = Date.now();
    await user.save();

    successResponse(res, null, 'Logout successful');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    successResponse(res, user, 'User fetched successfully');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

module.exports = { register, login, logout, getMe };