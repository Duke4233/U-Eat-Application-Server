//TODO: in production environment dbSettings should be moved to a private .env setup file for security.
var sql = require('mysql');
var settings = require('./dbConfig_mccoymil');
var db;

function connectSQL() {
    if (!db) {
        db = sql.createPool(settings);
        db.getConnection(function(err) {
            if(!err) {
                console.log('SQL connection established.'); }
            else {
                console.log('Error connecting SQL');
            }
        });
    }
    return db;
}

module.exports = connectSQL();