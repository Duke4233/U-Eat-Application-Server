var express = require('express');
var router = express.Router();

/* GET displays main search page */
router.get('/', function(req, res, next)
{
	if(req.session.loggedin)
	{
		res.render('index',
		{
			title: 'Yum!',
			loggedin: req.session.loggedin,
			username: req.session.username,
			userid: req.session.userid,
			GMapsAPIKEY: process.env.GOOGLEMAPSAPIKEY
		});
	}
	else
	{
		res.redirect('/login');
	}
});

module.exports = router;
