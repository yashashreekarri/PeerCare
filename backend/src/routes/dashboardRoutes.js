// backend/src/routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getDashboardStats, 
  getOnlinePeers, 
  getRecentJournals 
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');

router.get('/stats', protect, getDashboardStats);
router.get('/online-peers', protect, getOnlinePeers);
router.get('/recent-journals', protect, getRecentJournals);

module.exports = router;