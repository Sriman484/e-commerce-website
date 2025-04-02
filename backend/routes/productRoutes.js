const express = require("express");
const { getItems, addItem } = require("../controllers/productContoller"); // ✅ Check spelling

const router = express.Router();

router.get("/", getItems); // ✅ Handles GET request for products
router.post("/", addItem); // ✅ Handles POST request for adding products

module.exports = router;
