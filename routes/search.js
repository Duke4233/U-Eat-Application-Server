var express = require('express');
var router = express.Router();
var db = require('../database');                // requires the database for this rotuer too work and sets db equal to  .env database 

router.get('/name', function(req, res, next)    //gets the name of the restaurant
{
    if(req.session.loggedin)                    //if loggedin
    {
        //TODO: do we want this query to return all restaurant for an empty string or add an 'IS NOT NULL' condition so it returns nothing?
        db.query("SELECT id, name, street1, city, state, zip FROM restaurant WHERE name LIKE CONCAT('%', ?, '%')", [req.query.restaurantname], function(err, results, fields)
        {
            if (results.length > 0)                         // if we got a result then there is a restaurant with that name
            {
                res.render('searchNameResults',             // renders the search view
                    {
                        title: 'Your search results!',      // literal for title
                        loggedin: req.session.loggedin,     // logged in status
                        username: req.session.username,     // current username
                        userid: req.session.userid,         // current username
                        restaurant: results                 // the returned values fro mthe query are stored in restaurant
                    });
            } else {
                res.render('searchNameResults',             // else no luck
                    {
                        title: 'We didn\'t find that restaurant',   // writes the message into title
                        loggedin: req.session.loggedin,             // logged in status
                        username: req.session.username,             // current username
                        userid: req.session.userid                  // current user id
                        //This is when we would have reinstanced the search partial on the search results page.
                    });
            }
        });
    } else {        // not logged in redirect ot loggin
        res.redirect('/login');
    }
});

router.get('/map', function(req, res, next) // gets the map using the googlemaps key
{
    if(req.session.loggedin)
    {
        // Ibrahim: req.query is new for me, I was taught req.params (which is the string following a colon in the url)
        db.query("SELECT id, name, street1, city, state, zip, lat, lng FROM restaurant WHERE zip = ?", [req.query.searchzip], function(err, results, fields)
        {
            if (results.length > 0)
            {
                res.render('searchMapResults',                              // we found a restaurant in the desired zipcode
                    {
                        title: 'Your search results!',                      // message to the user
                        loggedin: req.session.loggedin,                     // logged in statusd
                        username: req.session.username,                     // username
                        userid: req.session.userid,                         // userid
                        GMapsAPIKEY: process.env.GOOGLEMAPSAPIKEY,          // sets google maps key to the provided key
                        restaurant: results
                    }

                )
            } else {
                res.render('searchMapResults',                                  // we did not find a restaurant in the desired zipcode
                    {
                        title: 'We didn\'t find that restaurant',               // message to user
                        loggedin: req.session.loggedin,                         // logged in status
                        username: req.session.username,                         // current username
                        userid: req.session.userid                              // current user id
                        //This is when we would have reinstanced the search partial on the search results page.
                    });
            }
        });
    } else {                    // not logged in redirect ot login page
        res.redirect('/login');
    }
});




module.exports = router;
