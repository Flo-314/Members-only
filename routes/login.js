var express = require('express');
var router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {errors: req.flash()});
});
router.post("/",   passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
  failureFlash : true

}) )



module.exports = router;
