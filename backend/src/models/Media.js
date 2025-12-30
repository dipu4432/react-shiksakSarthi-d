const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['kitchen', 'bedroom', 'livingroom', 'wardrobe', 'others'],
    index: true
  },
  description: { type: String },
  public_id: { type: String },
  format: { type: String },
  resource_type: { type: String },
  bytes: { type: Number },
  width: { type: Number },
  height: { type: Number },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
},
{ timestamps: true }  // creates createdAt
);

module.exports = mongoose.model('Media', mediaSchema);
