const express = require("express");
const mongoose = require("mongoose");
const { Product } = require("./Models/products");
const cors = require("cors");
const app = express();
const port = 5000;

mongoose
  .connect("mongodb://127.0.0.1/ECommerce")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Post new product
//Create API
app.post("/create", async (req, res) => {
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

//Get product from database
//Get API
app.get("/read", async (req, res) => {
  const productList = await Product.find();
  res.send(JSON.stringify(productList));
});

//Get a single product by id
app.get("/get/:id", async (req, res) => {
  const product_id = req.params.id;
  const product = await Product.findById(product_id);
  res.send(JSON.stringify(product));
});

//Update a product
//Put API
app.put("/update/:id", async (req, res) => {
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
app.delete("/delete/:id", async (req, res) => {
  const product_id = req.params.id;
  await Product.findByIdAndDelete(product_id);
  res.send("Product deleted!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
