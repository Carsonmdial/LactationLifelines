const express = require('express');
const router = express.Router();
const { getEngagement } = require('../controllers/engagement');
const auth = require('../middleware/auth');

// Route to get user engagement statistics
router.get('/', auth, getEngagement);

module.exports = router;
