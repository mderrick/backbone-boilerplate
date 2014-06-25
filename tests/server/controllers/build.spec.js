var rewire = require('rewire'),
    instance = rewire('./../../../server/controllers/build.js');

describe('controllers.build', function () {

    var requestSpy;

    beforeEach(function() {
        requestSpy = jasmine.createSpy('request');
        instance.__set__({
            request: requestSpy
        });
    });

    describe('.get', function () {
        it('should make a request to Travis API', function () {
            instance.get();
            expect(requestSpy).toHaveBeenCalledWith({
                url: 'https://api.travis-ci.org/repos/mderrick/backbone-boilerplate/builds'
            }, jasmine.any(Function));
        });
    });

});