const express = require("express");
const { getItems, addItem, getItemById, getProductTypes } = require("../controllers/productContoller");

const router = express.Router();

router.get("/types", getProductTypes);
router.get("/", getItems);
router.post("/", addItem);
router.get("/:id", getItemById);

module.exports = router;