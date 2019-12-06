var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET home page. */
router.get('/', function(req, res, next)
{ 
    res.render('login',
	{
		title: 'U Eat Login'
	});
});
// a post function
router.post('/', function(req, res)
{
    const email = req.body.email;					// requires the email of the user to login
    const password = req.body.password;				// requires the password to login
	// checks if both email and password are entered
    if(email && password)
	{
        db.query('SELECT * FROM account WHERE email = ? and password = ?', [email, password], function(err, results, fields) 	// Selectes all of the emails and passwords 
        																														// that are equal to the inputted email and password 
		{
			if(results.length > 0) 								// if the query returns anything then that information is one of the already created accounts
			{
				req.session.loggedin = true;					// sets the sessino variables to loggedin
				req.session.userid = results[0].id;				// sets the userid
				req.session.username = results[0].username;		// sets the literal for username
				res.redirect('/');								// redirects to the homepage(index)
			} else {
				res.render('login', 							// if nothing was returned then we inform the user, and prompt again
				{
					title: 'Incorrect Email or Password'
				});
			}
        });
    } else {
        res.render('login', 									// else they have not not entered a email and password so prompt them to enter one
		{
			title: 'Enter Email and Password'
		});
    }
});
// 
router.get('/logout', function (req, res)
{
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;