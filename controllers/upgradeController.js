var mongoose = require("mongoose");
const User = require("../models/users");
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
