var mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const User = require("../models/users");
var bcrypt = require("bcryptjs");

exports.index = (req, res, next) => {
  res.render("singup");
};
exports.post = [
  body("name", "MIN FULL NAME LENGTH IS 4.")
    .trim()
    .isLength({ min: 4 })
    .escape(),
  body("email", "PLEASE INTRODUCE A VALID EMAIL")
    .trim()
    .isLength({ min: 8 })
    .escape(),
  body("username", "MIN USERNAME LENGTH IS 4")
    .trim()
    .isLength({ min: 4 })
    .escape(),
  body("password", "MIN PASSWORD LENGTH IS 8")
    .trim()
    .isLength({ min: 8 })
    .escape(),
  body(
    "confpassword",
    "password Confirmation field must have the same value as the password field"
  )
    .exists()
    .custom((value, { req }) => value === req.body.password),

  async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      let userUsername = await User.find({ username: req.body.username });
      let userEmail = await User.find({ email: req.body.email });

      if (userEmail.length === 0 && userUsername.length === 0) {
        //if everything is ok
        let salt = bcrypt.genSaltSync(10);
        let password = bcrypt.hashSync(req.body.password, salt);
        let username = bcrypt.hashSync(req.body.username, salt);

        newUser = new User({
          name: req.body.name,
          email: req.body.email,
          username: username,
          password: password,
          member_status: "user",
        });

        newUser.save((err) => {
          if (err) {
            return next(err);
          }
        });
      }
      //si ya ESTA usado el mail o el username
      else {
        res.render("singup", {
          errors: [{ msg: "username or email is already used " }],
        });
      }
    }
    //if validation error
    res.render("singup", { errors: errors.array() });
  },
];
