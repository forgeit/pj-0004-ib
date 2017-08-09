(function () {

	'use strict';

	angular
		.module('admin.layout')
		.directive('menuTopo', menuTopo);

	function menuTopo() {
		var directive = {
			restrict: 'E',
			templateUrl: 'src/layout/menu-topo.html'
		};

		return directive;
	}

})();