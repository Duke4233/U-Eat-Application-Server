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
    } else {
        res.redirect('/login');
    }
});

router.get('/map', function(req, res, next)
{
    if(req.session.loggedin)
    {
        // Ibrahim: req.query is new for me, I was taught req.params (which is the string following a colon in the url)
        db.query("SELECT id, name, street1, city, state, zip, lat, lng FROM restaurant WHERE zip = ?", [req.query.searchzip], function(err, results, fields)
        {
            if (results.length > 0)
            {
                res.render('searchMapResults',
                    {
                        title: 'Your search results!',
                        loggedin: req.session.loggedin,
                        username: req.session.username,
                        userid: req.session.userid,
                        GMapsAPIKEY: process.env.GOOGLEMAPSAPIKEY,
                        restaurant: results
                    }

                )
            } else {
                res.render('searchMapResults',
                    {
                        title: 'We didn\'t find that restaurant',
                        loggedin: req.session.loggedin,
                        username: req.session.username,
                        userid: req.session.userid
                        //This is when we would have reinstanced the search partial on the search results page.
                    });
            }
        });
    } else {
        res.redirect('/login');
    }
});




module.exports = router;
