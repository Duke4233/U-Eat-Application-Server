var express = require('express');
var router = express.Router();
var db = require('../database');
var mysql = require('mysql');

/* GET home page. */
router.get('/:resid', function(req, res, next)
{
    if(req.session.loggedin)
	{
		db.query("SELECT restaurant.name AS resname, restaurant.id AS resid, menu_item.imageURL, menu_item.name, menu_item.price " +
			"FROM restaurant LEFT JOIN menu_item ON restaurant.id = menu_item.restaurant_id " +
			"WHERE restaurant.id = ?;" +
			"SELECT restaurant.name AS resname, restaurant.id AS resid,account.username, review.rating, review.review " +
			"FROM restaurant JOIN review on restaurant.id = review.restaurant_id JOIN account on account.id = review.account_id " +
			"WHERE restaurant.id = ?",
			[req.params.resid, req.params.resid], function(error, results, fields)
		{
			if (error)
			{
				res.redirect('/');
			} else {
				console.log(results[0][0]);
				res.render('menu',
					{
						title: results[0][0].resname,
						resid: req.params.resid,
						loggedin: req.session.loggedin,
						username: req.session.username,
						userid: req.session.userid,
						menu_item: results[0],
						review: results[1]
					});
			}
		});
    } else {
        res.redirect('/login');
    }
});

router.post('/review', function (req, res, next) {
	db.query("INSERT INTO review (restaurant_id, account_id, rating, review) values (?,?,?,?)",
		[req.body.rid, req.body.aid, req.body.rating, req.body.review],
		function (error, result) {
			if (error!=null) {
				console.log(error);
				res.send({"status": 500, "error": error, "response": null});
			} else {
				res.send({"status": 200, "error": null, "response": result});
			}
	});
});

module.exports = router;