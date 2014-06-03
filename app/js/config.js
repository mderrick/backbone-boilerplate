require.config({
    baseUrl: '/js',
    deps: ['jquery', 'underscore'],
    paths: {
        backbone: './../bower_components/backbone/backbone',
        jquery: './../bower_components/jquery/dist/jquery',
        underscore: './../bower_components/underscore/underscore',
        require: './../bower_components/requirejs/require',
        tpl: './../bower_components/requirejs-tpl/tpl'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        }
    }
});

require(['app'], function(app) {
    app.start();
});