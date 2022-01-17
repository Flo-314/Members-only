var mongoose = require("mongoose");
const { populate } = require("../models/message");
const Post = require("../models/message");

exports.index = async (req, res, next) => {
  let posts = await Post.find({}).populate("user");

  res.render("index", { posts: posts, user: req.user });
};

exports.post = async (req, res, next) => {
  if (req.user.member_status === "admin") {
    await Post.findByIdAndRemove({ _id: req.body.postid });
    let posts = await Post.find({}).populate("user");
    res.render("index", { posts: posts, user: req.user });
  }
};
