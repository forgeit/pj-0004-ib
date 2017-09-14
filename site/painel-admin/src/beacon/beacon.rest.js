(function () {
	'use strict';

	angular
		.module('admin.beacon')
		.factory('beaconRest', dataservice);

	dataservice.$inject = ['$http', '$location', '$q', 'configuracaoREST', '$httpParamSerializer'];

	function dataservice($http, $location, $q, configuracaoREST, $httpParamSerializer) {
		var service = {
			carregar: carregar,
			lista: lista,
			remover: remover,
			salvar: salvar,
			atualizar: atualizar
		};

		return service;

		function carregar(id) {
			return $http.get(configuracaoREST.url + 'beacon/buscar/' + id);
		}

		function lista(id, data) {
			return $http.post(configuracaoREST.url + 'beacon/buscarTodos/' + id, data);
		}

		function remover(data) {
			return $http.post(configuracaoREST.url + 'beacon/remover/' + data);
		}

		function salvar(data, idCliente) {
			return $http.post(configuracaoREST.url + 'beacon/salvar/' + idCliente, data);
		}

		function atualizar(idCliente, data, idBeacon) {
			return $http.post(configuracaoREST.url + 'beacon/atualizar/' + idCliente + '/' + idBeacon, data);
		}
	}
})();