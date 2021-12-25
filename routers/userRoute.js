const express = require("express");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.js");
const upload = require("../middleware/fileupload");
const { single } = require("../middleware/fileupload");

const router = new express.Router();

// to register employeee

router.post("/user/register", async function (req, res) {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const location = req.body.location;
  const phonenumber = req.body.phonenumber;
  const usertype = req.body.usertype;
  const isRegistered = await User.findOne({ username: username });

  console.log(isRegistered);
  if (isRegistered == null) {
    bcrypt.hash(password, 10, function (err, hash) {
      console.log(hash);
      const user = new User({
        username: username,
        password: hash,
        email: email,
        phonenumber: phonenumber,
        location: location,
        usertype: usertype,
      });
      user
        .save()
        .then(function () {
          res.status(201).json({
            success: true,
            data: user,
            message: "Regisered Successfully!!!",
          });
          console.log("register");
        })

        .catch(function (e) {
          console.log(e);
          res.status(500).json({ message: "Error occured." });
        });
    });
  } else {
    res.status(201).json({
      success: false,
      message: "Regisered failed!!!",
    });
  }
});

// login system

router.post("/user/login", function (req, res) {
  console.log(req.body);

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username })
    .then(function (userdata) {
      console.log(userdata);

      if (userdata === null) {
        return res.status(403).json({ message: "Invalid login credential" });
      }
      // for valid user
      bcrypt.compare(password, userdata.password, function (err, result) {
        if (result === false) {
          return res.status(403).json({ message: "invalid password" });
        }

        console.log("login succesfull");

        const token = jwt.sign({ YourID: userdata._id }, "computerBuild");
        res.status(200).json({
          success: true,
          token: token,
          usertype: userdata.usertype,
          data: userdata,
          message: "Authentication success",
        });
      });
    })

    .catch(function (e) {
      console.log(e);
    });
});

router.put(
  "/profile/upload",
  auth.verifyUser,
  upload.single("profile_pic"),
  function (req, res) {
    const profile_pic = req.file.filename;
    const id = req.userdata._id;
    User.findByIdAndUpdate(
      { _id: id },
      {
        profile_pic: profile_pic,
      }
    )

      .then(function (data) {
        res.status(200).json({ success: true, data });
        console.log("Updated?");
      })
      .catch(function (e) {
        res.status(500).json({ message: e });
      });
  }
);

router.get("/user/get", auth.verifyUser, function (req, res) {
  User.find({ usertype: "user" })

    .then(function (data) {
      res.status(201).json({
        success: true,
        data: data,
        message: "User shown Successfully!!!",
      });
    })

    .catch(function () {
      res.status(500).json({ message: "Error occured." });
    });
});

router.get("/get/loginUser", auth.verifyUser, function (req, res) {
  const id = req.userdata._id;

  User.findById(id)

    .then(function (data) {
      res.status(201).json({
        success: true,
        singleData: data,
        message: "User Shown Successfully",
      });
    })

    .catch(function () {
      res.status(500).json({ message: "Error occured." });
    });
});

router.get("/display/register_user/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  User.findById(id)
    .then(function (data) {
      res.status(200).json(data);
    })

    .catch(function () {
      res.status(500).json({ message: "Error occured." });
    });
});

router.put("/user/update", auth.verifyUser, async function (req, res) {
  try {
    console.log(req.body);
    const data = await User.updateOne(
      { _id: req.userdata._id },
      {
        phonenumber: req.body.phonenumber,
        location: req.body.location,
        userBio: req.body.userBio,
        username: req.body.username,
      }
    );
    res.json({
      success: true,
      singleData: data,
      message: "completed",
    });
    console.log("product updated");
  } catch (e) {
    res.json({
      message: "error" + e,
    });
  }
});

router.get("/updateSingle/userwith/:id", auth.verifyUser, function (req, res) {
  const id = req.params.id;
  console.log(id);
  User.findById(id)
    .then(function (data) {
      res.status(200).json(data);
    })

    .catch(function () {
      res.status(500).json({ message: "Error occured." });
    });
});

router.get("/updateSingle/user", auth.verifyUser, function (req, res) {
  const id = req.userdata._id; ///req.userdata mah chai login garyeko user ko data basyeko hunxa yo auth bata aauxa
  console.log(id);
  User.findById(id)
    .then(function (data) {
      res.status(200).json({
        success: true,
        singleData: data,
        message: "succesfully updated",
      });
    })

    .catch(function () {
      res.status(500).json({ message: "Error occured." });
    });
});

module.exports = router;
