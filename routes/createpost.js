var express = require('express');
var router = express.Router();
var controller = require("../controllers/postController")


/* GET home page. */
router.get('/', controller.index);
router.post('/',controller.post);






module.exports = router;
