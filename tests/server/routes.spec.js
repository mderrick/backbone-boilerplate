var rewire = require('rewire'),
    buildController = require('./../../server/controllers/build.js'),
    instance = rewire('./../../server/routes.js');

describe('routes', function () {

    var app;

    beforeEach(function() {
        app = {
            get: jasmine.createSpy('app.get')
        };
    });

    describe('.initialize', function () {
        it('should add route GET \'/api/build/\' and use the \'buildController\'', function () {
            instance.initialize(app);
            expect(app.get).toHaveBeenCalledWith('/api/build/', buildController.get);
        });
    });

});