const express = require('express');
const multer = require('multer');
const {
  createPost,
  updatePost,
  getAllPosts,
  getPostById,
  deletePost,
  uploadImages
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Memory storage for Cloudinary streaming
const storage = multer.memoryStorage();
const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit per file
});

// Public routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);

// Protected routes (currently auth is disabled, but middleware is in place)
router.post('/', uploadMiddleware.array('images', 10), createPost);
router.put('/:id', uploadMiddleware.array('images', 10), updatePost);
router.delete('/:id', deletePost);

// Utility route to upload images only
router.post('/upload-images', uploadMiddleware.array('images', 10), uploadImages);

module.exports = router;
