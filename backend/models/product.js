const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  id: { type: Number,unique: true, required: true},
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
