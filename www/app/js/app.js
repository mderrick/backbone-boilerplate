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
         * The string to display on app load
         * @type {String}
         */
        welcomeString: 'The app works!',

        /**
         * Reference to window
         * @type {Object}
         */
        window: window,

        /**
         * Starts the application.
         */
        start: function() {
            // If this exists we can use native alert that has more
            // functionality
            if (this.window.navigator.notification) {
                this.window.navigator.notification.alert(
                    this.welcomeString,
                    function() { },
                    'Welcome',
                    'Awesome!'
                );
            } else {
                this.window.alert(this.welcomeString);
            }

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