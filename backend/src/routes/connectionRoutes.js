const express = require('express');
const router = express.Router();
const { 
  sendConnectionRequest, 
  getConnections, 
  respondToRequest, 
  getFriends 
} = require('../controllers/connectionController');
const { protect } = require('../middleware/auth');

router.post('/request', protect, sendConnectionRequest);
router.get('/', protect, getConnections);
router.get('/friends', protect, getFriends);
router.put('/:id/respond', protect, respondToRequest);

module.exports = router;