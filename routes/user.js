var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET users listing. */
router.get('/', function(req, res, next)
{
	if(true)				// if logged in redirect to the homepage(index)
	{
		res.render('index', { title: 'User', email: req.session.email });
	}
	else	
	{
		res.redirect('/login'); // not logged in redirect to login page
	}
	
	res.send('respond with a resource');
});

module.exports = router;
