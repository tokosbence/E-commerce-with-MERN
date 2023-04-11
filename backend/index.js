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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
