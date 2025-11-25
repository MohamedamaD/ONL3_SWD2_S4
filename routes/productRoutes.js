const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { Product } = require("../models/Product");
const { roleMiddleware } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("", async (request, response) => {
  try {
    let { page = 1, limit = 10 } = request.query;

    const skip = (page - 1) * limit;

    const products = await Product.find()
      .populate("owner", "-password")
      .skip(skip)
      .limit(limit);

    const totalDocument = await Product.countDocuments();
    const totalPages = Math.ceil(totalDocument / limit);

    response.json({
      message: "All Products",
      data: { page, limit, totalPages, products },
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

router.post(
  "",
  authMiddleware,
  roleMiddleware("admin", "super_admin"),
  async (request, response) => {
    try {
      const owner = request.user.id;
      const { price, title, description } = request.body;

      const product = await Product.create({
        owner,
        price,
        title,
        description,
      });

      response
        .status(201)
        .json({ message: "Product Created Successfully", data: { product } });
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("super_admin"),
  async (request, response) => {}
);

module.exports = router;
