var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.loggedin) {
        res.render('restaurant', { title: 'Restaurant', email: req.session.email });
    } else {
        res.redirect('/login');
    }
});


router.post('/', function(req, res) {
    if (true){
        const name = req.body.name;;
        if(name) {
            db.query('select * from restaurant where resname = ?',
                [name],
                function(err, results) {
                    if(results) {
                        res.send(JSON.stringify({"status": 200, "error": null, "response": results}))
                    } else {
                        res.render('restaurant', { title: 'No Restaurant by such name'});
                    }
                });
        } else {
            res.render('restaurant', { title: 'Please enter name'});
        }
    }
    else {
        res.redirect('/login');
    }
});


module.exports = router;