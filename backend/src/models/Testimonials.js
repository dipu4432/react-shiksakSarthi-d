const mongoose = require('mongoose');

const testimonialsSchema = new mongoose.Schema({
  profileImage: {
    type: String,
  },
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type:String
  }
})

const Testimonial = mongoose.model("Testimonial", testimonialsSchema);

module.exports = Testimonial;