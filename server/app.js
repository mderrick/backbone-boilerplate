var express = require('express'),
	app = express(),
	path = require('path'),
	prerender = require('prerender-node');

app.set('port', process.env.PORT || 9001);
app.use(prerender);

app.use('/', express.static(path.join(__dirname, '../app')));
app.use(function(req, res) {
	'use strict';
	res.sendfile('index.html', {
		root: 'app/'
	});
});

module.exports = app;