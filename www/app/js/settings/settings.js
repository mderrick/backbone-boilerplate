define({
    envDir: 'settings/env/',
    load: function (name, req, onLoad, config) {
        'use strict';
        
        var envFile = config.env ?
            this.envDir + config.env :
            this.envDir + 'local';

        if (config.isBuild) {
            req([envFile]);
            onLoad();
            return;
        }

        req(['underscore', envFile], function (_, settings) {
            var mergedSettings = _.extend(
                settings, _.pick(config, 'env', 'buildnumber', 'version')
            );
            onLoad(mergedSettings);
        }, onLoad.error);
    }
});
