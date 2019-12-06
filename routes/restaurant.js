var express = require('express');
var router = express.Router();
var db = require('../database');		// The database is used so we must have the database that is referenced in the .env
var mysql = require('mysql');			// mysql is required

/* GET home page. */
router.get('/:resid', function(req, res, next)			//  gets the restaurant id and stores in resid
{
    if(req.session.loggedin)			// if we are loggedin then we render hte homepage for the selected restaurant
	{ // this query gets the name, id, menu items(name,image,price) from the selected restaurant and returns them and places pass them to results to be used later
		db.query("SELECT restaurant.name AS resname, restaurant.id AS resid, menu_item.imageURL, menu_item.name, menu_item.price " +
			"FROM restaurant LEFT JOIN menu_item ON restaurant.id = menu_item.restaurant_id " +
			"WHERE restaurant.id = ?;" +
			"SELECT restaurant.name AS resname, restaurant.id AS resid, account.username, date_format(review.reviewdate, '%m/%d/%Y %T') as reviewdate, review.rating, review.review " +
			"FROM restaurant JOIN review on restaurant.id = review.restaurant_id JOIN account on account.id = review.account_id " +
			"WHERE restaurant.id = ?",												//gets the reviews for the selected restaurant with the other restraurant information
			[req.params.resid, req.params.resid], function(error, results, fields) 	// the req.params.resid allow for the expansion of '?' into the restaurant id which is used to get only the selected restaurant
		{
			if (error) // if there was an error redirect to index
			{
				res.redirect('/');
			} else {
				console.log(results[0][0]); 					// else write the results to the console.log file
				res.render('menu', 								// renders the menu.hbs is view
					{
						title: results[0][0].resname,			// the restaurant name is stores in the title literal
						resid: req.params.resid,				// id is stored in resid
						loggedin: req.session.loggedin,			// logged in status
						username: req.session.username,			// username
						userid: req.session.userid,				// user id
						menu_item: results[0],					// all of the menu_items and their attributes
						review: results[1]						// the reviews that are returned from the query for the selected restaurant
					});
			}
		});
    } else {
        res.redirect('/login'); // not logged in redirect to loggin page
    }
});
// allows for the creation of a new review 
router.post('/review', function (req, res, next) {
	db.query("INSERT INTO review (restaurant_id, account_id, rating, review) values (?,?,?,?)", // inserts the new reivew into the restaurant
		[req.body.rid, req.body.aid, req.body.rating, req.body.review],				// requires the information for the insert to work
		function (error, result) {
			if (error!=null) {						// if the insertion did not work then write error and send erroe information
				console.log(error);
				res.send({"status": 500, "error": error, "response": null});	
			} else {
				res.send({"status": 200, "error": null, "response": result}); // else it worked
			}
	});
});

module.exports = router;