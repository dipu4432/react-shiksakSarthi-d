const Enquiry = require("../models/Enquiry");
const sendEmail = require("../utils/sendEmail");

exports.createEnquiry = async (req, res, next) => {
  try {
    const { bhk, location, name, phone, whatsapp } = req.body;

    if (!bhk || !location || !name || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // SAVE TO DB
    const enquiry = await Enquiry.create({
      bhk,
      location,
      name,
      phone,
      whatsapp,
    });

    // SEND EMAIL
    await sendEmail({
      subject: "📩 New Website Enquiry",
      html: `
        <h2>New Consultation Enquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Property:</b> ${bhk}</p>
        <p><b>Location:</b> ${location}</p>
        <p><b>WhatsApp Opt-in:</b> ${whatsapp ? "Yes" : "No"}</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      id: enquiry._id,
    });

  } catch (err) {
    next(err);
  }
};
