require.config({
    baseUrl: '../node_modules',
    paths: {
        app: '../js',
        models: '../js/models',
        collections: '../js/collections',
        routers: '../js/routers',
        views: '../js/views',
        html: '../html',
        text: 'requirejs-text',
        jquery: 'jquery/dist/jquery', // Thinks it's global
        underscore: 'underscore/underscore', // Thinks it's global
        bootstrap: 'bootstrap/dist/js/bootstrap.bundle.min'
    },
    shim : {
        bootstrap: ['jquery']
    },
    map: {
        // '*': { 'jquery': 'asu/jquery-private' },
        // 'asu/jquery-private': { 'jquery': 'jquery' },
    }
});


define(function (require) {

    require('bootstrap');
    require('screenfull');
    var App = require('views/app');
    var app = new App();

})