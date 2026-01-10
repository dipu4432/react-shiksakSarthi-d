const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    bhk: String,
    location: String,
    name: String,
    phone: String,
    whatsapp: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
