// // Authentication has been removed. `protect` is kept as a noop middleware for compatibility.
// exports.protect = async (req, res, next) => {
//   // No auth enforced. Keep req.user undefined for public access.
//   req.user = undefined;
//   next();
// };


const jwt = require('jsonwebtoken');
const User = require('../models/User');


console.log("JWT_SECRET USED:", process.env.JWT_SECRET);
// Protect middleware - verifies JWT from Authorization header or cookie and attaches user to req.user
exports.protect = async (req, res, next) => {
  try {
    let token;

    // 1) Check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // 2) Fallback to cookie
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // 3) Fallback to x-access-token header (some clients use this)
    if (!token && (req.headers['x-access-token'] || req.headers['X-Access-Token'])) {
      token = req.headers['x-access-token'] || req.headers['X-Access-Token'];
    }

    // 4) Fallback to query param (useful for quick testing) - DO NOT use in production APIs
    if (!token && req.query && req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      // Dev-friendly logging to help debug missing token issues. Avoid verbose logs in production.
      if (process.env.NODE_ENV !== 'production') {
        console.debug('Auth protect: token missing. Headers:', req.headers);
        console.debug('Auth protect: cookies:', req.cookies);
        console.debug('Auth protect: query:', req.query);
      }
      return res.status(401).json({ message: 'Not authorized, token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'Not authorized, user not found' });

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth protect error', err && err.message ? err.message : err);
    return res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};
