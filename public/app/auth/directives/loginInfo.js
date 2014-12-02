define(['auth/module'], function(module){
    "use strict";

    return module.registerDirective('loginInfo', function(UserService){

        return {
            restrict: 'A',
            templateUrl: 'app/auth/directives/login-info.tpl.html',
            link: function($scope, element){
                $scope.user = UserService.user;
                $scope.$on('event:login-success', function (event, data) {
                    $scope.user = data;
                });

                $scope.$on('event:logout', function (event, data) {
                    $scope.user = undefined;
                });
            }
        }
    })
});
