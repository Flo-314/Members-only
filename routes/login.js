var express = require('express');
var router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {user: req.user});
});
router.post("/",   passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/"
}) )



module.exports = router;
