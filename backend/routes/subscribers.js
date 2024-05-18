const express = require('express');
const router = express.Router();
const { addSubscriber, updateSubscriberStatus, getSubscribers } = require('../controllers/subscribers');
const auth = require('../middleware/auth');

// Route to add a new subscriber
router.post('/add', addSubscriber);

// Route to update the subscription status (active/inactive)
router.post('/update-status', updateSubscriberStatus);

// Route to get all subscribers, protected by authentication middleware
router.get('/', auth, getSubscribers);

module.exports = router;
