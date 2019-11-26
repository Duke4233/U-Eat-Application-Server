var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.loggedin) {
        res.render('restaurant', { title: 'Restaurant', email: req.session.email });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;