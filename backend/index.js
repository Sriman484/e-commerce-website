const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");  
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db"); 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/products", (req, res, next) => {
    console.log("Route hit:", req.url);
    next();
});

app.use("/api/products", productRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));