const Item = require("../models/product");

exports.getItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const items = await Item.find({}, 'id name price image')
      .sort({ id: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Item.countDocuments(); 

    res.json({
      items,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching items" });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const productId = Number(req.params.id);  
    const product = await Item.findOne({ id: productId }); 
    if (!product) {
      console.log("Product not found");  
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);  
    res.status(500).json({ message: "Server error" });
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
