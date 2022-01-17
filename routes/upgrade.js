var express = require('express');
var router = express.Router();
var controller = require("../controllers/upgradeController")
const multer  = require('multer')
const upload = multer()


/* GET home page. */
router.get('/', controller.index);
router.post("/upgradeMember", controller.upgradeMember)
router.post("/upgradeAdmin",controller.upgradeAdmin)
router.post("/changePhoto", upload.single("profilePhoto"), controller.changePhoto)

module.exports = router;
