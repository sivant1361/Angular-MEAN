const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const Post = require("./models/post");

mongoose
  .connect(
    "mongodb+srv://king:9994532266@node-netninja.4r9my.mongodb.net/posts",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Connected failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,PATCH,DELETE"
  );
  next();
});

app.post("/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  res.status(201).json({ message: "Posts successfully added",post: post});
});

app.get("/posts", (req, res, next) => {
  Post.find().then((docs) => {
    res.status(201).json({
      message: "Posts fetched successfully",
      posts: docs,
    });
  });
});

app.delete("/posts/:id", (req, res) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(201).json({
      message: "Post deleted successfully",
    });
  });
});

module.exports = app;
