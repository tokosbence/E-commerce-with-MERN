const express = require("express");
const mongoose = require("mongoose");
const { Order } = require("../Models/orders");
const router = express.Router();

//Post new order
//Create API
router.post("/create", async (req, res) => {
  console.log(req.body);
  const newOrder = new Order({
    userID: req.body.data.userID,
    firstName: req.body.data.firstName,
    lastName: req.body.data.lastName,
    address: req.body.data.address,
    city: req.body.data.city,
    country: req.body.data.country,
    zipCode: req.body.data.zipCode,
    totalAmount: req.body.data.totalAmount,
    items: JSON.stringify(req.body.data.items),
    createdDate: req.body.data.createdDate,
  });

  await Order.create(newOrder);
  res.send("Order saved to the database!");
});

router.get("/:userId", async (req, res) => {
  const userID = req.params.userId;
  const orderList = await Order.find({ userID: userID });
  console.log(orderList);
  res.send(orderList);
});

module.exports = router;
