require('dotenv').config();
const express = require('express');
const path = require('path');

const { connectDB } = require('./config/db');
const { cloudinaryConfig } = require('./config/cloudinary');
const securityMiddleware = require('./middleware/security');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const mediaRoutes = require('./routes/media');
const postRoutes = require('./routes/post');
const discountRouter = require('./routes/discount');
const testimonialRoutes = require('./routes/testimonial');
const uploadRoutes = require('./routes/upload');
const app = express();

// REQUIRED FOR VERCEL / PROXY
app.set('trust proxy', 1);

// Cloudinary config
cloudinaryConfig();

// Security & parsers
securityMiddleware(app);

// JSON parsing
app.use(express.json({ limit: '5mb' }));

// Health routes (before DB middleware so /health/db can show connection errors)
app.get('/health', (req, res) => res.json({ ok: true }));
// Check if env vars are present on this host (e.g. Vercel) - no secrets revealed
app.get('/health/env', (req, res) => {
  res.json({
    MONGO_URI_set: Boolean(process.env.MONGO_URI),
    VERCEL: Boolean(process.env.VERCEL),
  });
});
app.get('/health/db', async (req, res) => {
  try {
    await connectDB();
    return res.json({ ok: true, db: 'connected' });
  } catch (err) {
    console.error('Health DB check failed:', err.message);
    return res.status(503).json({
      ok: false,
      db: 'disconnected',
      error: err.message,
    });
  }
});

// Lazy DB connect for Vercel serverless: connect on first request instead of at cold start.
// Avoids FUNCTION_INVOCATION_FAILED when env (e.g. MONGO_URI) is missing or DB is slow.
let dbConnectPromise = null;
let lastDbError = null;
app.use(async (req, res, next) => {
  if (dbConnectPromise === null) {
    dbConnectPromise = connectDB().catch((err) => {
      lastDbError = err;
      console.error('DB connect failed:', err.message);
      dbConnectPromise = null; // allow retry on next request
      return null;
    });
  }
  const conn = await dbConnectPromise;
  if (conn == null) {
    const message = lastDbError
      ? `Database unavailable: ${lastDbError.message}`
      : 'Service temporarily unavailable (database)';
    return res.status(503).json({ message });
  }
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/posts', postRoutes);
app.use('/discount', discountRouter);

app.use('/api/testimonials', testimonialRoutes);
app.use('/api/upload', uploadRoutes);

// Root – avoid "Cannot GET /" when opening backend URL in browser
app.get('/', (req, res) => {
  res.json({
    message: 'Colors Kitchen API',
    docs: {
      health: 'GET /health',
      auth: '/api/auth (login, register, logout)',
      media: '/api/media',
      posts: '/api/posts',
      enquiry: '/api/enquiry',
    },
  });
});

// Error handler
app.use(errorHandler);

const enquiryRoutes = require("./routes/enquiry");
app.use("/api/enquiry", enquiryRoutes);

const PORT = process.env.PORT || 3001;

// Connect to DB first, then start server (local / non-Vercel only)
async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

// On Vercel: export the app so the platform can invoke it per request (no app.listen).
// Locally: run the traditional server with start().
if (process.env.VERCEL) {
  module.exports = app;
} else {
  start();
}

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
