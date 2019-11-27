var express = require('express');
var router = express.Router();
var db = require('../database');

/*db.query("SELECT * from menu_item", function (err, result) {
        if(err) throw err;
        console.log("result:" + result);
    });*/

/* GET home page. */
router.get('/', function(req, res, next) {
  if(true) {
    res.render('index', {
      title: 'Yum!',
      loggedin: req.session.loggedin,
      username: req.session.username,
      userid: req.session.userid,
      GMapsAPIKEY: process.env.GOOGLEMAPSAPIKEY
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
