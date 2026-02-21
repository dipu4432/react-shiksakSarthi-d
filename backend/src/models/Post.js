const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    trim: true
  },
  images: [{
    url: { type: String, required: true },
    public_id: { type: String }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true  // creates createdAt and updatedAt automatically
});

// Index for faster queries
postSchema.index({ createdAt: -1 });
postSchema.index({ isActive: 1 });

module.exports = mongoose.model('Post', postSchema);
