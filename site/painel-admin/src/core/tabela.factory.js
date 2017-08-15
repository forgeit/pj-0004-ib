(function () {
	'use strict';

	angular
		.module('admin.core')
		.factory('tabela', tabela);

	tabela.$inject = [
		'$compile', 
		'DTColumnBuilder', 
		'DTOptionsBuilder', 
		'DTColumnDefBuilder',
		'$httpParamSerializer', 
		'$http', 
		'datatables',
		'$q',
		'$timeout'];

	function tabela(
		$compile, 
		DTColumnBuilder, 
		DTOptionsBuilder, 
		DTColumnDefBuilder, 
		$httpParamSerializer, 
		$http, 
		datatables, 
		$q, 
		$timeout) {

		var service = {
			adicionarColunas: adicionarColunas,
			criarBotaoPadrao: criarBotaoPadrao,
			criarColunas: criarColunas,
			criarTabela: criarTabela,
			criarTabelaPorArray: criarTabelaPorArray,
			criarParametrosGet: criarParametrosGet,
			criarParametrosMestreDetalhe: criarParametrosMestreDetalhe,
			formatarData: formatarData,
			recarregarDados: recarregarDados,
			recarregarDadosArray: recarregarDadosArray,
			substituirValorNulo: substituirValorNulo,
			timestampParaData: timestampParaData,
			timestampParaDataHora: timestampParaDataHora,
			timestampParaDataHoraDetalhado: timestampParaDataHoraDetalhado,
			vazia: vazia
		};

		return service;

		function adicionarColunas(colunas) {

			var dtColumns = [];

			angular.forEach(colunas, function (value, key) {
				var column = DTColumnBuilder
					.newColumn(value.data)
					.withTitle(value.title)
					.withOption('name', value.name ? value.name : value.data);

				if (value.renderWith) {
					column.renderWith(value.renderWith);
				}

				if  (typeof value.sortable !== undefined) {
					if (value.sortable === false) {
						column.notSortable();
					}
				}

				if (value.cssClass) {
					column.withClass(value.cssClass);
				}

				if (typeof value.visible !== undefined) {
					if (value.visible === false) {
						column.notVisible();
					}
				}

				dtColumns.push(column);
			});

			return dtColumns;

		}

		function criarBotaoPadrao() { 
			return '<div class="text-center"><btn-editar class="editar"></btn-editar>&nbsp;<btn-remover class="remover"></btn-remover></div>';
		}

		function criarColunas(colunas) {
			var dtColumns = [];

			angular.forEach(colunas, function (value, key) {
				var column = DTColumnBuilder
					.newColumn(value[0])
					.withTitle(value[1]);

				if (value.length >= 3) {
					if (value[2] !== null) {
						column.renderWith(value[2]);
					}
				}

				column.withOption('name', value.length === 4 ? value[3] : value[0]);

				dtColumns.push(column);
			});

			return dtColumns;
		}

		function criarParametrosGet(request, filtro, filtroMestre) {

			if (filtro) {
				if (filtro.length > 0) {
					request['filters'] = filtro;
				}
			}
				
			if (filtroMestre) {
				request['filtersMaster'] = [filtroMestre];
			}
			
			var data = {
				request: request
			};

			return $httpParamSerializer(data);
		}

		function criarParametrosMestreDetalhe(request, filtroMestre, filtro) {
			return criarParametrosGet(request, filtro, filtroMestre);
		}

		function criarTabela(ajax, vm, remover, nomeArrayRetorno, carregarObjeto) {
			return DTOptionsBuilder.newOptions()
				.withOption('ajax', ajax)
				.withDataProp(nomeArrayRetorno)
				.withPaginationType('full_numbers')
				.withOption('createdRow', createdRow)
				.withOption('rowCallback', rowCallback)
	        	.withOption('processing', true)
		        .withOption('serverSide', true)
		        .withOption('searching', false)
		        .withLanguage(datatables.ptbr)
				.withBootstrap();

			function createdRow(row, data, dataIndex) {
	    		$compile(angular.element(row).contents())(vm);
			}

			function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				$('.remover', nRow).unbind('click');
				$('.remover', nRow).bind('click', function () {
					evtRemover(aData, remover);
				});

				$('.editar', nRow).unbind('click');
				$('.editar', nRow).bind('click', function () {
					carregarObjeto(aData);
				});
			}

			function evtRemover(aData, remover) {
				$.confirm({
				    text: "Tem certeza de que deseja excluir?",
				    title: "Confirmação",
				    confirm: function(button) {
				        remover(aData);
				    },
			        confirmButtonClass: "btn-danger btn-flat",
			        cancelButtonClass: "btn-default btn-flat",
				    confirmButton: "Sim, tenho certeza!",
				    cancelButton: "Não",
				    dialogClass: "modal-dialog modal-lg"
				});
			}
		}

		function criarTabelaPorArray(vm, remover, array) {
			return DTOptionsBuilder.fromFnPromise(function () {
				    var deferred = $q.defer();
				    deferred.resolve(array);
				    return deferred.promise;
				})
				.withPaginationType('full_numbers')
				.withDataProp('data')
				.withOption('createdRow', createdRow)
				.withOption('rowCallback', rowCallback)
		        .withLanguage(datatables.ptbr)
				.withBootstrap();

			function createdRow(row, data, dataIndex) {
	    		$compile(angular.element(row).contents())(vm);
			}

			function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				$('.remover', nRow).unbind('click');
				$('.remover', nRow).bind('click', function () {
					evtRemover(aData, remover);
				});

				$('.editar', nRow).unbind('click');
				$('.editar', nRow).bind('click', function () {
					carregarObjeto(aData);
				});
			}

			function evtRemover(aData, remover) {
				$.confirm({
				    text: "Você tem certeza que deseja remover?",
				    title: "Confirmação",
				    confirm: function(button) {
				        remover(aData);
				    },
			        confirmButtonClass: "btn-danger btn-flat",
			        cancelButtonClass: "btn-default btn-flat",
				    confirmButton: "Sim, tenho certeza!",
				    cancelButton: "Não",
				    dialogClass: "modal-dialog modal-lg"
				});
			}
		}

		function formatarData(valor) {
			return valor == null ? '-' : moment(valor).format('DD/MM/YYYY');
		}

		function recarregarDados(dtInstance) {
			var resetPaging = true;
			dtInstance.reloadData(null, resetPaging);
		}

		function recarregarDadosArray(dtInstance, array) {
        	dtInstance.reloadData();
		}

		function substituirValorNulo(valor) {
			return valor == null ? '-' : valor;
		}

		function timestampParaData(valor) {
			return valor == null ? '-' : moment.unix(valor / 1000).format('DD/MM/YYYY');
		}

		function timestampParaDataHora(valor) {
			return valor == null ? '-' : moment.unix(valor / 1000).format('DD/MM/YYYY hh:mm');
		}

		function timestampParaDataHoraDetalhado(valor) {
			return valor == null ? '-' : moment.unix(valor / 1000).format('DD/MM/YYYY hh:mm:ss');
		}

		function vazia() {
			return { draw: 1, recordsTotal: 0, recordsFiltered: 0, data: [], error: null };
		}
	}

})();