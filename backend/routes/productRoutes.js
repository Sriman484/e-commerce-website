const express = require("express");
const { getItems, addItem, getItemById } = require("../controllers/productContoller");

const router = express.Router();

router.get("/", getItems);
router.post("/", addItem);
router.get("/:id", getItemById);

module.exports = router;