require.config({
    baseUrl: '/app/js',
    deps: ['jquery', 'underscore'],
    paths: {
        // http://requirejs.org/docs/optimization.html#onejs
        // requireLib is used for build to include the require library
        requireLib: './../../bower_components/requirejs/require',
        // This modernizr is the default one used for development;
        // On build we overide this path to a custom modernizr file
        // that was built based on the contents of our application.
        modernizr: './../../bower_components/modernizr/modernizr',
        backbone: './../../bower_components/backbone/backbone',
        jquery: './../../bower_components/jquery/dist/jquery',
        underscore: './../../bower_components/underscore/underscore',
        require: './../../bower_components/requirejs/require',
        tpl: './../../bower_components/requirejs-tpl/tpl'
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