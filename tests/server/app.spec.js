var app = require('./../../server/app.js'),
    request = require('supertest');

describe('app', function () {
   
    it('should return static images in \'app\' directory', function (done) {
        request(app)
            .get('/favicon.ico')
            .expect('Content-Type', 'image/x-icon')
            .expect(200, done);
    });

    it('should return static javascript in \'app\' directory', function (done) {
        request(app)
            .get('/app/js/config.js')
            .expect('Content-Type', 'application/javascript')
            .expect(200, done);
    });

    it('should return static css in \'app\' directory', function (done) {
        request(app)
            .get('/app/css/styles.css')
            .expect('Content-Type', 'text/css; charset=UTF-8')
            .expect(200, done);
    });

    it('return index.html if static files do not exist', function (done) {
        request(app)
            .get('/')
            .expect('Content-Type', 'text/html; charset=UTF-8')
            .expect(200, done);
    });

});