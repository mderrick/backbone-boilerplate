var request = require('request'),
	remoteHost = 'https://api.travis-ci.org',
	owner = 'mderrick',
	repo = 'backbone-boilerplate';

/**
 * Build controller
 * @type {Object}
 */
module.exports = {
	/**
	 * Gets the latest builds and information from Travis
	 * @param  {Object} req Request object
	 * @param  {Object} res Response object
	 */
	get: function (req, res) {
		'use strict';
		request({
    		url: remoteHost + '/repos/' + owner + '/' + repo + '/builds'
  		}, function (err, response, body) {
			if (err) {
				res.send(err);
				return;
			}
			res.send(body);
		});
	}
};