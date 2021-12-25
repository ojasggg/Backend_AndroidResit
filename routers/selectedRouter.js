const express = require("express");

const itemModel = require("../models/itemSchema.js");
const Selected = require("../models/selectedSchema.js");
const User = require("../models/userSchema.js");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/item/selectedItem/:id", auth.verifyUser, function (req, res) {
  //yeha id vanyeko job id ho
  const userid = req.userdata._id;
  const itemid = req.params.id;
  console.log(userid);

  const itemData = new Selected({
    userid: userid,
    itemid: itemid,
  });

  itemData
    .save()
    // .populate("userid")

    .then(function (data) {
      res.status(201).json({ success: true, data });
      console.log("doneeeeeeeeeeeee");
    })
    .catch(function (err) {
      res.status(500).json({ message: err });
    });
});

router.delete("/delete/selectedItem/:id", auth.verifyUser, function (req, res) {
  const id = req.params.id;

  Selected.deleteOne({
    _id: id,
  })
    .then(function (data) {
      res.status(200).json({ data, message: "deleted" });
      console.log("deleted successfully");
    })
    .catch(function (e) {
      res.status(500).json({ message: e });
    });
});

router.get("/show/selected", auth.verifyUser, function (req, res) {
  const userid = req.userdata._id;
  Selected.find({
    userid: userid,
  })
    .populate("itemid")

    .then(function (data) {
      res.status(200).json({ data: data, success: true });

      console.log("Selected item is " + data);
    })
    .catch(function (e) {
      res.status(500).json({ message: e });
      console.log("error" + e);
    });
});

router.get("/showmy/selected", auth.verifyUser, function (req, res) {
  const userid = req.userdata._id;
  var arr = [];
  Selected.find({
    userid: userid,
  })
    .populate("userid")
    .populate("itemid")
    .then(function (data) {
      data.map((data) => {
        arr.push({
          _id: data._id,
          itemDescription: data.itemid.itemDescription,
          itemType: data.itemid.itemType,
          itemSalary: data.itemid.itemPrice,
        });
      });
      res.status(200).json({ success: true, data: arr });
      // console.log("applied is "+data.userid);
    })
    .catch(function (e) {
      res.status(500).json({ message: e });
    });
});

// employer ko lagi koskosle apply garyo herna
router.get("/show/whoselected/:id", auth.verifyAdmin, function (req, res) {
  const itemid = req.params.id;
  const userid = req.userdata._id;
  Selected.find({
    itemid: itemid,
  })
    .populate("userid")
    .populate("itemid")
    .then(function (data) {
      res.status(200).json(data);
      //console.log("applied is " + data);
    })
    .catch(function (e) {
      res.status(500).json({ message: e });
    });
});

module.exports = router;
