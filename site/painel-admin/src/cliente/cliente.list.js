(function () {

	'use strict';

	angular.module('admin.cliente')
		.controller('ClienteLista', ctrl);

	ctrl.$inject = ['$rootScope', 'jwtHelper', 'AuthToken', '$location', 'clienteRest', 'controller', 'tabela', '$scope'];

	function ctrl($rootScope, jwtHelper, AuthToken, $location, dataservice, controller, tabela, $scope) {
		var vm = this;

		vm.tabela = {};
		vm.instancia = {};
		vm.linkParaFormulario = 'novo-cliente/';

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
					{data: 'nome_fantasia', title: 'Nome'},
					{data: 'cpf_cnpj', title: 'CPF/CNPJ'},
					{data: 'id_cliente', title: 'Ações', renderWith: tabela.criarBotaoPadrao, sortable: false}
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
				// dataservice.remover(aData.id).then(success).catch(error);

				// function error(response) {
				// 	controller.feed(msg.MG013);				}

				// function success(response) {
				// 	controller.feedMessage(response);
				// 	if (response.data.status == 'true') {
				// 		tabela.recarregarDados(vm.instancia);
				// 	}
				// }
			}
		}
	}

})();