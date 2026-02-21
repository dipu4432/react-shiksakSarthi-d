const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonials');

// Get all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//delete testimonial

router.delete("/:id",async(req,res) => {
  try {
    const { id } = req.params;
    console.log("Id: ",id)
    if(!id){
      return res.status(400).json({
        message: "Something went wrong!",
        success: false,
      })
    }
    const deleteTestimonial =await Testimonial.findByIdAndDelete(id);
    if(!deleteTestimonial){
      return res.status(404).json({
        message: "Testimonial not found!",
        success: false,
      })
    }
    console.log("deleted testimonial: ", deleteTestimonial)
    return res.status(200).json({
      message: "Testimonial deleted successfully!",
      success: true,
    })
  } catch (err) {
    console.log("error inside of delete testimonial route: ", err);
    res.status(400).json({ message: err.message,success:false });
  }
})

// Add a new testimonial
router.post('/', async (req, res) => {
  const { profileImage, name, location, description, image } = req.body;
  const testimonial = new Testimonial({
    profileImage,
    name,
    location,
    description,
    image
  });
  try {
    const newTestimonial = await testimonial.save();
    res.status(201).json(newTestimonial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a testimonial
router.put('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(testimonial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
