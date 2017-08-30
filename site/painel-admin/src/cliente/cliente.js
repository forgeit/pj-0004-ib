(function () {

	'use strict';

	angular.module('admin.cliente')
		.controller('Cliente', ctrl);

	ctrl.$inject = ['$rootScope', 'jwtHelper', 'AuthToken', '$location', '$routeParams', 'clienteRest'];

	function ctrl($rootScope, jwtHelper, AuthToken, $location, $routeParams, dataservice) {
		var vm = this;

		vm.atualizar = atualizar;
		vm.cidades = [];
		vm.model = {};
		vm.salvar = salvar;
		vm.voltar = voltar;
		vm.editar = false;

		init();

		function atualizar() {
			dataservice.atualizar($routeParams.id, vm.model).then(success).catch(error);

			function error(response) {
				console.error(response);
				toastr.error('Ocorreu um erro ao atualizar o cliente.');
			}

			function success(response) {
				if (response.data.exec) {
					toastr.success('Sucesso ao atualizar o novo cliente.');
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
				} else {
					toastr.error(response.data.message);
				}
			}
		}

		function carregarComboCidades() {
			dataservice.carregarComboCidades().then(success).catch(error);

			function error(response) {
				toastr.error('Ocorreu um erro ao carregar as cidades, entre em contato com o administrador.');
			}

			function success(response) {
				vm.cidades = response.data.data;
			}
		}

		function init() {
			if (!$routeParams.id && !$rootScope.usuarioLogado.admin) {
				toastr.error('Usuário não possui permissão para acessar essa página.');
				$location.path('/cliente');
			} 

			if ($routeParams.id && !$rootScope.usuarioLogado.admin) {

				if ( $routeParams.id != $rootScope.usuarioLogado.id_cliente) {
					toastr.error('Usuário não possui permissão para acessar essa página.');
					$location.path('/cliente');
				} else {
					carregar($routeParams.id);
				}
				
			}

			if ($routeParams.id && $rootScope.usuarioLogado.admin) {
				carregar($routeParams.id);
			}

			carregarComboCidades();
		}

		function salvar() {
			dataservice.salvar(vm.model).then(success).catch(error);

			function error(response) {
				console.error(response);
				toastr.error('Ocorreu um erro ao salvar o cliente.');
			}

			function success(response) {
				if (response.data.exec) {
					toastr.success('Sucesso ao registrar o novo cliente.');
					voltar();
				} else {
					toastr.error(response.data.message);
				}
			}
		}

		function voltar() {
			$location.path('/cliente');
		}

	}

})();