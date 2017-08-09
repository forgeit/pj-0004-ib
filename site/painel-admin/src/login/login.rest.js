(function () {
	'use strict';

	angular
		.module('admin.login')
		.factory('loginRest', dataservice);

	dataservice.$inject = ['$http', '$location', '$q', 'configuracaoREST', '$httpParamSerializer'];

	function dataservice($http, $location, $q, configuracaoREST, $httpParamSerializer) {
		var service = {
			logar: logar
		};

		return service;

		function logar(data) {
			var novo = {};
			novo.login = btoa(data.login);
			novo.senha = btoa(data.senha);
			return $http.post(configuracaoREST.url + 'login/entrar', novo);
		}
	}
})();