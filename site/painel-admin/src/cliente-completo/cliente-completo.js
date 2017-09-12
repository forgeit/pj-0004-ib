(function () {

	'use strict';

	angular.module('admin.cliente')
		.controller('ClienteCompleto', ctrl);

	ctrl.$inject = ['$routeParams'];

	function ctrl($routeParams) {
		var vm = this;

		vm.jaVisiteiOsBeacons = false;

		if ($routeParams.id) {
			vm.editar = true;
		} else {
			vm.tabAtual = 0;
		}

		if ($routeParams.idBeacon) {
			vm.tabAtual = 1;
			vm.jaVisiteiOsBeacons = true;
		}
	}

})();