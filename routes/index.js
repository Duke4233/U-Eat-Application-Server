var express = require('express');
var router = express.Router();
var db = require('../database');

/*db.query("SELECT * from menu_item", function (err, result) {
        if(err) throw err;
        console.log("result:" + result);
    });*/

/* GET home page. */

function getRestaurant(res, locals, resname)
{
	/* SELECT
	 * 		resname,
	 *		street,
	 *		city,
	 *		state,
	 * 		zip
	 * FROM
	 * 		restaurant
	 * WHERE
	 *		resname LIKE CONCAT('%', ?, '%')
	 */
	
	db.query("SELECT menu_item.Name, menu_item.Price FROM restaurant INNER JOIN menu_item ON restaurant.ResID = menu_item.ResID WHERE restaurant.resname = ?", [resname], function(error, results, fields)
	{
		if (error)
		{
			console.log(JSON.stringify(error)); // insert however errors are handled
			res.end();
		}
		
		locals.menu_item = results;
		res.render('menu', locals);
	});
}

function getRestaurants(res, locals, searchname) // Update to search in address as well
{
	/* SELECT
	 * 		resname,
	 *		street,
	 *		city,
	 *		state,
	 * 		zip
	 * FROM
	 * 		restaurant
	 * WHERE
	 *		resname LIKE CONCAT('%', ?, '%')
	 */
	
	db.query("SELECT resname, street, city, state, zip FROM restaurant WHERE resname LIKE CONCAT('%', ?, '%')", [searchname], function(error, results, fields)
	{
		if (error)
		{
			console.log(JSON.stringify(error)); // insert however errors are handled
			res.end();
		}
		
		locals.restaurant = results;
		res.render('searchNameResults', locals);
	});
}

/* GET displays main search page */
router.get('/', function(req, res, next)
{
	if(true)
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

/* GET displays restaurant info */
router.get('/restaurant/:resname', function(req, res)
{
	locals = {};
	getRestaurant(res, locals, req.params.resname);
});

/* POST displays restaurant search results */
router.post('/search', function(req, res)
{
	// update this so that "searchname" is a '+' delimited string so the user can search multiple words
	locals = {};
	getRestaurants(res, locals, req.body.searchname);
});

module.exports = router;
