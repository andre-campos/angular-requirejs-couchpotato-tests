var require = {
    waitSeconds: 0,
    paths: {

        'jquery': [
            '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
            '../plugin/jquery/dist/jquery.min'
        ],
        'jquery-ui': '//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min',
        'bootstrap': '//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min',
        'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min',
        'angular-resource': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-resource.min',
        'angular-ui-router': '../plugin/angular-ui-router/release/angular-ui-router.min',
        'angular-bootstrap': '../plugin/angular-bootstrap/ui-bootstrap-tpls.min',
        'angular-couch-potato': '../plugin/angular-couch-potato/dist/angular-couch-potato',
        // app js file includes
        'appConfig': '../app.config',
        'modules-includes': 'includes'
    },
    shim: {
        'angular': {'exports': 'angular', deps: ['jquery']},
        'angular-resource': { deps: ['angular'] },
        'angular-bootstrap': { deps: ['angular'] },
        'angular-ui-router': { deps: ['angular'] },
        'angular-couch-potato': { deps: ['angular'] }
    },
    priority: [
        'jquery',
        'bootstrap',
        'angular'
    ]
};