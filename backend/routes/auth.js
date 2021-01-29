const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({ message: "User created", result: result });
      })
      .catch((err) => {
        res.status(500).json({ err: err });
      });
  });
});

router.post("/login", (req, res) => {
  let fetchUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth Failed",
        });
      }
      fetchUser=user
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth Failed",
        });
      }
      const token = jwt.sign(
        { email: fetchUser.email, userId: fetchUser._id },
        "iam-not-gonna-tell-what-the-password-is",
        {
          expiresIn: "1h",
        }
      );
      res.status(201).json({
        token: token,
        message:"Authentication successful"
      })
    })
    .catch((err) => {
      res.status(401).json({
        message: "Auth Failed",
      });
    });
});

module.exports = router;
