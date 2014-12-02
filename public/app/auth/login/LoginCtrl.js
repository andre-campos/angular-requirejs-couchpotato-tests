define(['auth/module'], function (module) {

    "use strict";

    return module.registerController('LoginCtrl', function ($scope, $state, $http, UserService) {

        $scope.email = null;
        $scope.senha = null;
        $scope.rememberMe = null;

        $scope.erroLogin = "erro";

        $scope.submit = function(){
            UserService.login($scope.email, $scope.senha, $scope.rememberMe).then(
                function(sucesso){
                    $state.go('app.dashboard');
                },
                function(erro){
                    if (erro.status == 401){
                        $scope.erroLogin = 'Credenciais inválidas. Por favor, tente novamente';
                    }
                    else{
                        $scope.erroLogin = 'Erro desconhecido. Por favor, tente novamente.';
                    }
                }
            );
        };
    })
});
