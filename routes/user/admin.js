var express = require("express");
var router = express.Router();
var adminController = require("../../controller/user/admin");
const authenticate = require("../../controller/shared/authenticate");
/* GET users listing. */
router.post("/register",adminController.addAdmin);


module.exports = router;
