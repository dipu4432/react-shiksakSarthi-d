const express = require('express');
const multer = require('multer');
const { cloudinary } = require('../config/cloudinary');
const router = express.Router();

// Use multer memory storage for direct Cloudinary streaming
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/upload - expects a file in req.file (field name: 'image')
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }
    // Upload buffer directly to Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'testimonials' },
      (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Cloudinary upload failed', error: error.message });
        }
        res.json({ url: result.secure_url });
      }
    );
    stream.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ message: 'Cloudinary upload failed', error: err.message });
  }
});

module.exports = router;
