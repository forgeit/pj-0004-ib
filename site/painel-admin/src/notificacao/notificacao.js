(function () {

	'use strict';

	angular.module('admin.notificacao')
		.controller('Notificacao', ctrl);

	ctrl.$inject = ['$rootScope', 'jwtHelper', 'AuthToken', '$location', 'notificacaoRest', 'controller', 'tabela', '$scope', '$routeParams'];

	function ctrl($rootScope, jwtHelper, AuthToken, $location, dataservice, controller, tabela, $scope, $routeParams) {
		var vm = this;

		vm.utilizar = utilizar;
		vm.model = {};
		vm.salvar = salvar;
		vm.voltar = voltar;
		vm.atualizar = atualizar;

		init();

		function init() {
			buscarModeloNotificacao();
			buscarBeacons();

			if ($routeParams.id) {
				carregar($routeParams.id);
			}
		}

		function atualizar() {
			dataservice.atualizar($routeParams.id, vm.model).then(success).catch(error);

			function error(response) {
				console.error(response);
				toastr.error('Ocorreu um erro ao atualizar a notificação.');
			}

			function success(response) {
				if (response.data.exec) {
					toastr.success('Sucesso ao atualizar a atualização.');
					voltar();
				} else {
					toastr.error(response.data.message);
				}
			}
		}

		function carregar(id) {
			dataservice.carregar(id).then(success).catch(error);

			function error(response) {
				toastr.error("Ocorreu um erro ao carregar os dados.");
			}

			function success(response) {
				if (response.data.exec) {
					vm.model = response.data.data;
					vm.editar = true;
					vm.model.ativo = response.data.data.ativo == 1;

					vm.modelos.forEach(function (value) {
						if (value.id_modelo_notificacao == vm.model.id_modelo_notificacao) {
							utilizar(value.id_modelo_notificacao, value.descricao);
						}
					});	
				} else {
					toastr.error(response.data.message);
				}
			}
		}

		function buscarModeloNotificacao() {
			dataservice.buscarModeloNotificacao().then(success).catch(error);

			function error () {}

			function success (response) {
				vm.modelos = response.data.data;
				utilizar(vm.modelos[0].id_modelo_notificacao, vm.modelos[0].descricao);
			}
		}

		function buscarClientes () {
			dataservice.buscarClientes().then(success).catch(error);

			function error () {
				vm.clientes = [];
			}

			function success (response) {
				vm.clientes = response.data.data;
			}
		}

		function buscarBeacons () {
			dataservice.buscarBeacons().then(success).catch(error);

			function error () {
				vm.beacons = [];
			}

			function success (response) {
				vm.beacons = response.data.data;
			}
		}

		function utilizar(id, descricao) {
			vm.model.id_modelo_notificacao = id;
			vm.modelo = descricao;
		}

		function salvar() {
			dataservice.salvar(vm.model).then(success).catch(error);

			function error(response) {
				console.error(response);
				toastr.error('Ocorreu um erro ao salvar a notificação.');
			}

			function success(response) {
				if (response.data.exec) {
					toastr.success('Sucesso ao registrar a notificação.');
					voltar();
				} else {
					toastr.error(response.data.message);
				}
			}
		}

		function voltar() {
			$location.path('/notificacao');
		}
	}

})();