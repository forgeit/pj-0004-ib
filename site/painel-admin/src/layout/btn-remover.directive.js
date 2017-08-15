(function () {

	'use strict';

	angular
		.module('admin.layout')
		.directive('btnRemover', btnRemover);

	function btnRemover() {
		var directive = {
			restrict: 'E',
			templateUrl: 'src/layout/btn-remover.html'
		};

		return directive;
	}

})();