var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.query("SELECT * from menu_item", function (err, result) {
    if(err) throw err;
    console.log("result:" + result);
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
