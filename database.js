//TODO: in production environment dbSettings should be moved to a private .env setup file for security.
var sql = require('mysql');
var settings = require('./dbConfig_mccoymil');
//var settings = require('./dbConfig_mcdade_local');

var pool = sql.createPool(settings);

module.exports = pool;