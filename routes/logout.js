var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.user) {
    req.logout();
  }
  res.redirect("/");
});

module.exports = router;
