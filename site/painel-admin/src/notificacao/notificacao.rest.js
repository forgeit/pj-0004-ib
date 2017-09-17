(function () {
	'use strict';

	angular
		.module('admin.notificacao')
		.factory('notificacaoRest', dataservice);

	dataservice.$inject = ['$http', '$location', '$q', 'configuracaoREST', '$httpParamSerializer'];

	function dataservice($http, $location, $q, configuracaoREST, $httpParamSerializer) {
		var service = {
			atualizar: atualizar,
			buscarModeloNotificacao: buscarModeloNotificacao,
			carregar: carregar,			
			lista: lista,
			salvar: salvar,
			remover: remover,
			buscarClientes: buscarClientes,
			buscarBeacons: buscarBeacons
		};

		return service;

		function atualizar(id, data) {
			return $http.post(configuracaoREST.url + 'notificacao/atualizar/' + id, data);
		}

		function buscarClientes(id) {
			return $http.get(configuracaoREST.url + 'cliente/buscarCombo');
		}

		function buscarBeacons(id) {
			return $http.get(configuracaoREST.url + 'beacon/buscarCombo');
		}

		function carregar(id) {
			return $http.get(configuracaoREST.url + 'notificacao/buscar/' + id);
		}

		function buscarModeloNotificacao() {
			return $http.get(configuracaoREST.url + 'modeloNotificacao/buscarTodos');
		}

		function lista(data) {
			return $http.post(configuracaoREST.url + 'notificacao/buscarTodos', data);
		}

		function salvar(data) {
			return $http.post(configuracaoREST.url + 'notificacao/salvar', data);
		}

		function remover(data) {
			return $http.post(configuracaoREST.url + 'notificacao/remover/' + data);
		}
	}
})();