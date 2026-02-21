const mongoose = require("mongoose");
const discountSchema = new mongoose.Schema({
  discount: {
    type: String,
    required: true,
  },
  validity: {
    type: String,
    required: true,
  }
}, { timestamps: true })


module.exports = mongoose.model("Offer", discountSchema);