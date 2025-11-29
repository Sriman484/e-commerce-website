const Item = require("../models/product");

exports.getItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const type = req.query.type;

    // Build query object
    const query = {};
    if (type && type !== 'all') {
      query.type = type;
    }

    // Use lean() to get plain JavaScript objects with all fields including type
    const items = await Item.find(query)
      .lean() // Returns plain JS objects instead of Mongoose documents
      .sort({ id: 1 })
      .skip(skip)
      .limit(limit);
    
    // Log to verify type field is present
    if (items.length > 0) {
      console.log('Sample item from DB (raw):', items[0]);
      console.log('Sample item type:', items[0].type);
      console.log('All keys:', Object.keys(items[0]));
    }

    const total = await Item.countDocuments(query); 

    res.json({
      items,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching items" });
  }
};

exports.getProductTypes = async (req, res) => {
  try {
    const types = await Item.distinct('type');
    res.json({ types: types.filter(type => type != null) });
  } catch (error) {
    res.status(500).json({ error: "Error fetching product types" });
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
