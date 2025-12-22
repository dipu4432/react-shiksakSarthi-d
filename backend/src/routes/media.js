const express = require('express');
const multer = require('multer');
const { upload, list, listCloudinary, delete: deleteMedia } = require('../controllers/mediaController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// memory storage so we can stream to Cloudinary
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Require authentication for uploads
router.post('/upload', protect, uploadMiddleware.array('file', 10), upload);
// Frontend should use this (MongoDB + description )
router.get('/', list);
router.get('/cloudinary', listCloudinary);

// Delete media by id (protected)
router.delete('/:id', protect, deleteMedia);

module.exports = router;
