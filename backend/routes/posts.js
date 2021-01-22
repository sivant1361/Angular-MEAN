const express = require("express");
const router = express.Router();
const Post = require("../models/post")

router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  res.status(201).json({ message: "Posts successfully added",post: post});
});

router.get("", (req, res, next) => {
  Post.find().then((docs) => {
    res.status(201).json({
      message: "Posts fetched successfully",
      posts: docs,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if(post){
      res.status(201).json(post);
    }else{
      res.status(404).json({message: "No post found"});
    }
  });
});

router.put("/:id", (req, res) => {
  const post={
    _id:req.params.id,
    title: req.body.title,
    content: req.body.content
  }
  Post.updateOne({ _id:req.params.id},post).then((result) => {
    res.status(201).json({
      message: "Post updated successfully",
    });
  });
});

router.delete("/:id", (req, res) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(201).json({
      message: "Post deleted successfully",
    });
  });
});

module.exports=router;
