define([
    'backbone',
    'extensions/router',
    'settings/settings!'
], function (Backbone, Router, settings) {

    'use strict';
    
    var app = {

        /**
         * Starts the application.
         */
        start: function() {
            // Start your application here
            this.router = new Router();
            Backbone.history.start({
                pushState: true,
                root: '/'
            });
        }
    };

    if (settings.debug) {
        window.app = this;
    }

    return app;
});