var express = require('express');
var router = express.Router();
var controller = require("../controllers/signupController")
const multer  = require('multer')
const upload = multer()

/* GET home page. */
router.get('/', controller.index);
router.post('/', upload.single("profilePhoto"),controller.post);



module.exports = router;
