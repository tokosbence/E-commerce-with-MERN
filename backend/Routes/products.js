const express = require("express");
const mongoose = require("mongoose");
const { Product } = require("../Models/products");
const router = express.Router();

//Get products from database
//Get API
router.get("/", async (req, res) => {
  const productList = await Product.find();
  res.send(JSON.stringify(productList));
});

//Get a single product by id
router.get("/:id", async (req, res) => {
  const product_id = req.params.id;
  const product = await Product.findById(product_id);
  res.send(JSON.stringify(product));
});

//Post new product
//Create API
router.post("/create", async (req, res) => {
  const newProduct = new Product({
    title: req.body.data.title,
    description: req.body.data.description,
    price: req.body.data.price,
    discountPercentage: req.body.data.discountPercentage,
    rating: req.body.data.rating,
    stock: req.body.data.stock,
    brand: req.body.data.brand,
    category: req.body.data.category,
    thumbnail: req.body.data.thumbnail,
    images: req.body.data.images,
  });

  await Product.create(newProduct);
  res.send("Product saved to the database!");
});

//Update a product
//Put API
router.put("/update/:id", async (req, res) => {
  const product_id = req.params.id;
  await Product.findByIdAndUpdate(product_id, {
    title: req.body.data.title,
    description: req.body.data.description,
    price: req.body.data.price,
    discountPercentage: req.body.data.discountPercentage,
    rating: req.body.data.rating,
    stock: req.body.data.stock,
    brand: req.body.data.brand,
    category: req.body.data.category,
    thumbnail: req.body.data.thumbnail,
    images: req.body.data.images,
  });

  res.send("Product updated successfully!");
});

//Delete a product
//Delete API
router.delete("/delete/:id", async (req, res) => {
  const product_id = req.params.id;
  await Product.findByIdAndDelete(product_id);
  res.send("Product deleted!");
});

module.exports = router;
