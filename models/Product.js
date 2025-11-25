const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  //   sku: String,

  //   tags: [String],

  // keep track owner => Product
  owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
