const express = require('express');
const multer = require('multer');
const { upload, list, listCloudinary, delete: deleteMedia, replace } = require('../controllers/mediaController');
const { updateTitle } = require('../controllers/updateMediaTitle');
// Update only the title/description of a media item
const router = express.Router();
router.put('/update-title/:id', updateTitle);



// memory storage so we can stream to Cloudinary
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Replace an image by MongoDB _id
router.put('/replace/:id', uploadMiddleware.single('file'), replace);

const { protect } = require('../middleware/auth');
// Require authentication for uploads
router.post('/upload', uploadMiddleware.array('file', 10), upload);
// Frontend should use this (MongoDB + description )
router.get('/', list);
router.get('/cloudinary', listCloudinary);

// Delete media by id
router.delete('/', deleteMedia);

module.exports = router;
