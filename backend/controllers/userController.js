const User = require("../models/user");

// Get all users (for login check)
const getUsers = async (req, res) => {
  try {
    const { username, password } = req.query;
    
    if (username && password) {
      const user = await User.findOne({ username, password });
      if (user) {
        return res.json([user]);
      }
      return res.json([]);
    }
    
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user (signup)
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: "Username or email already exists" 
      });
    }

    const user = new User({
      username,
      email,
      password, // In production, hash this password
    });

    await user.save();
    res.status(201).json({ 
      message: "User created successfully",
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
};

