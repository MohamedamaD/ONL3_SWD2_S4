const { default: mongoose, Types } = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  product: { type: Types.ObjectId, ref: "Product", required: true },

  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  createAt: { type: Date, default: Date.now() },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = { Review };

// Array(5)
//   .fill("⭐")
//   .map((item, index) => <h1 key={index}>{item}</h1>);
