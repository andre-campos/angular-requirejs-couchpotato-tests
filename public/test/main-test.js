var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Test\.js$/.test(file)) {
      tests.push(file);

    }
  }
}

requirejs.config({
    baseUrl: '/base/app',
    waitSeconds: 0,
    paths: {

        'jquery': [
            'http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
            '../plugin/jquery/dist/jquery.min'
        ],
        'jquery-ui': 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min',
        'bootstrap': 'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min',
        'angular': 'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min',
        'angular.mock': 'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-mocks',
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
        'angular.mock': {deps: ['angular'], 'exports': 'angular.mock'},
        'angular-resource': { deps: ['angular'] },
        'angular-bootstrap': { deps: ['angular'] },
        'angular-ui-router': { deps: ['angular'] },
        'angular-couch-potato': { deps: ['angular'] }
    },
    priority: [
        'jquery',
        'bootstrap',
        'angular'
    ],
    deps: tests,
    callback: window.__karma__.start
});
