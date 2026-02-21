const Offer = require('../models/Discount')

exports.getDiscountDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const discount = id
      ? await Offer.findById(id)
      : await Offer.findOne().sort({ createdAt: -1 });

    if (!discount) {
      return res.status(404).json({
        message: "Discount not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Discount details fetched successfully!",
      success: true,
      discountDetails: discount,
    });
  } catch (error) {
    console.log("Error inside of the getdiscountController: ", error);
    return res.status(500).json({
      message: error?.response?.data?.message || error.message || "Internal Server Error",
      success: false,
    });
  }
};

exports.createDiscount = async (req, res) => {
  try {
    const { discount, validity } = req.body;
    if (!discount || !validity) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    const newDiscount = await Offer.create({
      discount,
      validity,
    });

    return res.status(201).json({
      message: "New discount created!",
      success: true,
      newDiscount: newDiscount,
    });
  } catch (error) {
    console.log("Error inside of createDiscount: ", error);
    return res.status(500).json({
      message: error?.response?.data?.message || error.message || "Internal Server Error",
      success: false,
    });
  }
};

exports.updateDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    const { discount, validity } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Discount id is required!",
        success: false,
      });
    }

    if (!discount && !validity) {
      return res.status(400).json({
        message: "At least one field is required!",
        success: false,
      });
    }

    const updateDoc = {};
    if (discount) updateDoc.discount = discount;
    if (validity) updateDoc.validity = validity;

    const updatedDiscount = await Offer.findByIdAndUpdate(
      id,
      updateDoc,
      { new: true, runValidators: true }
    );

    if (!updatedDiscount) {
      return res.status(404).json({
        message: "Discount post doesn't exist!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Discount updated successfully",
      success: true,
      updatedDiscount: updatedDiscount,
    });
  } catch (error) {
    console.log("Error inside of update controller: " + error);
    return res.status(500).json({
      message: error?.response?.data?.message || error.message || "Internal Server Error",
      success: false,
    });
  }
};

