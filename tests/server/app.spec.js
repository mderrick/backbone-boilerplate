var app = require('./../../server/app.js'),
    request = require('supertest');

describe('GET static files if they exist', function () {
    it('return static images in \'app\' directory', function (done) {
        request(app)
            .get('/favicon.ico')
            .expect('Content-Type', 'image/x-icon')
            .expect(200, done);
    });

    it('return static javascript in \'app\' directory', function (done) {
        request(app)
            .get('/js/config.js')
            .expect('Content-Type', 'application/javascript')
            .expect(200, done);
    });

    it('return static css in \'app\' directory', function (done) {
        request(app)
            .get('/css/styles.js')
            .expect('Content-Type', 'text/html; charset=UTF-8')
            .expect(200, done);
    });
});

describe('GET homepage if static file does not exist', function () {
    it('respond with index.html', function (done) {
        request(app)
            .get('/')
            .expect('Content-Type', 'text/html; charset=UTF-8')
            .expect(200, done);
    });
});