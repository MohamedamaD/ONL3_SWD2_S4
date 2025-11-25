// Vercel
const express = require("express");
const dotenv = require("dotenv");

const { connectToDatabase } = require("./config/dbConfig");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();

const app = express();

app.use(express.json()); // parse data body
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/reviews", reviewRoutes);

const PORT = process.env.PORT || 8080;

connectToDatabase();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
