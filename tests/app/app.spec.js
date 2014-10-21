define([
    'app',
    'extensions/router',
    'backbone'
], function(app, Router, Backbone) {

    'use strict';

    describe('app', function() {

        beforeEach(function() {
            spyOn(Backbone.history, 'start');
            app.window = {
                alert: jasmine.createSpy('alert'),
                navigator: {}
            };
        });

        describe('.start', function() {
            it('should assign a new Router to this.router', function() {
                app.start();
                expect(app.router instanceof Router).toBeTruthy();
            });

            it('should start Backbone.history with pushState', function() {
                app.start();
                expect(Backbone.history.start).toHaveBeenCalledWith({
                    pushState : true,
                    root : '/'
                });
            });

            it('should alert using cordova notfication if present', function() {
                var spy = jasmine.createSpy('alert');
                app.window.navigator.notification = {
                    alert: spy
                };
                app.start();
                expect(spy).toHaveBeenCalledWith(
                    'The app works!',
                    jasmine.any(Function),
                    'Welcome',
                    'Awesome!'
                );
            });

            it('should alert using window.alert if cordova not present', function() {
                app.start();
                expect(app.window.alert).toHaveBeenCalledWith('The app works!');
            });
        });

    });

});