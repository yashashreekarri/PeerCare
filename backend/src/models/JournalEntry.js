const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    maxlength: 5000
  },
  mood: {
    type: String,
    enum: ['happy', 'grateful', 'neutral', 'anxious', 'sad'],
    default: 'neutral'
  },
  tags: [{
    type: String
  }]
}, {
  timestamps: true
});

// Index for faster user queries
journalEntrySchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('JournalEntry', journalEntrySchema);