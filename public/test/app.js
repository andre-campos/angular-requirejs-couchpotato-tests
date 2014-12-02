'use strict';

/**
 * @ngdoc overview
 * @name app [smartadminApp]
 * @description
 * # app [smartadminApp]
 *
 * Main module of the application.
 */

var options = {};
options.api = {};
options.api.base_url = "http://localhost:8080";

/*global define */
define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'angular-animate',
    'angular-bootstrap',
    'smartwidgets',
    'notification'
], function(ng, couchPotato) {

    var app = ng.module('app', [
        'ngSanitize',

        'scs.couch-potato',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        // App
        'app.auth',
        'app.layout',
        'app.chat',
        'app.dashboard',
        'app.calendar',
        'app.inbox',
        'app.graphs',
        'app.tables',
        'app.forms',
        'app.ui',
        'app.widgets',
        'app.maps',
        'app.appViews',
        'app.misc',
        'app.smartAdmin',
        'app.perfil',
    ]);

    couchPotato.configureApp(app);

    app.config(function($provide, $httpProvider) {



        // Intercept http calls.
        $provide.factory('ErrorHttpInterceptor', function($q) {
            var errorCounter = 0;

            function notifyError(rejection) {
                if (/\/login$/.test(rejection.config.url))
                    return;
                if (/\/conta\/.*/.test(rejection.config.url))
                    return;
                console.log(rejection);
                $.bigBox({
                    title: rejection.status + ' ' + rejection.statusText,
                    content: rejection.data,
                    color: "#C46A69",
                    icon: "fa fa-warning shake animated",
                    number: ++errorCounter,
                    timeout: 6000
                });
            }

            return {
                // On request failure
                requestError: function(rejection) {
                    // show notification
                    notifyError(rejection);

                    // Return the promise rejection.
                    return $q.reject(rejection);
                },

                // On response failure
                responseError: function(rejection) {
                    // show notification
                    notifyError(rejection);
                    // Return the promise rejection.
                    return $q.reject(rejection);
                }
            };
        });

        $provide.factory('TokenInterceptor', function($q, $window, $location) {
            return {
                request: function(config) {
                    config.headers = config.headers || {};
                    if ($window.sessionStorage.token) {
                        config.headers.XAuthToken = $window.sessionStorage.token;
                    }
                    return config;
                },

                requestError: function(rejection) {
                    return $q.reject(rejection);
                },

                /* Set Authentication.isAuthenticated to true if 200 received */
                response: function(response) {
                    //O token muda depois de todas as requisições
                    if (response != null && response.status == 200 && response.headers('X-AuthToken')) {
                        $window.sessionStorage.token = response.headers('X-AuthToken');
                    }
                    return response || $q.when(response);
                },

                /* Revoke client authentication if 401 is received */
                responseError: function(rejection) {
                    if (rejection != null && rejection.status === 401 && $window.sessionStorage.token) {
                        delete $window.sessionStorage.token;
                    }

                    return $q.reject(rejection);
                }
            };
        });

        // Add the interceptor to the $httpProvider.
        $httpProvider.interceptors.push('TokenInterceptor');
        $httpProvider.interceptors.push('ErrorHttpInterceptor');

    });

    app.run(function($couchPotato, $rootScope, $state, $stateParams, $window, $q, UserService) {
        app.lazy = $couchPotato;

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        if ($window.sessionStorage.token){
            UserService.recarrega($window.sessionStorage.token).then(
                function(sucesso){
                    $state.go('app.perfil');
                },
                function(erro){
                    $state.go('login');
                }
            );
        }
        // editableOptions.theme = 'bs3';
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {

            if (!toState.data.insecure && !UserService.user) {
                event.preventDefault();
                if (fromState.name != 'login')
                    $window.location.href="/#/login";
            }
        });
    });

    return app;
});