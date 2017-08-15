(function () {

	'use strict';

	angular
		.module('admin.layout')
		.directive('lista', lista);

	function lista() {
		var directive = {
			restrict: 'E',
			templateUrl: 'src/layout/lista.html'
		};

		return directive;
	}

})();