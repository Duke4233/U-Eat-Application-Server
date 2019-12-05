var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET home page. */
router.get('/:resid', function(req, res, next)
{
    if(req.session.loggedin)
	{
		db.query( "SELECT menu_item.name,menu_item.price,menu_item.imageURL, res_table.quantity, orderTot.total AS Order_Total FROM (SELECT SUM(menu_item.price * reservation_item.quantity) AS total FROM menu_item, reservation_item WHERE menu_item.id = reservation_item.item_id AND reservation_item.reservation_id=?) AS orderTot, menu_item INNER JOIN  (SELECT reservation.id, reservation_item.item_id, reservation_item.quantity FROM reservation INNER JOIN reservation_item ON reservation.id = reservation_item.reservation_id)AS res_table ON res_table.item_id=menu_item.id WHERE res_table.id = ?", [req.params.resid], function(error, results, fields)
		{
			if (error)
			{
				console.log(error);
				res.redirect('/');
			} else {
				console.log(results);
				res.render('order',
					{
						title: results[0].resname,
						order_Total:results[0].Order_Total,
						loggedin: req.session.loggedin,
						username: req.session.username,
						userid: req.session.userid,
						reservation_item: results
					});
			}
		});
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
