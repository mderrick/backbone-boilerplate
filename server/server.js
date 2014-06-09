var app = require('./app');
app.listen(app.get('port'), function() {
	console.log('Environment: '.cyan + process.env.NODE_ENV);
	console.log('Server started: '.cyan + 'http://localhost:' + app.get('port'));
	console.log('Press \'ctrl + c\' to terminate server'.grey);
});