(function () {

	'use strict';

	angular.module('admin.beacon')
		.controller('Beacon', ctrl);

	ctrl.$inject = ['$rootScope', 'jwtHelper', 'AuthToken', '$location', 'beaconRest', 'controller', 'tabela', '$scope', '$routeParams'];

	function ctrl($rootScope, jwtHelper, AuthToken, $location, dataservice, controller, tabela, $scope, $routeParams) {
		var vm = this;

		vm.tabela = {};
		vm.instancia = {};
		vm.editar = false;
		vm.limpar = limpar;

		//Mensagens
		var msg = controller.msg;
		var msgAttr = controller.msgAttr;

		iniciar();

		function carregar(id) {
			dataservice.carregar(id).then(success).catch(error);

			function error(response) {
				toastr.error("Ocorreu um erro ao carregar os dados.");
			}

			function success(response) {
				if (response.data.exec) {
					vm.model = response.data.data;
				} else {
					toastr.error(response.data.message);
				}
			}
		}

		function iniciar() {
			if ($routeParams.idBeacon) {
				vm.editar = true;
				carregar($routeParams.idBeacon);
			}

			montarTabela();
		}

		function montarTabela() {
			criarOpcoesTabela();

			function carregarObjeto(aData) {
				$location.path('novo-cliente/' + $routeParams.id + '/beacon/' + aData.id_beacon);
				$scope.$apply();
			}

			function criarColunasTabela() {
				vm.tabela.colunas = tabela.adicionarColunas([
					{data: 'uiid', title: 'UIID'},
					{data: 'identificacao', title: 'Identificação'},
					{data: 'id_beacon', title: 'Ações', renderWith: function (data) {
						var retorno = '<div class="text-center"><btn-editar class="editar"></btn-editar>&nbsp;';

						if ($rootScope.usuarioLogado.admin) {
							retorno += '<btn-remover class="remover"></btn-remover>';
						}

						retorno += '</div>';
						return retorno;
					}, sortable: false}
				]);
			}

			function criarOpcoesTabela() {
				vm.tabela.opcoes = tabela.criarTabela(ajax, vm, remover, 'data', carregarObjeto);
				criarColunasTabela();

				function ajax(data, callback, settings) {
					dataservice.lista($routeParams.id, data).then(success).catch(error);

					function error(response) {
						console.log(response);
					}

					function success(response) {
						callback(response.data.data.datatables);
					}
				}
			}

			function remover(aData) {
				dataservice.remover(aData.id_beacon).then(success).catch(error);

				function error(response) {
					toastr.error('Erro ao remover o beacon.');
				}

				function success(response) {
					if (response.data.exec) {
						toastr.success('Sucesso ao remover o beacon.');
					} else {
						toastr.error(response.data.message);
					}
				}
			}
		}

		function limpar() {
			$location.path('novo-cliente/' + $routeParams.id);
		}
	}

})();