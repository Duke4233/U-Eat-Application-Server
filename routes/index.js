

var express = require('express');
var router = express.Router();

/* GET displays main search page */
router.get('/', function(req, res, next)
{
	// check to see the user is logged in
	if(req.session.loggedin)
	{
		// call to render the index page with the index.hbs and sets the string literal to the value "Yum!" 
		res.render('index',
		{
			title: 'Yum!',
			loggedin: req.session.loggedin,					//loggedin literal to the return the loggedin status
			username: req.session.username,
			userid: req.session.userid,						// userid literal
			GMapsAPIKEY: process.env.GOOGLEMAPSAPIKEY		// sets the literal so the maps key in our .env file
		});
	}
	else // if they are not logged in redirect to the login page
	{
		res.redirect('/login');
	}
});

module.exports = router;
