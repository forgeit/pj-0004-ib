(function () {

	'use strict';

	angular
		.module('admin.layout')
		.directive('btnEditar', btnEditar);

	function btnEditar() {
		var directive = {
			restrict: 'E',
			templateUrl: 'src/layout/btn-editar.html'
		};

		return directive;
	}

})();