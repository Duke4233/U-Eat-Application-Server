var express = require('express');
var router = express.Router();
var db = require('../database');

router.get('/name', function(req, res, next)
{
    if(req.session.loggedin)
    {
        //TODO: do we want this query to return all restaurant for an empty string or add an 'IS NOT NULL' condition so it returns nothing?
        db.query("SELECT id, name, street1, city, state, zip FROM restaurant WHERE name LIKE CONCAT('%', ?, '%')", [req.query.restaurantname], function(err, results, fields)
        {
            console.log(results);
            if (results.length > 0)
            {
                res.render('searchNameResults',
                    {
                        title: 'Your search results!',
                        loggedin: req.session.loggedin,
                        username: req.session.username,
                        userid: req.session.userid,
                        restaurant: results
                    });
            } else {
                res.render('searchNameResults',
                    {
                        title: 'We didn\'t find that restaurant',
                        loggedin: req.session.loggedin,
                        username: req.session.username,
                        userid: req.session.userid
                        //This is when we would have reinstanced the search partial on the search results page.
                    });
            }
        });
    }
    else
    {
        res.redirect('/login');
    }
});

router.get('/zip', function(req, res, next)
{
    if(req.session.loggedin)
    {

    }
    else
    {
        res.redirect('/login');
    }
});




module.exports = router;
