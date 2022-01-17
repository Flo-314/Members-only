var mongoose = require("mongoose");
const User = require("../models/users");
const Image = require("../models/image");

require("dotenv").config();
let memberPassword = process.env.MEMBER;
let adminPassword = process.env.ADMIN;

exports.index = (req, res, next) => {
  if (req.user) {
    res.render("upgrade", { user: req.user });
  } else {
    res.redirect("/");
  }
};

exports.upgradeMember = async (req, res, next) => {
  const actualUserId = req.user.id;

  if (req.body.memberpassword === memberPassword) {
    await User.updateOne(
      { _id: actualUserId },
      {
        $set: {
          member_status: "member",
        },
      }
    );
    res.redirect("/");
  } else {
    res.render("upgrade", { error: "wrong password bro" });
  }
};
exports.upgradeAdmin = async (req, res, next) => {
  const actualUserId = req.user.id;
  if (req.body.adminpassword === adminPassword) {
    await User.updateOne(
      { _id: actualUserId },
      {
        $set: {
          member_status: "admin",
        },
      }
    );

    res.redirect("/");
  } else {
    res.render("upgrade", { error: "wrong password bro" });
  }
};
exports.changePhoto = async (req, res, next) => {
  const actualUserId = req.user.id;
  let newImage = new Image({
    name: req.file.fieldname,
    desc: req.file.originalname,
    img: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
  });
  await newImage.save((err) => {
    if (err) {
      return next(err);
    }
  });
  await User.updateOne(
    { _id: actualUserId },
    {
      $set: {
        image: newImage.id,
      },
    }
  );
  res.redirect("/upgrade")
};
