(function () {

	'use strict';

	angular.module('admin.beacon')
		.controller('Beacon', ctrl);

	ctrl.$inject = ['$rootScope', 'jwtHelper', 'AuthToken', '$location', 'beaconRest', 'controller', 'tabela', '$scope'];

	function ctrl($rootScope, jwtHelper, AuthToken, $location, dataservice, controller, tabela, $scope) {
		var vm = this;

		vm.tabela = {};
		vm.instancia = {};

		//Mensagens
		var msg = controller.msg;
		var msgAttr = controller.msgAttr;

		iniciar();

		function iniciar() {
			montarTabela();
		}

		function montarTabela() {
			criarOpcoesTabela();

			function carregarObjeto(aData) {
				$location.path(vm.linkParaFormulario + aData.id_cliente);
				$scope.$apply();
			}

			function criarColunasTabela() {
				vm.tabela.colunas = tabela.adicionarColunas([
					{data: 'uiid', title: 'UIID'},
					{data: 'identificacao', title: 'Identificação'},
					{data: 'id_beacon', title: 'Ações', renderWith: tabela.criarBotaoPadrao, sortable: false}
				]);
			}

			function criarOpcoesTabela() {
				vm.tabela.opcoes = tabela.criarTabela(ajax, vm, remover, 'data', carregarObjeto);
				criarColunasTabela();

				function ajax(data, callback, settings) {
					dataservice.lista(data).then(success).catch(error);

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
	}

})();