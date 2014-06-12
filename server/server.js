var app = require('./app');
require('colors');
app.listen(app.get('port'), function() {
	'use strict';
	console.log('Environment: '.cyan + process.env.NODE_ENV);
	console.log('Server started: '.cyan +
		'http://localhost:' + app.get('port'));
	console.log('Press \'ctrl + c\' to terminate server'.grey);
});