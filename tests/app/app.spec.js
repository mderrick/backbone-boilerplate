define([
    'app',
    'extensions/router',
    'backbone'
], function(app, Router, Backbone) {

    'use strict';

    describe('app', function() {

        describe('.start', function() {
            it('should assign a new Router to this.router', function() {
                app.start();
                expect(app.router instanceof Router).toBeTruthy();
            });

            it('should start Backbone.history with pushState', function() {
                spyOn(Backbone.history, 'start');
                app.start();
                expect(Backbone.history.start).toHaveBeenCalledWith({
                    pushState : true,
                    root : '/'
                });
            });
        });

    });

});