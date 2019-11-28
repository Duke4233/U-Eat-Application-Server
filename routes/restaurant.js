var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET home page. */
router.get('/', function(req, res, next)
{
    if(req.session.loggedin)
	{
        res.render('restaurant',
		{
			title: 'Restaurant',
			email: req.session.email
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

router.post('/', function(req, res)
{
    if (true)
	{
        const name = req.body.name;
		
        if(name)
		{
            db.query('select * from restaurant where name = ?', [name], function(err, results)
			{
				if(results)
				{
					res.send(JSON.stringify({"status": 200, "error": null, "response": results}))
				}
				else
				{
					res.render('restaurant', { title: 'No Restaurant by such name'});
				}
			});
        }
		else
		{
            res.render('restaurant', { title: 'Please enter name'});
        }
    }
    else
	{
        res.redirect('/login');
    }
});

function getRestaurant(res, locals, resname)
{
	db.query("SELECT menu_item.name, menu_item.price FROM restaurant INNER JOIN menu_item ON restaurant.id = menu_item.restaurant_id WHERE restaurant.name = ?", [resname], function(error, results, fields)
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

module.exports = router;