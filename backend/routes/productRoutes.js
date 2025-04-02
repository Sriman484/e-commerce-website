const express = require("express");
const { getItems, addItem } = require("../controllers/productContoller"); 

const router = express.Router();

router.get("/", getItems); 
router.post("/", addItem);

module.exports = router;
