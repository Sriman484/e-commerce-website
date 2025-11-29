const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  id: { type: Number,unique: true, required: true},
  name: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: false },
  image: { type: String, required: false },
  description: { type: String, required: false }
}, {
  strict: false
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
