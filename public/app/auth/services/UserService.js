define(['auth/module'], function (module) {

    'use strict';

   return module.registerFactory('UserService', function ($http, $q, $rootScope, $window) {
	   	var UserService = {};

	   	UserService.user = undefined;

	   	UserService.recarrega = function(token) {
	    	var dfd = $q.defer();
	    	var  usuario = {
	    		email: undefined,
	    		nome: undefined,
	    		permissoes: undefined,
	    		admin: false,
	    		foto: undefined
	    	};

	    	return $http({
	    	    method: 'GET',
	    	    url: options.api.base_url + '/conta/verificacao-token',
	    	    headers: {'X-AuthToken' : token},
	    	    data:{}
	    	}).then(function (data) {
	    	    usuario = data.data;
	        	usuario.foto = options.api.base_url + '/perfil/foto/' + usuario.id;
	        	UserService.user = usuario;
	        	$rootScope.$broadcast('event:login-success', usuario);
	        	return usuario;
	    	}, function (error){
	    		delete $window.sessionStorage.token;
	    		return $q.reject(error);
	    	});
	    };

	    UserService.login = function(email, senha, rememberMe) {
	    	var dfd = $q.defer();
	    	var  usuario = {
	    		email: undefined,
	    		nome: undefined,
	    		permissoes: undefined,
	    		admin: false,
	    		foto: undefined
	    	};

	    	return $http({
	    	    method: 'POST',
	    	    url: options.api.base_url + '/login',
	    	    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    	    transformRequest: function(obj) {
	    	        var str = [];
	    	        for(var p in obj)
	    	        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	    	        return str.join("&");
	    	    },
	    	    data: {'email': email, senha: senha, 'remember-me': true}
	    	}).then(function (data) {

	   			var credenciais = JSON.parse(data.headers('x-credenciais'));
	    	    usuario.email = credenciais.email;
	    	    usuario.nome = credenciais.nome;
	        	usuario.permissoes = credenciais.permissoes;
	        	usuario.admin = credenciais.admin;
	        	if (credenciais.foto)
	        		usuario.foto = options.api.base_url + credenciais.foto;
	        	else
	        		usuario.foto = 'https://ssl.gstatic.com/ui/v1/icons/mail/profile_mask_2x.png';
	        	$window.sessionStorage.swu = JSON.stringify(usuario);
	        	$window.sessionStorage.token = data.headers('x-authtoken');
	        	UserService.user = usuario;
	        	$rootScope.$broadcast('event:login-success', usuario);

	        	return usuario;
	    	}, function (error){
	    		return $q.reject(error);
	    	});
	    };

	    UserService.logout = function() {
	    	UserService.user = undefined;
	    	delete $window.sessionStorage.swu ;
	    	delete $window.sessionStorage.token ;
	        return $http.get(options.api.base_url + '/logout');
	    }

	    UserService.registrar = function(usuario) {
	    	var dfd = $q.defer();

	    	return $http({
	    	    method: 'POST',
	    	    url: options.api.base_url + '/conta/registro',
	    	    data: usuario
	    	}).then(function (data) {
	        	return data;
	    	}, function (error){
	    		return $q.reject(error);
	    	});
	    };

	    UserService.confirmacaoRegistro = function(email, token) {
	    	var dfd = $q.defer();

	    	return $http({
	    	    method: 'GET',
	    	    url: options.api.base_url + '/conta/ativacao?email=' + email + '&token=' + token,
	    	    data: {}
	    	}).then(function (data) {
	        	return data;
	    	}, function (error){
	    		return $q.reject(error);
	    	});
	    };

	    UserService.solicitarRecuperacao = function(email) {
	    	var dfd = $q.defer();

	    	return $http({
	    	    method: 'POST',
	    	    url: options.api.base_url + '/conta/recuperacao-senha',
	    	    data: {email: email}
	    	}).then(function (data) {
	        	return data;
	    	}, function (error){
	    		return $q.reject(error);
	    	});
	    };

	    UserService.confirmarRecuperacao = function(usuario) {
	    	var dfd = $q.defer();

	    	return $http({
	    	    method: 'POST',
	    	    url: options.api.base_url + '/conta/confirmacao-recuperacao-senha',
	    	    data: usuario
	    	}).then(function (data) {
	        	return data;
	    	}, function (error){
	    		return $q.reject(error);
	    	});
	    };



	    return UserService;
	})
});
