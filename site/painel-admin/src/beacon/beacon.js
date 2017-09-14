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
		vm.salvar = salvar;
		vm.atualizar = atualizar;

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
					vm.model.data_compra = new Date(vm.model.data_compra);
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

						if ($routeParams.idBeacon) {
							limpar();
						}

						tabela.recarregarDados(vm.instancia);
					} else {
						toastr.error(response.data.message);
					}
				}
			}
		}

		function limpar(form) {
			$location.path('novo-cliente/' + $routeParams.id + '/pagina-beacons/1');
		}

		function salvar(form) {
			dataservice.salvar(vm.model, $routeParams.id).then(success).catch(error);

			function error(response) {
				console.log(response);
				toastr.error('Ocorreu um erro ao salvar o beacon.');
			}

			function success(response) {
				if (response.data.exec) {
					toastr.success('Sucesso ao registrar o novo beacon.');
					vm.model = {};
					form.$setDirty();
					form.$setPristine();
					tabela.recarregarDados(vm.instancia);
				} else {
					toastr.error(response.data.message);
				}
			}
		}

		function atualizar(form) {
			dataservice.atualizar($routeParams.id, vm.model, $routeParams.idBeacon).then(success).catch(error);

			function error(response) {
				console.error(response);
				toastr.error('Ocorreu um erro ao atualizar o beacon.');
			}

			function success(response) {
				if (response.data.exec) {
					toastr.success('Sucesso ao atualizar o beacon.');
					$location.path('novo-cliente/' + $routeParams.id + '/pagina-beacons/1');
				} else {
					toastr.error(response.data.message);
				}
			}
		}
	}

})();