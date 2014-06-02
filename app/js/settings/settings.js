define({
	envDir: 'settings/env/',
	load: function(name, req, onLoad, config) {
		'use strict';
		
		var envFile = config.env ? this.envDir + config.env : this.envDir + 'local';

		if (config.isBuild) {
			req([envFile]);
			onLoad();
			return;
		}

		req([envFile], function (settings) {
			onLoad(settings);
		}, onLoad.error);
	}
});
