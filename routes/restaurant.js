var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET home page. */
router.get('/:resid', function(req, res, next)
{
    if(req.session.loggedin)
	{
		db.query("SELECT restaurant.name AS resname, menu_item.imageURL, menu_item.name, menu_item.price FROM restaurant INNER JOIN menu_item ON restaurant.id = menu_item.restaurant_id WHERE restaurant.id = ?", [req.params.resid], function(error, results, fields)
		{
			if (error)
			{
				console.log(error);
				res.redirect('/');
			} else {
				console.log(results);
				res.render('menu',
					{
						title: results[0].resname,
						loggedin: req.session.loggedin,
						username: req.session.username,
						userid: req.session.userid,
						menu_item: results
					});
			}
		});
    } else {
        res.redirect('/login');
    }
});

module.exports = router;