const router = require("express").Router();
const Post = require("../models/post");
router.get("", (req, res, next) => {
  Post.find().then((document) => {
    res.status(200).json({
      message: "Posts fetched successfully",
      posts: document,
    });
    //console.log(posts);
  });
});
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  });
});
router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,

    content: req.body.content,
  });

  post
    .save()
    .then((createdPost) => {
      res.status(201).json({
        message: "Post sent successfully",

        postId: createdPost._id,
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);

      res.status(200).json({
        message: "Post deleted",
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
});
router.patch("/:id", (req, res, next) => {
  console.log(req.body);
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  console.log(typeof req.params.id);
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Update Successful" });
  });
});
module.exports = router;
