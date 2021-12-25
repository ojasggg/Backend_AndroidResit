const express = require("express");
const itemModel = require("../models/itemSchema.js");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/product/insert", auth.verifyAdmin, function (req, res) {
  console.log(req.body);

  const itemType = req.body.itemType;
  const itemPrice = req.body.itemPrice;
  const itemCategory = req.body.itemCategory;
  const itemDescription = req.body.itemDescription;

  try {
    const data = new itemModel({
      userID: req.userdata._id,
      itemType: itemType,
      itemPrice: itemPrice,
      itemCategory: itemCategory,
      itemDescription: itemDescription,
    });
    data.save();
    console.log(item);
    res.json({
      data: job,
      messsage: "Item inserted",
    });
  } catch (e) {
    res.json({
      message: "error" + e,
    });
  }
});

router.put("/item/update", async function (req, res) {
  try {
    const data = await itemModel.updateOne(
      { _id: req.body.id },
      {
        itemType: req.body.itemType,
        itemPrice: req.body.itemPrice,
        itemCategory: req.body.itemCategory,
      }
    );
    res.json({
      success: true,
      data: data,
      message: "Item Updated",
    });
    console.log("product updated");
  } catch (e) {
    res.json({
      message: "error" + e,
    });
  }
});

router.get("/show/items", function (req, res) {
  itemModel
    .find()
    .then(function (data) {
      res.status(201).json({
        success: true,
        data: data,
        message: "Displayed Items Successfully!!!",
      });
    })

    .catch(function () {
      res.status(500).json({ message: "Error occured." });
    });
});

// id ko base mah single data display garna ko lagi
router.get("/updateSingle/items/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  itemModel
    .findById(id)
    .then(function (data) {
      res.status(200).json({ success: true, data: data });
    })

    .catch(function () {
      res.status(500).json({ message: "Error occured." });
    });
});

router.post("/search/items", async function (req, res) {
  try {
    const items = await itemModel.find({
      itemCategory: req.body.itemCategory,
      itemType: req.body.itemType,
    });
    console.log("Updated");
    res.json({
      success: true,
      data: items,
      message: "Updated",
    });
  } catch (error) {
    res.status(500).json({ message: "Error occured." });
  }
});
router.delete("/item/delete/:id", async function (req, res) {
  const id = req.params.id;
  console.log(id);
  const deleteItems = await itemModel.deleteOne({ _id: id });
  res.json({ message: "succesfully deleted", data: deleteItems });
});

module.exports = router;
