const jwt = require("jsonwebtoken");
// const employee = require("../Models/employee");
const user = require("../models/userSchema.js");

//guard
module.exports.verifyUser = function (req, res, next) {
  try {
    if (!req.headers.authorization) {
      res.json({
        message: "No token",
      });
    } else {
      const token = req.headers.authorization.split(" ")[1];
      const data = jwt.verify(token, "computerBuild");
      user
        .findOne({ _id: data.YourID })
        .then(function (result) {
          if (result) {
            if (result.usertype === "user") {
              req.userdata = result;
              next();
            } else {
              res.json({
                message: "Unauthorized",
              });
            }
          } else {
            res.json({
              message: "usernot found",
            });
          }
        })
        .catch(function (e) {
          console.log(e);
          res.json({
            message: "something went wrong",
          });
        });
    }
  } catch (e) {
    console.log(e);
    res.status(401).json({ error: e });
  }
};

module.exports.verifyAdmin = function (req, res, next) {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      res.json({
        message: "No token",
      });
    } else {
      const data = jwt.verify(token, "computerBuild");
      user
        .findOne({ _id: data.YourID })
        .then(function (result) {
          if (result) {
            if (result.usertype === "admin") {
              req.userdata = result;

              next();
            } else {
              res.json({
                message: "User not authorized",
              });
            }
          } else {
            res.json({
              message: "User not found",
            });
          }
        })
        .catch(function (e) {
          console.log(e);
          res.json({
            message: "Something went wrong",
          });
        });
    }
  } catch (e) {
    console.log(e);
    res.status(401).json({ error: e });
  }
};
