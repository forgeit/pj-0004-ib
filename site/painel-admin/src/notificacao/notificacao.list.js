(function () {

	'use strict';

	angular.module('admin.cliente')
		.controller('NotificacaoLista', ctrl);

	ctrl.$inject = ['$rootScope', 'jwtHelper', 'AuthToken', '$location', 'notificacaoRest', 'controller', 'tabela', '$scope'];

	function ctrl($rootScope, jwtHelper, AuthToken, $location, dataservice, controller, tabela, $scope) {
		var vm = this;

		vm.tabela = {};
		vm.instancia = {};
		vm.linkParaFormulario = 'novo-notificacao/';

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
				$location.path(vm.linkParaFormulario + aData.id_item_notificacao);
				$scope.$apply();
			}

			function criarColunasTabela() {
				vm.tabela.colunas = tabela.adicionarColunas([
					{data: 'titulo', title: 'Título'},
					{data: 'nome_fantasia', title: 'Cliente'},
					{data: 'uiid', title: 'Beacon'},
					{data: 'ativo', title: 'Situação', renderWith: function (data) {
						if (data == 1) {
							var retorno = '<span class="label label-success">Ativo</span>'
						} else {
							var retorno = '<span class="label label-danger">Inativo</span>'
						}
						
						return retorno;
					}},
					{data: 'id_item_notificacao', title: 'Ações', renderWith: tabela.criarBotaoPadrao, sortable: false}
				]);
			}

			function criarOpcoesTabela() {
				vm.tabela.opcoes = tabela.criarTabela(ajax, vm, remover, 'data', carregarObjeto);
				criarColunasTabela();

				function ajax(data, callback, settings) {
					dataservice.lista(data).then(success).catch(error);

					function error(response) {
						toastr.error('Erro ao carregar a tabela.');
					}

					function success(response) {
						callback(response.data.data.datatables);
					}
				}
			}

			function remover(aData) {
				dataservice.remover(aData.id_item_notificacao).then(success).catch(error);

				function error(response) {
					toastr.error('Erro ao remover a notificação.');
				}

				function success(response) {
					if (response.data.exec) {
						toastr.success('Sucesso ao remover a notificação.');
						tabela.recarregarDados(vm.instancia);
					} else {
						toastr.error(response.data.message);
					}
					
				}
			}
		}
	}

})();