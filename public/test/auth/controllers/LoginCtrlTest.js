define(['angular', 'angular-ui-router', 'angular.mock',  'angular-couch-potato', 'auth/services/UserService', 'auth/login/LoginCtrl'], 
    function( angular, router, angularMocks, couchpotato, service, LoginCtrl) {

    describe('LoginCtrlTest', function(){

        var $q, $rootScope, $state, $http, controller;

        beforeEach(angular.mock.inject(function ($injector) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            $http = $injector.get('$http');

            //This seems to get me a couchpotato-like object. Not sure if this is right
            controller = LoginCtrl;

            //How to get ahold of LoginCtrl here?

            $rootScope.$digest();
        }));

        it('The controller should exist', function() {
             expect(controller).not.toBe(null);
        });

        it('It should be able to login', function() {
            //How to tell couchpotato to load a LoginCtrl?
            
            expect($rootScope).not.toBe(null);
        });
    })
});
