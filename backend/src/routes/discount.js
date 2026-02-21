const express = require('express');
const { getDiscountDetails, createDiscount, updateDiscount } = require("../controllers/discountController");
const router = express.Router();

router.get("/discountdetail/:id?", getDiscountDetails);
router.post("/creatediscount", createDiscount);
router.put("/updatediscount/:id", updateDiscount);

module.exports = router;