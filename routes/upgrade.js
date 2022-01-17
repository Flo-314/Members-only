var express = require('express');
var router = express.Router();
var controller = require("../controllers/upgradeController")


/* GET home page. */
router.get('/', controller.index);
router.post("/upgradeMember", controller.upgradeMember)
router.post("/upgradeAdmin",controller.upgradeAdmin)


module.exports = router;
