const Item = require("../models/product");

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching items" });
  }
};

exports.addItem = async (req, res) => {
  const { name, price } = req.body;
  try {
    const newItem = new Item({ name, price });
    await newItem.save();
    res.json({ message: "Item added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error adding item" });
  }
};
