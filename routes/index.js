var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user/login');
});

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('user/registerUser');
});


module.exports = router;
