const express = require('express');
const router = express.Router();
const { 
  createEntry, 
  getEntries, 
  getEntryById, 
  updateEntry, 
  deleteEntry 
} = require('../controllers/journalController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createEntry);
router.get('/', protect, getEntries);
router.get('/:id', protect, getEntryById);
router.put('/:id', protect, updateEntry);
router.delete('/:id', protect, deleteEntry);

module.exports = router;