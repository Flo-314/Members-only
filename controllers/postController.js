var mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const Message = require("../models/message");

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

    if (errors.isEmpty() && req.user) {
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
    }
    else{
        res.render("createPost", {
            errors: errors.array(),
          });
    }
    res.redirect("/")
  },
];
