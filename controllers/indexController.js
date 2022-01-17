var mongoose = require("mongoose");
const { populate } = require("../models/message");
const Post = require("../models/message");


exports.index = async (req, res, next) => {
    let posts =  await Post.find({}).populate("user")
    console.log(posts)
    res.render('index', {posts:posts});
  }