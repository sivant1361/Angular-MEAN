const express = require("express");
const router = express.Router();
const Post = require("../models/post");

const checkAuth = require("../middleware/checkAuth");
const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid File Type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.post(
  "",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
      creator: req.userData.userId,
    });
    post
      .save()
      .then(() => {
        res
          .status(201)
          .json({ message: "Posts successfully added", post: post });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Creating Post failed",
        });
      });
  }
);

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let docs;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then((documents) => {
      docs = documents;
      return Post.countDocuments();
    })
    .then((count) => {
      res.status(201).json({
        message: "Posts fetched successfully",
        posts: docs,
        maxPosts: count,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Couldn't fetch posts",
      });
    });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(201).json(post);
      } else {
        res.status(404).json({ message: "No post found" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Couldn't fetch post",
      });
    });
});

router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }

    const post = {
      _id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
      creator: req.userData.userId,
    };
    Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
      .then((result) => {
        if (result.nModified > 0) {
          res.status(201).json({
            message: "Post updated successfully",
          });
        } else {
          res.status(401).json({
            message: "User is not authorized",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Couldn't update post",
        });
      });
  }
);

router.delete("/:id", checkAuth, (req, res) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then((result) => {
      if (result.n > 0) {
        res.status(201).json({
          message: "Post deleted successfully",
        });
      } else {
        res.status(401).json({
          message: "User is not authorized",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Couldn't delete post",
      });
    });
});

module.exports = router;
