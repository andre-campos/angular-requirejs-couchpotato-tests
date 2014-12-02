'use strict';

var options = {};
options.api = {};
options.api.base_url = "http://localhost:8080";

define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
], function(ng, couchPotato) {

    var app = ng.module('app', [
        'ngSanitize',
        'scs.couch-potato',
        'ngAnimate',
        'ui.router',
        // App
        'app.auth'
    ]);

    couchPotato.configureApp(app);

    app.run(function($couchPotato, $rootScope, $state, $stateParams, $window, $q, UserService) {
        app.lazy = $couchPotato;
    });

    return app;
});
