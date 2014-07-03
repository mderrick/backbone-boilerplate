var buildController = require('./controllers/build');

/**
 * This is where we add our express routes.
 * If you are building a simple backbone application that does not require
 * any routes or API's, this file along with references to it in app.js can
 * be removed and the controllers folder deleted.
 * @param  {Object} app The express app
 */
module.exports.initialize = function(app) {
    'use strict';
    app.get('/api/build/', buildController.get);
};