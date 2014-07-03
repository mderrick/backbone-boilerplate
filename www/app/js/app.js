define([
    'modernizr',
    'require',
    'backbone',
    'extensions/router',
    'settings/settings!'
], function (Modernizr, require, Backbone, Router, settings) {

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
        window.app = app;
    }

    return app;
});