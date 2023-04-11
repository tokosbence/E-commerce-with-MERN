const express = require("express");
const mongoose = require("mongoose");
const { Product } = require("./Models/products");
const app = express();
const port = 5000;

mongoose
  .connect("mongodb://127.0.0.1/ECommerce")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/create", async (req, res) => {
  console.log(req.body);
  const newProduct = req.body;

  /*{
    title: "IPhone",
    description:
      "The iPhone is a high-end smartphone designed by Apple Inc. It features a sleek and stylish design, advanced camera capabilities, powerful hardware, and a user-friendly operating system.",
    price: 1236.26,
    discountPercentage: 15.36,
    rating: 4.5,
    stock: 15,
    brand: "Apple",
    category: "Smarthphone",
    thumbnail: "img link",
    images: "img link",
  };*/

  await Product.create(newProduct);
  res.send("Product saved to the database!");
});

app.get("/read", async (req, res) => {
  const productList = await Product.find();
  console.log(productList);
  res.send(JSON.stringify(productList));
});

app.put("/update/:id", async (req, res) => {
  const product_id = req.params.id;
  await Product.findByIdAndUpdate(product_id, {
    title: "IPhone",
    description:
      "The iPhone is a high-end smartphone designed by Apple Inc. It features a sleek and stylish design, advanced camera capabilities, powerful hardware, and a user-friendly operating system.",
    price: 1236.26,
    discountPercentage: 15.36,
    rating: 4.5,
    stock: 15,
    brand: "Apple",
    category: "Smarthphone",
    thumbnail: "img link",
    images: "img link",
  });

  res.send("Product updated successfully!");
});

app.delete("/delete/:id", async (req, res) => {
  const product_id = req.params.id;
  await Product.findByIdAndDelete(product_id);
  res.send("Product deleted!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
