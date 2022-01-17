var mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const Message = require("../models/message");
const { create } = require("../models/message");

exports.index = (req, res, next) => {
  if (req.user) {
    res.render("createPost");
  } else {
    res.redirect("/");
  }
};
exports.post = [
  body("title", "max length of a title is 75")
    .trim()
    .isLength({ max: 75, min: 1 })
    .escape(),
  body("content", "max length of a post is 500 characters")
    .trim()
    .isLength({ max: 500, min: 1 })
    .escape(),

  (req, res, next) => {
    console.log(req.body);
    console.log(req.user);

    const errors = validationResult(req);

    if (
      req.user.member_status === "member" ||
      req.user.member_status === "admin"
    ) {
      if (errors.isEmpty()) {
        const newMsg = new Message({
          title: req.body.title,
          content: req.body.content,
          user: req.user.id,
          timestamp: new Date(),
        });
        newMsg.save((err) => {
          if (err) {
            return next(err);
          }
        });
      } else {
        res.render("createPost", {
          errors: errors.array(),
        });
      }
      res.redirect("/");
    }
    else{
      res.render("createPost",{errors: [{msg: "You are not a member/admin, u are not allowed to publish any post"}]})
    }
  },
];
