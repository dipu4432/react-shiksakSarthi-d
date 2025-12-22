const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

function generateToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_EXPIRES_IN ||'7d'
  });
}

function sendTokenResponse(user, statusCode, req, res) {
  const token = generateToken(user);
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: parseInt(process.env.JWT_COOKIE_EXPIRES_MS, 10) || 7 * 24 * 60 * 60 * 1000 // 7 days
  };

  res.cookie('token', token, cookieOptions);
  // return token in body as well to support SPAs using Authorization header/localStorage
  return res.status(statusCode).json({ token, user: { id: user._id, name: user.name, email: user.email } });
}

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // const { name, email, password } = req.body;
    // if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    // const exists = await User.findOne({ email });
    // if (exists) return res.status(400).json({ message: 'User already exists' });
    // const user = await User.create({ name, email, password });
    // return res.status(201).json({ token: generateToken(user), user: { id: user._id, name: user.name, email: user.email } });
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });
    const user = await User.create({ name, email, password });
    return sendTokenResponse(user, 201, req, res);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    // const { email, password } = req.body;
    // if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
    // const user = await User.findOne({ email });
    // if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    // const isMatch = await user.matchPassword(password);
    // if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    // return res.json({ token: generateToken(user), user: { id: user._id, name: user.name, email: user.email } });
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    return sendTokenResponse(user, 200, req, res);
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res) => {
  // Clear cookie
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  res.json({ message: 'Logged out' });
};
