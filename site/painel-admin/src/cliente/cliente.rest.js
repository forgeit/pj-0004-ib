(function () {
	'use strict';

	angular
		.module('admin.cliente')
		.factory('clienteRest', dataservice);

	dataservice.$inject = ['$http', '$location', '$q', 'configuracaoREST', '$httpParamSerializer'];

	function dataservice($http, $location, $q, configuracaoREST, $httpParamSerializer) {
		var service = {
			carregar: carregar,
			carregarComboCidades: carregarComboCidades,
			lista: lista,
			salvar: salvar,
			remover: remover
		};

		return service;

		function carregarComboCidades() {
			return $http.get(configuracaoREST.url + 'cidade/buscarTodos');
		}

		function carregar(id) {
			return $http.get(configuracaoREST.url + 'cliente/buscar/' + id);
		}

		function lista(data) {
			return $http.post(configuracaoREST.url + 'cliente/buscarTodos', data);
		}

		function salvar(data) {
			return $http.post(configuracaoREST.url + 'cliente/salvar', data);
		}

		function remover(data) {
			return $http.post(configuracaoREST.url + 'cliente/remover/' + data);
		}
	}
})();