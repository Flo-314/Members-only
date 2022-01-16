const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");

let strategy = new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }
    if (user.password !== password) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  });
});

let serializeUser = (user, done) => {
  done(null, user.id);
};
let deserializeUser = (id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
};

exports.strategy = strategy;
exports.deserializeUser = deserializeUser;
exports.serializeUser = serializeUser;
