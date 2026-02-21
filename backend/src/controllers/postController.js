const { cloudinary } = require('../config/cloudinary');
const Post = require('../models/Post');

// Helper function to upload a single file to Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'siksha/posts' },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          public_id: result.public_id
        });
      }
    );
    stream.end(file.buffer);
  });
};

// Helper function to delete image from Cloudinary
const deleteFromCloudinary = async (public_id) => {
  try {
    if (public_id) {
      await cloudinary.uploader.destroy(public_id);
    }
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error.message);
  }
};

// Create a new post with multiple images
exports.createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Upload all images to Cloudinary
    const images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadResult = await uploadToCloudinary(file);
        images.push(uploadResult);
      }
    }

    // Create post in database
    const post = await Post.create({
      title,
      content,
      images,
      createdBy: req.user ? req.user.id : undefined
    });

    return res.status(201).json({
      success: true,
      data: post
    });
  } catch (err) {
    console.error('Create post error:', err.message);
    next(err);
  }
};

// Update an existing post
exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, existingImages } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Parse existing images (sent as JSON string from frontend)
    let keepImages = [];
    if (existingImages) {
      try {
        keepImages = JSON.parse(existingImages);
      } catch (e) {
        keepImages = [];
      }
    }

    // Find images to delete (ones that were in post but not in keepImages)
    const keepPublicIds = keepImages.map(img => img.public_id);
    const imagesToDelete = post.images.filter(img => !keepPublicIds.includes(img.public_id));

    // Delete removed images from Cloudinary
    for (const img of imagesToDelete) {
      await deleteFromCloudinary(img.public_id);
    }

    // Upload new images
    const newImages = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadResult = await uploadToCloudinary(file);
        newImages.push(uploadResult);
      }
    }

    // Combine existing images (that user wants to keep) with new uploads
    const finalImages = [...keepImages, ...newImages];

    // Update post fields
    post.title = title || post.title;
    post.content = content !== undefined ? content : post.content;
    post.images = finalImages;

    await post.save();

    return res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    console.error('Update post error:', err.message);
    next(err);
  }
};

// Get all posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, active } = req.query;

    const filter = {};
    if (active !== undefined) {
      filter.isActive = active === 'true';
    }

    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean();

    const total = await Post.countDocuments(filter);

    return res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('Get all posts error:', err.message);
    next(err);
  }
};

// Get single post by ID
exports.getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).lean();

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    console.error('Get post by ID error:', err.message);
    next(err);
  }
};

// Delete a post
exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Delete all images from Cloudinary
    for (const img of post.images) {
      await deleteFromCloudinary(img.public_id);
    }

    await Post.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (err) {
    console.error('Delete post error:', err.message);
    next(err);
  }
};

// Upload multiple images and return URLs (utility endpoint)
exports.uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const images = [];
    for (const file of req.files) {
      const uploadResult = await uploadToCloudinary(file);
      images.push(uploadResult);
    }

    return res.status(201).json({
      success: true,
      data: images
    });
  } catch (err) {
    console.error('Upload images error:', err.message);
    next(err);
  }
};
