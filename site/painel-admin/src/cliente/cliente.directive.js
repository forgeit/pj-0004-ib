(function () {

	'use strict';

	angular
		.module('admin.cliente')
		.directive('dadosCliente', dadosCliente);

	function dadosCliente() {
		var directive = {
			restrict: 'E',
			templateUrl: 'src/cliente/cliente.html'
		};

		return directive;
	}

})();