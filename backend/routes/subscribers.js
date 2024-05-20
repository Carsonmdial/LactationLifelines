const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { addSubscriber, updateSubscriberStatus, getSubscribers } = require('../controllers/subscribers');
const validateRequest = require('../middleware/validateRequest');
const auth = require('../middleware/auth');

// Route to add a new subscriber
router.post(
    '/add', 
    body('email').isEmail().withMessage('Invalid email address'),
    validateRequest, 
    addSubscriber
);

// Route to update the subscription status (active/inactive)
router.post(
    '/update-status', 
    body('email').isEmail().withMessage('Invalid email address'),
    body('active').isBoolean().withMessage('Active status must be a boolean'),
    validateRequest, 
    updateSubscriberStatus
);

// Route to unsubscribe
router.post('/unsubscribe', (req, res) => {
    req.body.active = false;
    updateSubscriberStatus(req, res);
});

// Route to get all subscribers, protected by authentication middleware
router.get('/', auth, getSubscribers);

module.exports = router;



