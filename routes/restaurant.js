var express = require('express');
var router = express.Router();
var db = require('../database');
var mysql = require('mysql');

/* GET home page. */
router.get('/:resid', function(req, res, next)
{
    if(req.session.loggedin)
	{
		db.query("SELECT restaurant.name AS resname, menu_item.imageURL, menu_item.name, menu_item.price, NULL AS username, NULL AS rating, NULL AS review " +
			"FROM restaurant INNER JOIN menu_item ON restaurant.id = menu_item.restaurant_id " +
			"WHERE restaurant.id = ? " +
			"UNION " +
			"SELECT restaurant.name AS resname, NULL AS imageURL, NULL AS name, NULL AS price,account.username, review.rating, review.review " +
			"FROM restaurant JOIN review on restaurant.id = review.restaurant_id JOIN account on account.id = review.account_id " +
			"WHERE restaurant.id = ?",
			[req.params.resid, req.params.resid], function(error, results, fields)
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

router.post('/:resid/review', function (req, res, next) {

});

module.exports = router;