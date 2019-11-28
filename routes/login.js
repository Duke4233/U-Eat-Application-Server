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

router.post('/', function(req, res)
{
    const email = req.body.email;
    const password = req.body.password;
	
    if(email && password)
	{
        db.query('SELECT * FROM account WHERE email = ? and password = ?', [email, password], function(err, results, fields)
		{
			if(results.length > 0)
			{
				req.session.loggedin = true;
				req.session.userid = results[0].id;
				req.session.username = results[0].username;
				res.redirect('/');
			} else
			{
				res.render('login',
				{
					title: 'Incorrect Email or Password'
				});
			}
        });
    }
	else
	{
        res.render('login',
		{
			title: 'Enter Email and Password'
		});
    }
});

router.get('/logout', function (req, res)
{
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;