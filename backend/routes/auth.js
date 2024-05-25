const express = require('express');
const { login } = require('../controllers/auth');
const { body } = require('express-validator');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').not().isEmpty().withMessage('Password is required')
  ],
  validateRequest,
  login
);

module.exports = router;
