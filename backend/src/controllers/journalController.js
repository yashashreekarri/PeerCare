const JournalEntry = require('../models/JournalEntry');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// @desc    Create journal entry
// @route   POST /api/journal
// @access  Private
const createEntry = async (req, res) => {
  try {
    const { title, content, mood, tags } = req.body;

    const entry = await JournalEntry.create({
      user: req.user._id,
      title,
      content,
      mood,
      tags: tags || []
    });

    successResponse(res, entry, 'Journal entry created successfully', 201);
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// @desc    Get all journal entries for user
// @route   GET /api/journal
// @access  Private
const getEntries = async (req, res) => {
  try {
    const { mood, tags } = req.query;

    let query = { user: req.user._id };

    if (mood) {
      query.mood = mood;
    }

    if (tags) {
      query.tags = { $in: tags.split(',') };
    }

    const entries = await JournalEntry.find(query)
      .sort({ createdAt: -1 })
      .limit(100);

    successResponse(res, entries, 'Journal entries fetched successfully');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// @desc    Get single journal entry
// @route   GET /api/journal/:id
// @access  Private
const getEntryById = async (req, res) => {
  try {
    const entry = await JournalEntry.findById(req.params.id);

    if (!entry) {
      return errorResponse(res, 'Journal entry not found', 404);
    }

    // Check if entry belongs to user
    if (entry.user.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Not authorized to view this entry', 403);
    }

    successResponse(res, entry, 'Journal entry fetched successfully');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// @desc    Update journal entry
// @route   PUT /api/journal/:id
// @access  Private
const updateEntry = async (req, res) => {
  try {
    const entry = await JournalEntry.findById(req.params.id);

    if (!entry) {
      return errorResponse(res, 'Journal entry not found', 404);
    }

    // Check if entry belongs to user
    if (entry.user.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Not authorized to update this entry', 403);
    }

    const { title, content, mood, tags } = req.body;

    if (title) entry.title = title;
    if (content) entry.content = content;
    if (mood) entry.mood = mood;
    if (tags) entry.tags = tags;

    const updatedEntry = await entry.save();

    successResponse(res, updatedEntry, 'Journal entry updated successfully');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

// @desc    Delete journal entry
// @route   DELETE /api/journal/:id
// @access  Private
const deleteEntry = async (req, res) => {
  try {
    const entry = await JournalEntry.findById(req.params.id);

    if (!entry) {
      return errorResponse(res, 'Journal entry not found', 404);
    }

    // Check if entry belongs to user
    if (entry.user.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Not authorized to delete this entry', 403);
    }

    await entry.deleteOne();

    successResponse(res, null, 'Journal entry deleted successfully');
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};

module.exports = { 
  createEntry, 
  getEntries, 
  getEntryById, 
  updateEntry, 
  deleteEntry 
};