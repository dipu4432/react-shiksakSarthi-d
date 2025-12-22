const express = require('express');
const { body } = require('express-validator');
const { register, login, logout } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post(
  '/register',
  [body('name').notEmpty().withMessage('name required'), body('email').isEmail().withMessage('valid email required'), body('password').isLength({ min: 6 }).withMessage('password min 6')],
  register
);

router.post('/login', [body('email').isEmail().withMessage('valid email required'), body('password').notEmpty().withMessage('password required')], login);

// Logout - clears httpOnly cookie
router.post('/logout', protect, logout);

module.exports = router;
